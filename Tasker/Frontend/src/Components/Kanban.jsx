import React, { useState, useEffect, useCallback, useContext } from 'react'
import api from '../api/AxiosApi'
import Columns from './Columns'
import DropTasks from './DropTasks'


const Kanban = ({teamId}) => {
  const [tasks, setTasks]= useState([])
  const getTasks=()=>{
    api.get(`/user/${teamId}/task/get`,{
      headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    })
    .then(res=>{
      if(res.data.success)
        setTasks(res.data.getTasks)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getTasks()
  })

  return (
    <div className='w-full h-full flex'>
      <Columns
        title="Backlog"
        column="backlog"
        headingColor="text-[#8D99AE]"
        tasks={tasks}
        setTasks={getTasks}
        teamId={teamId}
      />
      <Columns
        title="To-Do"
        column="todo"
        headingColor="text-[#FFB100]"
        tasks={tasks}
        setTasks={getTasks}
        teamId={teamId}
      />
      <Columns
        title="In progress"
        column="inprogress"
        headingColor="text-[#25CED1]"
        tasks={tasks}
        setTasks={getTasks}
        teamId={teamId}
      />
      <Columns
        title="Completed"
        column="completed"
        headingColor="text-[#7AC74F]"
        tasks={tasks}
        setTasks={getTasks}
        teamId={teamId}
      />
      <DropTasks setTasks={getTasks} teamId={teamId}/>
    </div>
  )
}

export default Kanban

