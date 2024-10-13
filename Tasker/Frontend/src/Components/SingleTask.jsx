import React from 'react'
import { EllipsisVertical } from 'lucide-react';
import {motion} from 'framer-motion'
import DropIndicator from './DropIndicator';


const SingleTask = ({taskName, taskStatus, taskId, handleDragStart}) => {
  return (
   <>
    <DropIndicator beforeId={taskId} column={taskStatus}/>
    <motion.div 
    layout
    layoutId={taskId}
    draggable="true"
    onDragStart={(e)=>{handleDragStart(e, {taskName, taskStatus, taskId})}}
    className='active:cursor-grabbing cursor-grab bg-neutral-700 my-1 rounded flex justify-between items-center'>
        <p className='text-base font-medium text-white p-2 '>{taskName}</p>
        <button>
             <EllipsisVertical/>
        </button>
    </motion.div>
   </>
  )
}


export default SingleTask