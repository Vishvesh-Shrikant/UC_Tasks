import React from 'react'
import NavbarLanding from '../Components/NavbarLanding'
import logo from '../assets/TaskerLogo.png'
import demo from '../assets/TaskerJiraDemo.mp4'
import {Typewriter} from 'react-simple-typewriter'

const Landing = () => {
  return (
    <>
      {/* LANDING PAGE HEADER */}
      <NavbarLanding/>
      <div className='h-full w-full p-20'>
        <div className='w-full flex flex-col justify-center items-center'>
          <img src={logo} className='w-3/4'></img>
          <p className='text-3xl font-normal text-[#FF8427]'>Agile Board for collaboration, management and synchronization</p>
        </div>
        <div className='w-full h-full my-20 flex flex-col justify-center items-center gap-x-5 text-5xl'>
          <video src={demo} autoPlay loop muted className=' w-3/4 border border-white rounded-lg mb-10'/> 
          <div>
            <Typewriter 
              words={["Easily organize & prioritize Tasks", "Enhance Collaboration", "Flexible to work with"]} 
              loop={false}
              cursor 
              cursorBlinking={true}
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={70}
              delaySpeed={1200}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing