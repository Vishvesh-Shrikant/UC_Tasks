import React, { useEffect, useState } from 'react'
import { motion, useAnimationControls , AnimatePresence} from 'framer-motion'
import {AlignJustify} from 'lucide-react'
import SidebarLinks from './SidebarLinks'
import { GlobeLock, Globe } from 'lucide-react';
import InnerSidebar from './InnerSidebar';
import api from '../api/AxiosApi';


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
          setPrivateTeams(res.data.userPrivateTeams)
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
    },[])

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
                <SidebarLinks name={"Private Teams"} isOpen={isOpen} selectedProject={selectedProject} setSelectedProject={setSelectedProject} setIsOpen={setIsOpen}>
                    <GlobeLock className="min-w-8 w-8 stroke-1"/>
                </SidebarLinks>
                <SidebarLinks name={"Public Teams"} isOpen={isOpen} selectedProject={selectedProject} setSelectedProject={setSelectedProject} setIsOpen={setIsOpen}>
                    <Globe className="min-w-8 w-8 stroke-1"/>
                </SidebarLinks>
            </div>
            
        </motion.nav>
        <AnimatePresence>
        {selectedProject!=null && selectedProject=='Private Teams'  && isOpen && (
            <InnerSidebar
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                getData={privateTeams}
                setIsOpen={setIsOpen}
            />
        )}
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