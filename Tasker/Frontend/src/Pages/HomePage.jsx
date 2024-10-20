
import React, { useContext, useEffect, useState, useRef } from 'react'
import UserContext from '../Context/UserContext'
import { Globe } from 'lucide-react'
import PublicModal from '../Components/PublicModal'

const HomePage = () => {
  
  const {user}=useContext(UserContext)
  const [name, setName]= useState()

  const [openPbc, setPbc]=useState(false)

  const onOpenPbc=()=>setPbc(true)
  const onClosePbc=()=>setPbc(false)

  useEffect(()=>{
    setName(user.name)
  },[])
  //add Loader page once this page is completed
  return (
    <>
      <div className='w-full min-h-screen flex flex-row relative '>
        
        <section className='flex flex-col w-full gap-5 p-10 ml-20'>
          <p className='text-xl font-medium'> Hello, <span className='text-[#FFC800]'>{name}</span> </p>
          <div className='w-full h-56 rounded flex items-center gap-x-8'>
            <div className='w-1/3 h-full bg-neutral-800/50 border border-white/50 rounded-md flex flex-col justify-center items-center cursor-pointer' onClick={onOpenPbc}>
              <Globe size={100} />
              <p className='text-xl font-medium mt-5'>Add new public team</p>
              <PublicModal onClosePbc={onClosePbc} openPbc={openPbc}/>
            </div>
          </div>
        </section>
        
      </div>
    </>
  )
}

export default HomePage

