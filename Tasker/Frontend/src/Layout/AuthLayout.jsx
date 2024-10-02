import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
const Layout = () => {
  
  return (
    <>
      <div className='w-full min-h-screen'>
        <Navbar/>
        <div className='relative'>
          <Sidebar/>
          <Outlet/> 
        </div>
        
      </div>
    </>
  )
}

export default Layout