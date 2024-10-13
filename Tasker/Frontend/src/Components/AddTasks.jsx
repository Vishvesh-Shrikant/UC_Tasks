import React, { useContext, useState } from 'react'
import { Plus } from 'lucide-react';
import api from '../api/AxiosApi'
import { useToast } from '@chakra-ui/react';
import {motion} from 'framer-motion'
const AddTasks = ({column, setTasks, teamId}) => {
    const [taskName, setTaskName]= useState()
    const [taskDescription, setTaskDescription]= useState()
    const [adding, setAdding]= useState(false)
    const toast= useToast({position:'top'})
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        if(!(taskName.trim().length && taskDescription.length))
            return;

        else
        {
            api.post(`/user/${teamId}/task/create`,{
                taskName:taskName,
                taskDescription:taskDescription,
                status:column 
            },{
                headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
            })
            .then(res=>{
                console.log(res)
                toast({
                    title: 'Task created.',
                    description: "The task has been created successfully ",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  })
                setTasks()
                setAdding(false)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

  return (
    <>
    {
        adding ?
        <motion.form 
        layout
        onSubmit={handleSubmit}>
            <textarea
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
            placeholder="Add task name..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <textarea
            onChange={(e) => setTaskDescription(e.target.value)}
            autoFocus
            placeholder="Add new description..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <Plus/>
            </button>
          </div>

        </motion.form> :
        <motion.button
        layout
        className='flex text-base font-medium text-white w-full items-center gap-1.5 px-3 py-1.5 '
        onClick={()=>setAdding(true)}> 
            <span>Add Cards</span>
            <Plus/>
        </motion.button>
    }
    </>
  )
}

export default AddTasks