const express = require('express');
const jwt = require('jsonwebtoken');
const User= require('../Model/userModel.js')
const dotenv=require('dotenv').config()
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/signin', async (req, res)=>{
    const body=req.body
    const useremail= await User.findOne({email:body.email})
    const user_username=await User.findOne({username:body.username})
    if(useremail || user_username)
        res.status(400).json({msg:"User Already Exists"})
    else
    {
        try 
        {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(body.password, salt);

            const user =await User.create({
                username:body.username,
                email:body.email,
                password:hashPassword
            })
            console.log(user)
            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN , { expiresIn: '7d' })
            res.status(201).json({ token: token })
        } 
        catch (err) 
        {
            res.status(500).json({message:err});
        }
    }
})


router.post('/login', async(req, res)=>{
    const body= req.body
    try{
        const checkUser= await User.findOne({email: body.email})
        if(!checkUser)
        {
            res.status(404).json({msg:"User Not Found"})
        }
        const passMatch= await bcrypt.compare(body.password, checkUser.password);
        if(passMatch)
        {
            const token = jwt.sign({ id: checkUser._id }, process.env.ACCESS_TOKEN , { expiresIn: '7d' });
            res.status(200).json({msg:"User found", token: token })
        }
        else 
        {
            res.status(401).json({msg:"incorrect password"})
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({msg:err.message})
    }
})

const verifyToken=(req, res, next) =>
{
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try 
    {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN );
        req.user = decoded;
        next();
    } 
    catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}
    

router.get('/verify', verifyToken, async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }

})


module.exports = router;



