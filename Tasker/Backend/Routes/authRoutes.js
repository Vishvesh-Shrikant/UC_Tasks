const express = require('express');
const jwt = require('jsonwebtoken');
const User= require('../Models/UserSchema.js')
const dotenv=require('dotenv').config()
const verifyToken= require('../Middleware/verifyUser.js')
const router= express.Router()
const tokens= require('../Middleware/generateToken.js')
const otpgenerator= require('otp-generator')
const nodemailer= require('nodemailer');
const OTP = require('../Models/OTPSchema.js');
 



//FOR REGISTERING A USER
router.post('/user/signup', async (req, res)=>{
    try
    {
        const email= await User.findOne({email: req.body.email});
        if(email)
        {
            return res.status(401).json({success:false, msg:"email already exists"})
        }
        else
        {
            const new_user= await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            const payload={ id:new_user.id, name: new_user.name, email:new_user.email , password:new_user.password }
            const accessToken= tokens.generateAccessToken(payload)
            return res.status(201).json({ msg: "User created sucessfully", success:true,  new_user,  accessToken });
        }
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})

//FOR LOGIN OF THE USER
router.post('/user/login', async(req, res)=>{
    try
    {
        const user = await User.findOne({ email: req.body.email });
        if (!user) 
        {
            return res.status(401).json({success:false,  msg: "User not found"});
        }
        else
        {
            const isMatch = await user.matchPassword(req.body.password);
            if (!isMatch) 
            {
                return res.status(400).json({success:false,  msg:'Invalid credentials' });
            }

            const payload= { id: user._id, email: user.email, name:user.name, isVerified: user.isVerified }
            const accessToken= tokens.generateAccessToken(payload)
            const refreshToken= tokens.generateRefreshToken(payload)

            user.refreshToken= refreshToken
            await user.save()

            res.cookie('refreshToken', refreshToken, {
                httpOnly:true,
                sameSite:'strict',
                maxAge: 60*24*60*60*1000
            })
            return res.status(200).json({success:true,  msg:"User Loggedin Successfully", accessToken});
        }
    }
    catch(err)
    {
        return res.status(500).json({success:false,  error: err });
    }
})

//FOR CREATING ACCESS TOKEN FROM REFRESH TOKEN AFTER ACCESS TOKEN IS INVALID/EXPIRES
router.post('/user/refreshToken', async(req, res)=>{
    try
    {
        let refreshToken= req.cookies.refreshToken

    if( refreshToken== null)
        return res.status(401).json({success:false, msg:"Unauthorized access"})

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async(err, user)=>{
        if(err)
            return res.status(403).json({success:false, msg:"Forbidden Access"})

        const dbUser = await User.findOne({ refreshToken });
        if (!dbUser) 
            return res.status(403).json({success:false, msg:"Forbidden Access"});
        
        const payload= { id: dbUser._id, email: dbUser.email, name:dbUser.name, isVerifed: dbUser.isVerified }
        const accessToken= tokens.generateAccessToken(payload)
        res.json({success:true, accessToken})
        })
    }
    catch(err)
    {
        console.log("Error in code is: ", err)
    }
})

//FOR REMOVING REFRESH TOKEN FROM USER SO THAT THE USER IS LOGGED OUT 
router.post('/user/logout', verifyToken,  async(req, res)=>{
    const refreshToken= req.cookies.refreshToken
    if (refreshToken == null) 
        return res.status(401).json({success:false, msg:"Unauthorized access"});

    try
    {
        const user = await User.findOne({ refreshToken });
        if (!user) 
            return res.status(403).json({success:false, msg:"Forbidden Access"});

        res.cookie('refreshToken', '', { expires: new Date(0), sameSite:'strict', httpOnly: true });
        user.refreshToken = null;
        await user.save();
        return res.status(204).json({success:true, msg: "User logged out successfully" });
    }
    catch(err)
    {
        res.status(500).json({success:false,  error: 'Internal Server Error' });
    }
})

//VERIFY WHETHER THE USER IS VERFIED USING MIDDLEWARE AND THEN RETURNING USER DATA IF VERIFIED
router.post('/user/verify', verifyToken, async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({success:true, user});
    } 
    catch (err) {
        res.status(500).json({success:false, message: err.message });
    }
})


//SENDING OTP TO VERIFY USER EMAIL
router.post('/user/sendotp', verifyToken , async(req, res)=>{
    try
    {   
        const user= await User.findById(req.user.id).select("-password");
        const otp= otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const auth = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            port: process.env.MAIL_PORT,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD,
            }
        })

        const receiver={
            from: process.env.EMAIL,
            to: user.email,
            subject: "Email Verification for TASKER",
            text:  `Your One-time-password (OTP) for TASKER verification is: ${otp}\n
            This OTP is valid for a time of 5 minutes. DO NOT SHARE THIS OPT WITH ANYONE.`
        }

        auth.sendMail(receiver, (err, emailRes)=> 
        {
            if (err)
            {
                console.log("Error is:", err);
                throw err
            }  
            console.log("Email sent successfully")
        });

        const otp_sent= await OTP.findOneAndUpdate({userid:user._id}, {
            userid: user._id,
            otpcode: otp,
            createdTime: Date.now(),
            expiryTime: (Date.now()+ 5*60*1000)
        },{
            new: true, // Return the updated (or inserted) document
            upsert: true, // if document doesnt exists, doc is inserted
            setDefaultsOnInsert: true
        })
        return res.status(200).json({success:true, msg:"OTP sent successfully"});
    }
    catch(err)
    {
        res.status(500).json({success:false, error: err, msg:"Internal Server Error x"})
    }
})

router.post('/user/verifyotp', verifyToken, async(req, res)=>{
    try
    {   
        const otpinput= req.body.otp;
        const otpsent= await OTP.findOne({userid: req.user.id})
        const datenow= Date.now()

        if(!otpsent)
            return res.status(400).json({success:false, error: "OTP not found in db"})

        else if( datenow > otpsent.expiryTime)
            return res.status(400).json({success:false, error: "OTP expired"})

        else if (otpinput != otpsent.otpcode)
            return res.status(400).json({success:false, error: "Invalid OTP entered"});
        
        const user= await User.findByIdAndUpdate(otpsent.userid, {
            isVerified:true
        },
        { new: true }).select("-password");

        return res.status(200).json({success:true, msg:"User verified", user})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})


module.exports= router

