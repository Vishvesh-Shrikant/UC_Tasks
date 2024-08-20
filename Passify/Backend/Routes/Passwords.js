const Password=require('../Model/passwordModel.js')
const express= require('express')
const jwt = require('jsonwebtoken');

const router = express.Router();


router.get('/', (req, res)=>{
    res.status(200).send("ALL A OKAY")
})

router.get('/view/user/:id', async (req, res)=>{
    const creatorId= req.params.id
    const passwords= await Password.find({creatorId})
    try{
        if(passwords)
            res.status(200).json(passwords)
    }   
    catch(err){
        res.status(500).json({msg:err})
    }
})

router.get('/view/:id', async(req, res)=>{
    let id=req.params.id
    try
    {
        const pass= await Password.findOne({_id:id})
        res.status(200).json(pass)
    }
    catch(err)
    {
        res.status(500).json({msg:err})
    }

})

router.post('/create', async(req, res)=>{
    const body = req.body 
    if( !body || !body.name || !body.password || !body.creatorId )
    {
        res.status(404).send(null)
    }
    else
    {    
        try{
            const newData = await Password.create({
                creatorId:body.creatorId,
                name:body.name,
                password:body.password,
                tags:body.tag
            })
            res.status(201).json(newData)
        }
        catch(err)
        {
            console.log("Error:", err)
        }
    }
})

router.delete('/delete/:name', async(req, res)=>{
    const name=req.params.name
    const result = await Password.findOneAndDelete({name:name})
    try{
        if(result)
            res.status(200).json({msg:"Password Deleted"})
    }
    catch(err){
        console.log("Error:", err)
    }
})

router.put('/update/:id', async(req, res)=>{
    const id=req.params.id
    const body=req.body
    try{
        if(body.name)
        {
            await Password.findOneAndUpdate({_id:id}, {$set:{name:body.name}})
        }
        if(body.tags)
        {
            await Password.findOneAndUpdate({_id:id}, {$set:{tags:body.tags}})
        }
        if(body.password)
        {
            await Password.findOneAndUpdate({_id:id}, {$set:{password:body.password}})
        }
        res.status(200).json({msg:"Password Updated"})
    }
    catch(err){
        console.log("Error:", err)
    }
})


module.exports= router;