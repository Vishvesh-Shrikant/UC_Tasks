const express= require("express")
const mongoose= require("mongoose")
const cors=require('cors')
const dotenv= require("dotenv").config()
const authRoutes=require('./Routes/authRoutes.js')
const cookieParser= require('cookie-parser')
const corsOptions= require('./config/corsOptions.js')

const app=express()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(authRoutes)



const connectDB=async()=>{
    try
    {
        await mongoose.connect(`${process.env.MONGO_URL}/TaskerDB`)
        console.log("DB is ready to connect...")
    }
    catch(err)
    {
        console.log("Mongo Error", err)
    }
}
connectDB()

app.listen(process.env.PORT, ()=>{
    console.log(`Server Initialised at port ${process.env.PORT}...`)
})