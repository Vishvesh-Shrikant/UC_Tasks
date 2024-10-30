import React, { useContext, useEffect, useState } from 'react'
import Kanban from '../Components/Kanban'
import { useParams } from 'react-router-dom'
import api from '../api/AxiosApi'


const TaskPage = () => {
  const [teams, setTeams]=useState({})
  const [priv, setPriv]= useState(true)
  const {id}=useParams()

  const getSinglePrivTeam=()=>{
    api.get(`/user/privateTeam/get/${id}`,{
      headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    })
    .then(res=>{
      if(res.data.success)
      {
        setTeams(res.data.team)
        setPriv(true)
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
        setPriv(false)
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
  })


  return (
    <div className='ml-20 py-10 px-5 overflow-x-scroll font-Raleway'>
      <p className='text-xl font-medium px-5 '>Team Name: <span className='text-[#FFC800]'>{teams.name}</span></p>
      {
        !priv &&
          <p className='text-xl font-medium px-5 '>Team Code: <span className='text-[#4ECDC4]'>{teams.teamcode}</span></p>
      }
      <Kanban teamId={id}/>
    </div>
  )
}

export default TaskPage