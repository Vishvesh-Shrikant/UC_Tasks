import React, { useState } from 'react'
import SingleTask from './SingleTask'
import AddTasks from './AddTasks'
import api from '../api/AxiosApi'
import DropIndicator from './DropIndicator'
const Columns = ({title, headingColor, column, tasks, setTasks, teamId}) => {
    const [active, setActive]= useState(false)


    const handleDragStart=(e, task)=>{
      e.dataTransfer.setData("taskId", task.taskId)
    }
    const handleDragOver=(e)=>
    {
      e.preventDefault()
      highlightIndicator(e)
      setActive(true)
    }

    const handleDragLeave=()=>{
      setActive(false)
      clearHighlight()
    }
    const handleDragEnd=(e)=>{
      setActive(false)
      clearHighlight()


      const taskId=e.dataTransfer.getData('taskId')
      console.log(taskId)
      const indicators=getIndicator()
      const {element}= getNearestIndicator(e, indicators)

      const before= element.dataset.before || -1;

      if(before !== taskId)
      {
          api.patch(`/user/${teamId}/task/update/${taskId}`, {status:column}, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
          })
          .then(res=>{
            setTasks()
          })
          .catch(err=>{
            console.log(err)
          })
      }
    }

    //FOR THE PURPLE INDICATORS
    const highlightIndicator=(e)=>{
      const indicators=getIndicator()
      clearHighlight(indicators)
      const el=getNearestIndicator(e, indicators)
      el.element.style.opacity="1";
    }
    const getNearestIndicator=(e, indicators)=>{
      const DISTANCE_OFFSET=50

      const el= indicators.reduce((closest, child)=>{
        const box= child.getBoundingClientRect()
        const offset= e.clientY-(box.top+ DISTANCE_OFFSET)

        if(offset<0 && offset>closest.offset)
          return {offset:offset, element:child}
        else
          return closest
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      })

      return el
    }
    const getIndicator=()=>{
      return Array.from (document.querySelectorAll(`[data-column="${column}"]`))
    }
    const clearHighlight=(els)=>{
      const indicators = els || getIndicator();
      indicators.forEach((i) => {
        i.style.opacity = "0";
      });
    }


    const filteredTasks= tasks.filter((task)=>task.status===column)
  return (
    <div className='shrink-0 w-64 p-5'>
        <div className='mb-3 flex items-center justify-between'>
            <p className={`font-semibold text-xl ${headingColor}`}>{title}</p>
            <p className='rounded text-sm text-white'>{filteredTasks.length} </p>
        </div>
        <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors rounded ${active?"bg-black/10":"bg"}`}>
          {

            filteredTasks.map((task)=>(
              <div key={task._id}>
                <SingleTask key={task._id} taskName={task.taskName} taskStatus={task.status} taskId={task._id}
                handleDragStart={handleDragStart} headingColor={headingColor} teamId={teamId}/>
              </div>
            ))
          }
          <DropIndicator beforeId={null} column={column}/>
          <AddTasks column={column} setTasks={setTasks} teamId={teamId} headingColor={headingColor} title={title}/>
        </div>
    </div>
  )
}

export default Columns