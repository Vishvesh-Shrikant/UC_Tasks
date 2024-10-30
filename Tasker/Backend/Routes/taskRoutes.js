const express= require('express')
const Task = require('../Models/tasksSchema')
const verifyToken = require('../Middleware/verifyUser')


const router= express.Router()


router.post('/user/:teamId/task/create',verifyToken, async (req, res)=>{
    const teamId=req.params.teamId
    const status=req.body.status
    const taskName= req.body.taskName
    const taskDescription= req.body.taskDescription

    let reporterId=req.user.id
    let assigneeId=req.user.id
    let deadline=null

    if(req.body.reporterId)
        reporterId= req.body.reporterId
    if(req.body.assigneeId)
        assigneeId=req.body.assigneeId

    if(req.body.deadline)
        deadline= req.body.deadline
    try
    {   
        const taskExists= await Task.findOne({$and:[
            {teamId}, {taskName}
        ]})
        if(taskExists)
        {
            res.status(400).json({success:false, msg:"Task already exists."})
        }
        else
        {
            const newTask= await Task.create({
                teamId: teamId,
                taskName: taskName,
                status: status,
                taskDescription:taskDescription,
                createTime: Date.now(),
                deadline:deadline,
                reporterId:reporterId,
                assigneeId:assigneeId
            })
            if(newTask)
                return res.status(201).json({success:true, msg:"New task created", newTask})
        }
    }
    catch(err)
    {
        res.status(500).json({success:false, error: err})
    }
})

router.get('/user/:teamId/task/get', verifyToken, async(req, res)=>{
    try
    {
        const teamId= req.params.teamId
        const getTasks= await Task.find(
            {teamId:teamId})
        if(getTasks)
            res.status(200).json({success:true, mgs:"All team tasks retrived", getTasks})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error: err})
    }
})


router.get('/user/:teamId/task/get/:id', verifyToken, async(req, res)=>{
    try
    {
        const taskId= req.params.id
        const task = await Task.findById(taskId)
        if(task)
            return res.status(200).json({success:true, msg:"Task found successfully", task:task})
        else
            return res.status(200).json({success:false, err:"Task error"})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }  
})

router.patch('/user/:teamId/task/update/:taskId', verifyToken, async(req, res)=>{
    try
    {
        const taskId= req.params.taskId
        const { taskName, taskDescription, status, assigneeId, reporterId, deadline } = req.body;

        const task = await Task.findById(taskId)
        if (!task) {
        return res.status(404).json({ success: false, message: "task not found"})
        }

        const changedTask={}
        if(taskName)
            changedTask.taskName=taskName
        if(taskDescription)
            changedTask.taskDescription=taskDescription
        if(status)
            changedTask.status=status
        if(assigneeId)
            changedTask.assigneeId=assigneeId
        if(reporterId)
            changedTask.reporterId=reporterId
        if(deadline)
            changedTask.deadline=deadline

        const updatedTask= await Task.findByIdAndUpdate(taskId, {$set:changedTask}, { new: true })

        if(updatedTask)
            return res.status(200).json({success:true, msg:"task updated", updatedTask})

    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})

router.delete('/user/:teamId/task/delete/:taskId', verifyToken, async(req, res)=>{
    try
    {
        const taskId=req.params.taskId
        const deletedTask= await Task.findByIdAndDelete(taskId)

        if(deletedTask)
            return res.status(204).json({success:true, msg:"task deleted successfully", deletedTask})
        else
            return res.status(400).json({success:false, err:"Task couldn't be deleted"})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})

module.exports= router;