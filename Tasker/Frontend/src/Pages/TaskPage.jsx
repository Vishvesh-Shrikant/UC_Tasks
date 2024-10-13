import React, { useContext, useEffect, useState } from 'react'
import Kanban from '../Components/Kanban'
import { useParams } from 'react-router-dom'
import api from '../api/AxiosApi'
import UserContext from '../Context/UserContext'

const TaskPage = () => {
  const [teams, setTeams]=useState({})
  const {id}=useParams()

  useEffect(()=>{
    const getSingleTeam=()=>{
      api.get(`/user/privateTeam/get/${id}`,{
        headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
      })
      .then(res=>{
        if(res.data.success)
        {
          setTeams(res.data.team)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
    getSingleTeam()
  })


  return (
    <div className='ml-20 py-10 px-5 overflow-x-scroll'>
      <p>{teams.name}</p>
      <Kanban teamId={id}/>
    </div>
  )
}

export default TaskPage