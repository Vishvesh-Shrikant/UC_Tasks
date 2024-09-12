const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const otpSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    otpcode:{
        type: Number,
        required:true
    },
    createdTime:{
        type: Date,
        required: true,
    },
    expiryTime:{
        type:Date,
        required:true
    }
})

otpSchema.pre('save', async function (next) {
    if (!this.isModified('otpcode')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.otpcode = await bcrypt.hash(this.otpcode, salt);
    next();
});
  
  // Match user entered password with hashed password in the database
otpSchema.methods.matchPassword = async function (enteredOTP) {
    return await bcrypt.compare(enteredOTP, this.otpcode);
};

const OTP= mongoose.model('OTPs', otpSchema);
module.exports= OTP;