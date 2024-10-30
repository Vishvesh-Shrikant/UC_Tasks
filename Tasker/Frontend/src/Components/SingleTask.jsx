import React from 'react'
import { EllipsisVertical } from 'lucide-react';
import {motion} from 'framer-motion'
import DropIndicator from './DropIndicator';
import { Link } from 'react-router-dom';

const SingleTask = ({taskName, taskStatus, taskId, handleDragStart, headingColor, teamId}) => {
  const color=headingColor.slice(6, headingColor.length-1)
  return (
   <>
    <DropIndicator beforeId={taskId} column={taskStatus}/>
    <Link to={`/user/team/${teamId}/${taskId}`}>
      <motion.div 
      layout
      layoutId={taskId}
      draggable="true"
      onDragStart={(e)=>{handleDragStart(e, {taskName, taskStatus, taskId})}}
      className='active:cursor-grabbing cursor-grab  my-1 rounded flex justify-between items-center'
      style={{backgroundColor:color}}>
          <p className='text-base font-medium text-white p-2 '>{taskName}</p>
          <button>
              <EllipsisVertical/>
          </button>
      </motion.div>
    </Link>
    
   </>
  )
}


export default SingleTask