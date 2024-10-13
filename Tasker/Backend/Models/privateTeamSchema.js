const mongoose= require('mongoose')

const privateTeamSchema= new mongoose.Schema({
    userid:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String, 
        required:true,
        unique:true
    }
});


const PrivateTeam= mongoose.model('PrivateTeam', privateTeamSchema);
module.exports = PrivateTeam;

