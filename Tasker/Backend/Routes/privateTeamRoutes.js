const express= require('express')
const PrivateTeam = require('../Models/privateTeamSchema')
const verifyToken = require('../Middleware/verifyUser')

const router= express.Router()


router.post('/user/privateTeam/createFirst', async(req, res)=>{
    try
    {
        const newPrivTeam= await PrivateTeam.create({
            userid: req.body.id,
            name:req.body.name
        })
        if(newPrivTeam)
            return res.status(201).json({success:true, messgae: "New Private Team created", newPrivTeam})
    }
    catch(err)
    {
        res.status(500).json({success:false, error: err})
    }
})

// get all private teams of user
router.get('/user/privateTeam/get', verifyToken, async(req, res)=>{
    try 
    {
        const userPrivateTeams= await PrivateTeam.find({userid:req.user.id})
        if(userPrivateTeams)
            return res.status(200).json({success:true, msg:"All private teams received", userPrivateTeams 
        })
    } 
    catch (error) {
        return res.status(500).json({success:false, error:error})
    }
})

//get individual team 
router.get('/user/privateTeam/get/:id', verifyToken, async(req, res)=>{
    try
    {
        const team= await PrivateTeam.findById(req.params.id)
        if(team)
            return res.status(200).json({success:true, msg:"Team Found", team})
        return res.status(400).json({success:false, error:"Team Not Found"})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})


//change private team name
router.patch('/user/privateTeam/rename/:id',verifyToken, async(req, res)=>{
    try
    {
        
        const teamId= req.params.id
        const newName= req.body.name;
        const privteam= await PrivateTeam.findByIdAndUpdate({teamId}, {
            $set:{name: newName}
        })
        if(privteam)
            return res.status(200).json({success:true, msg:"Team renamed sucessfully", privteam})

    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})


module.exports= router;