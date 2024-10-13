const mongoose= require('mongoose')

const taskSchema = new mongoose.Schema({
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    assigneeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    reporterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    taskName:{
        type:String, 
        reuqired:true
    },
    taskDescription:{
        type:String, 
    },
    createTime:{
        type:Date,
        required:true
    }, 
    deadline:{
        type:Date
    }
})

//9702465730

const Task= mongoose.model('Tasks', taskSchema)
module.exports=Task;