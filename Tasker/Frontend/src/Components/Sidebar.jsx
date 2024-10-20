import React, { useEffect, useState } from 'react'
import { motion, useAnimationControls , AnimatePresence} from 'framer-motion'
import {AlignJustify} from 'lucide-react'
import SidebarLinks from './SidebarLinks'
import { GlobeLock, Globe, EllipsisVertical } from 'lucide-react';
import InnerSidebar from './InnerSidebar';
import api from '../api/AxiosApi';
import { useNavigate } from 'react-router-dom';
import { House } from 'lucide-react';

const containerVariants={
    close:{
        width:"4rem",
        transition:{
            type: "spring",
            damping: 15,
            ease:"linear",
            duration:0.5
        }
    },
    open:{
        width:"16rem",
        transition:{
            type: "spring",
            damping: 15,
            ease:"linear",
            duration:0.5
        }
    }
}
const iconVariants={
    open:{
        rotate:360,
        transition:{
            duration: 0.5,
            ease:"easeIn"
        }
    },
    close:{
        rotate:180,
        transition:{
            duration: 0.5,
            ease:"easeIn"
        }
    }
}



const Sidebar = () => {
    const [isOpen, setIsOpen]= useState(false)
    const [privateTeams, setPrivateTeams]= useState([])
    const [publicTeams, setPublicTeams]= useState([])
    const [selectedProject , setSelectedProject]= useState();
    
    const containerControls= useAnimationControls()
    const iconControls= useAnimationControls()
    const navigate= useNavigate()
    
    const getPublicTeams=()=>{
        api.get('/user/publicTeam/get', {
          headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(res=>{
          setPublicTeams(res.data.userPublicTeams)
        })
        .catch(err=>{
          console.log(err)
        })
    }
    const getPrivateTeams=()=>{
        api.get('/user/privateTeam/get', {
          headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(res=>{
            if(res.data.success)
            {
                setPrivateTeams(res.data.userPrivateTeams[0])
            }
        })
        .catch(err=>{
          console.log(err)
        })
    }


    useEffect(()=>{
        if(isOpen)
        {   
            containerControls.start("open")
            iconControls.start("open")
        }
        else
        {
            containerControls.start("close")
            iconControls.start("close")
        }
            
    }, [isOpen])

    const handleSidebar=()=>{
        setIsOpen(prev=>!prev)
    }

    useEffect(()=>{
        getPrivateTeams();
        getPublicTeams();   
    },[getPrivateTeams, getPublicTeams, setPrivateTeams, setPublicTeams])
    
  return (
    <>
        <motion.nav 
        initial="close"
        variants={containerVariants}
        animate={containerControls}
        className='flex flex-col z-40 gap-5 p-4 fixed h-full bg-navbar shadow shadow-neutral-700 border-neutral-700'>
            <motion.div className='w-8 h-8 hover:cursor-pointer flex justify-center items-center'
            onClick={()=>handleSidebar()}
            initial="close"
            variants={iconVariants}
            animate={iconControls}>
                <AlignJustify/>
            </motion.div>   

            <div className='flex flex-col justify-start items-start gap-6'>
                <div 
                onClick={()=>{
                    setIsOpen(!open)
                    setTimeout(()=>{
                        navigate('/')
                    }, 500)
                }} 
                className='flex cursor-pointer'>
                    <House className="min-w-8 w-8 stroke-1"/>
                    <AnimatePresence>
                    {isOpen && (
                        <motion.p className='text-lg whitespace-nowrap overflow-clip tracking-wide mx-1 text-inherit ease-in-out duration-150'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            Home
                        </motion.p>
                    )}
                    </AnimatePresence>
                </div>

                <div className='text-[#FF8427] flex justify-center items-center cursor-pointer hover:bg-neutral-500/50 rounded' 
                onClick={()=>{
                    setIsOpen(!open)
                    setSelectedProject(null)
                    setTimeout(()=>{
                        navigate(`user/teams/${privateTeams._id}` )
                    }, 500)
                }}>
                    
                    <GlobeLock className="min-w-8 w-8 stroke-1"/>
                    <AnimatePresence>
                    {isOpen && (
                    <>
                        <motion.p className='text-lg whitespace-nowrap overflow-clip tracking-wide mx-1 text-inherit ease-in-out duration-150'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            Your Private Team
                        </motion.p>
                        <motion.button className='text-lg whitespace-nowrap overflow-clip tracking-wide mx-1 text-inherit ease-in-out duration-150 hover:bg-white/30 outline-none w-6 h-6 rounded-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            <EllipsisVertical/> 
                        </motion.button>
                    </>
                    )}
                    </AnimatePresence>
                </div>

                <SidebarLinks name={"Public Teams"} isOpen={isOpen} selectedProject={selectedProject} setSelectedProject={setSelectedProject} setIsOpen={setIsOpen} textColour={'text-[#4ECDC4]'}>
                    <Globe className="min-w-8 w-8 stroke-1"/>
                </SidebarLinks>
            </div>
            
        </motion.nav>
        <AnimatePresence>
        {selectedProject!=null && selectedProject=='Public Teams' && (
            <InnerSidebar
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                getData={publicTeams}
                setIsOpen={setIsOpen}
            />
        )}
        </AnimatePresence>
  </>
  )
}

export default Sidebar