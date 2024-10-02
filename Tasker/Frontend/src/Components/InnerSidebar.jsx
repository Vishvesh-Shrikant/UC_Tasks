import { motion } from 'framer-motion'
import React from 'react'
import {X} from 'lucide-react'
import { Button } from '@chakra-ui/react'
import { Plus } from 'lucide-react';
import RouteLinks from './RouteLinks'

const variants={
    close:{
        x:-300,
        left:80,
        opacity:0,
        transition:{
            duration:0.4,
        type:"linear",
        ease:"easeInOut"
        }
    },
    open:{
        x:0,
        left:256,
        opacity:100,
        transition:{
            duration:0.4,
        type:"linear",
        ease:"easeInOut"
        }
    }
}


const InnerSidebar = ({selectedProject, setSelectedProject, getData, setIsOpen}) => {

  return (
    <motion.nav variants={variants} 
    initial="close" 
    animate="open" 
    exit="close"
    className='h-full w-64 flex flex-col  gap-7 fixed z-30 bg-navbar ml-0 p-5 '>
        
        <div className=' flex justify-between items-center'>
            <p className='font-semibold text-xl '>{selectedProject}</p>
            <button className='cursor-pointer' onClick={() => setSelectedProject(null)}>
                <X  className="w-8 stroke-neutral-400" />
            </button>
        </div> 
        <div className='flex flex-col justify-center items-start gap-4'>
            <div className='w-full'>
                <Button 
                _hover={{bg:'#009FFDBD'}}  transition='all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'   color='#EEF1EF'
                variant='outline' className=' bg-[#009FFD] text-2xl w-full'>
                Add
                <Plus/>
                </Button>
            </div>
            {
                getData.map((data)=>(
                    <RouteLinks key={data._id} id={data._id} teamname={data.name} setIsOpen={setIsOpen}  setSelectedProject={setSelectedProject}>
                    </RouteLinks>
                ))
            }
        </div>
    </motion.nav>
  )
}

export default InnerSidebar