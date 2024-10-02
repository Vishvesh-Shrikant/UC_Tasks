const mongoose= require('mongoose')

const publicTeamSchema= new mongoose.Schema({
    creatorId:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type:String, 
        required:true
    },
    memberIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    description:{
        type:String, 
        required:true
    }, 
    teamcode:{
        type:String,
        required:true,
        unique:true
    }
})

const PublicTeam= mongoose.model('PublicTeam', publicTeamSchema)
module.exports=PublicTeam;