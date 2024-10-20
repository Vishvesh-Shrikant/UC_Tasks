import React, { useContext, useEffect, useState } from 'react'
import Kanban from '../Components/Kanban'
import { useParams } from 'react-router-dom'
import api from '../api/AxiosApi'


const TaskPage = () => {
  const [teams, setTeams]=useState({})
  
  const {id}=useParams()

  const getSinglePrivTeam=()=>{
    api.get(`/user/privateTeam/get/${id}`,{
      headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    })
    .then(res=>{
      if(res.data.success)
      {
        setTeams(res.data.team)
      }
      else if(!res.data.success)
      {
        return;
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const getSinglePubTeam=()=>{
    api.get(`/user/publicTeam/get/${id}`,{
      headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    })
    .then(res=>{
      if(res.data.success)
      {
        setTeams(res.data.userTeam)
      }
      else
      {
        return;
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getSinglePrivTeam()
    getSinglePubTeam()
  }, [setTeams])


  return (
    <div className='ml-20 py-10 px-5 overflow-x-scroll'>
      <p className='text-xl font-medium px-5'>Team Name: {teams.name}</p>
      <p className='text-xl font-medium px-5'>Team Code: {teams.teamcode}</p>
      <Kanban teamId={id}/>
    </div>
  )
}

export default TaskPage