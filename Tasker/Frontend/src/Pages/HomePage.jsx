
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/AxiosApi'
import Sidebar from '../Components/Sidebar'
import UserContext from '../Context/UserContext'

const HomePage = () => {
  
  const {user}=useContext(UserContext)
  const [name, setName]= useState()


  useEffect(()=>{
    setName(user.name)
  },[])
  //add Loader page once this page is completed
  return (
    <>
      <div className='w-full min-h-screen flex flex-row relative '>
        
        <section className='flex flex-col w-full gap-5 p-10 ml-20'>
          <p> Hello , {name}</p>
          <div className='w-full h-80 border border-neutral-500/50 bg-neutral-800/50 rounded'/>
          <div className='flex flex-row gap-5'>
          <div className='w-1/2 h-64 border border-neutral-500/50 bg-neutral-800/50 rounded'/>
          <div className='w-1/2 h-64 border border-neutral-500/50 bg-neutral-800/50 rounded'/>
          
          </div>

        </section>
        
      </div>
    </>
  )
}

export default HomePage

/*<button className='bg-red-900 font-semibold p-1' onClick={createPrivateTeam}> create private team </button>
        <button className='bg-red-900 font-semibold p-1 mx-2' onClick={createPublicTeam}> create public team </button>*/