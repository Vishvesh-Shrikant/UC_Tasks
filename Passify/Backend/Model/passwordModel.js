const mongoose = require('mongoose');

const passSchema=new mongoose.Schema({
    creatorId:{type:String , required:true},
    name:{type:String, required:true},
    password:{type:String, required:true},
    tags:{type:String, required:false}
})
const Password= new mongoose.model("Passwords", passSchema)

module.exports=Password