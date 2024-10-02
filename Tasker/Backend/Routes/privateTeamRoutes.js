const express= require('express')
const PrivateTeam = require('../Models/privateTeamSchema')
const verifyToken = require('../Middleware/verifyUser')

const router= express.Router()


router.post('/user/privateTeam/createFirst', async(req, res)=>{
    try
    {
        const userId=req.body.id
        const name= req.body.name
        const newPrivTeam= await PrivateTeam.create({
            userid: userId,
            name:name
        })
        if(newPrivTeam)
            return res.status(201).json({sucess:true, messgae: "New Private Team created", newPrivTeam})
    }
    catch(err)
    {
        res.status(500).json({success:false, error: err})
    }
})



// create new private team
router.post('/user/privateTeam/create', verifyToken, async (req, res)=>{
    const userId=req.user.id
    const name= req.body.name
    try{
       const teamExists= await PrivateTeam.findOne({$and:[
        {userId}, {name}
       ]})
       if(teamExists)
       {
            res.status(400).json({success:false, msg:"Team should have unique name"})
       }
       else
       {
            const newPrivTeam= await PrivateTeam.create({
                userid: userId,
                name:name
            })
            if(newPrivTeam)
                return res.status(201).json({sucess:true, messgae: "New Private Team created", newPrivTeam})
       }
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

// delete a private team
router.delete('/user/privateTeam/delete/:id', verifyToken, async(req, res)=>{
    try
    {
        const teamId= req.params.id
        const deletePrivTeam= await PrivateTeam.findByIdAndDelete({teamId})
        if(deletePrivTeam)
            return res.status(204).json({success:true, msg:"Private team deleted successfully", deletePrivTeam})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})

module.exports= router;