const express= require('express')
const PublicTeam = require('../Models/publicTeamSchema')
const verifyToken = require('../Middleware/verifyUser')
const crypto=require('crypto')

const router= express.Router()


// create public team
router.post('/user/publicTeam/create', verifyToken, async(req, res)=>{
    try
    {
        const teamcode= crypto.randomBytes(4).toString('hex');
        let isUnique=false;
        const teamExists= await PublicTeam.findOne({$and:[
            {creatorId: req.user.id}, {name:req.body.name}
           ]})
        if(teamExists)
        {
            res.status(400).json({success:false, msg:"Team should have unique name"})
        }
        else
        {
            while(isUnique==false)
            {
                const findTeam= await PublicTeam.findOne({teamcode: teamcode})
                if(findTeam)
                {
                    teamcode=crypto.randomBytes(8).toString('hex');
                    continue;
                }
                else
                    isUnique=true
            }
            if(isUnique)
            {
                const newTeam= await PublicTeam.create({
                    creatorId: req.user.id,
                    teamcode: teamcode,
                    name: req.body.name,
                    description:req.body.description
                })
                if(newTeam)
                    return res.status(201).json({success:true, msg:"New Public Team created", newTeam})
            }
        }
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})

// get all prublic teams of user
router.get('/user/publicTeam/get', verifyToken, async(req, res)=>{
    try
    {
        const userPublicTeams = await PublicTeam.find({
            $or:[
                {creatorId: req.user.id},
                {memberIds:{ $in:[req.user.id] }}
            ]
        })
        if(userPublicTeams)
            return res.status(200).json({success:true , msg:"All Public Teams found", userPublicTeams})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})

router.get('/user/publicTeam/get/:id', verifyToken, async(req, res)=>{
    try
    {
        const userTeam = await PublicTeam.findById(req.params.id)
        if(userTeam)
            return res.status(200).json({success:true , msg:"All Public Teams found", userTeam})
        return res.status(400).json({success:false, error:"Team Not Found"})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})



// join a team
router.post('/user/publicTeam/join', verifyToken, async(req, res)=>{
    try
    {
        const teamcode= req.body.teamcode
        const findTeam= await PublicTeam.findOne({
            $and:[
                {teamcode:teamcode},
                {memberIds:{ $in:[req.user.id] }}
            ]
        });
        if(findTeam)
        {
            return res.status(200).json({success:true, msg: "Team has already been joined"})
        }
        else
        {
            const addMember= await PublicTeam.findOneAndUpdate({ teamcode }, 
                { $addToSet: { memberIds: req.user.id } }, 
                { new: true }
            )
            if( addMember)
            {
                return res.status(200).json({success:true, msg: "Team joined successfully", addMember})
            }
            else
                return res.status(404).json({success:false, error:"Team does not exist"})
        }
            
    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})

// leave a team 
router.post('/user/publicTeam/leave/:id', verifyToken, async(req, res)=>{
    try
    {
        const teamId= req.params.id 
        const leftTeam= await PublicTeam.findByIdAndUpdate({teamId}, {$pull:{memberIds: req.user.id}})
        if(leftTeam)
            return res.status(204).json({success:true, msg:"Team left Successfully"})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})

//change public team name
router.patch('/user/publicTeam/rename/:id',verifyToken, async(req, res)=>{
    try
    {
        const teamId= req.params.id
        const newName= req.body.name;
        const team= await PublicTeam.findByIdAndUpdate({teamId}, {
            $set:{name: newName}
        })
        if(team)
            return res.status(200).json({success:true, msg:"Team renamed sucessfully", team})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})


module.exports= router;