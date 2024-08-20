const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema= new mongoose.Schema({     
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

userSchema.methods.matchPassword = async (enteredPassword)=> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User= new mongoose.model("Users", userSchema)

module.exports= User;