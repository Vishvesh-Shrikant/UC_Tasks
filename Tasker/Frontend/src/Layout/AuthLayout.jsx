import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
const Layout = () => {
  
  return (
    <>
      <div className='w-full min-h-screen'>
        <Navbar/>
        <Outlet/> 
      </div>
    </>
  )
}

export default Layout