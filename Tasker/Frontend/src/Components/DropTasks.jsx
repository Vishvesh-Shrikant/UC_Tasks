import React, { useState } from 'react'
import { Trash } from 'lucide-react';
import api from '../api/AxiosApi';
import { useToast } from '@chakra-ui/react';

const DropTasks = ({setTasks, teamId}) => {
    const [active, setActive] = useState()
    const toast=useToast({position:"top"})
  const handleDragOver = (e) => {
    e.preventDefault();
    
    setActive(true);
  };
  const handleDragLeave=()=>{
    setActive(false)
  }
  const handleDragEnd=(e)=>{
    const delTaskId=e.dataTransfer.getData("taskId")

    api.delete(`/user/${teamId}/task/delete/${delTaskId}`,{
        headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    })
    .then(res=>{
        console.log(res)
        toast({
            title: 'Task Deleted.',
            description: "The task has been deleted successfully ",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
        setTasks()
    })
    .catch(err=>{
        console.log(err)
    })

  }
  return (
    <div 
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDragEnd}
    className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
        <Trash />
    </div>
  )
}

export default DropTasks