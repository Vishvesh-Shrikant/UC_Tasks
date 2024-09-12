const jwt= require('jsonwebtoken')
const dotenv=require('dotenv').config()

const generateAccessToken=(user)=>
{
    return jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRY });
}
const generateRefreshToken=(user)=>{
    return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRY });
}

module.exports={generateAccessToken, generateRefreshToken}