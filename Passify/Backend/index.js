const express= require("express")
const mongoose= require("mongoose")
const cors=require("cors")
const authRoutes= require("./Routes/auth.js")
const passRoutes= require("./Routes/Passwords.js")

const PORT=5001

const app=express()
app.use(cors())
app.use(express.json())
app.use(authRoutes)
app.use(passRoutes)

//Connecting DB and making the schema and model of the Password storing db
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/PasswordDB" )
        console.log("MongoDB connected successfully...")
    }
    catch(err)
    {
        console.log("Mongo error:", err)
    }
}
connectDB()


app.listen(PORT, ()=>{
    console.log(`Server Initialised at port ${PORT}...`)
})