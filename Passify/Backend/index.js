const express= require("express")
const mongoose= require("mongoose")
const cors=require("cors")

const PORT=6001
const app=express()
app.use(cors())
app.use(express.json())

//Connecting DB and making the schema and model of the Password storing db
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/PasswordDB")
        console.log("MongoDB connected successfully...")
    }
    catch(err)
    {
        console.log("Mongo error:", err)
    }
}
connectDB()
const passSchema=new mongoose.Schema({
    id:{type:String },
    name:{type:String, required:true},
    password:{type:String, required:true},
    tags:{type:String, required:false}
})
const Password= new mongoose.model("Passwords", passSchema)


const userSchema= new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})
const User= new mongoose.model("Users", userSchema)


//Paths for the RestAPI
app.get('/', (req, res)=>{
    res.status(200).send("ALL A OKAY")
})

app.get('/view', async (req, res)=>{
    const passwords= await Password.find({})
    try{
        if(passwords)
            res.status(200).json(passwords)
    }   
    catch(err){
        res.status(500).json({msg:err})
    }
})


app.get('/view/:id', async(req, res)=>{
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

app.post('/create', async(req, res)=>{
    const body = req.body 
    if( !body || !body.name || !body.password )
    {
        res.status(404).send(null)
    }
    else
    {    
        try{
            const newData = await Password.create({
                id:body.id,
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

app.delete('/delete/:name', async(req, res)=>{
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

app.put('/update/:id', async(req, res)=>{
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




app.listen(PORT, ()=>{
    console.log(`Server Initialised at port ${PORT}...`)
})