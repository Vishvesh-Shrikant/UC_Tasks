import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const Header = () => {
    const {loggedin, logout} = useContext(UserContext)

    const handleLogout=async ()=>{
        await logout()
        if(!loggedin)
            alert("Logged out successfully")
    }

  return (
    <div className='w-full bg-[#DDDDDD] text-textColour px-6 py-3 rounded-2xl font-semibold flex justify-between items-center mb-8 shadow-md shadow-black/80'>
        <Link to='/'>
            <p className='text-3xl'>PASSIFY</p>
        </Link>
        <nav className=' flex justify-between w-2/5 items-center text-lg'>
        
            <NavLink to='/' className={({isActive})=>`relative transition duration-300 ease-in-out after:transition  after:duration-300 after:ease-in-out ${isActive?'after:content-[""] after:w-2/3 after:absolute after:h-[0.13rem] after:bg-textColour after:bottom-0 text-textColour after:left-0' : 'hover:after:content-[""] hover:after:w-2/3 hover:after:absolute hover:after:h-[0.13rem] hover:after:bg-textColour hover:after:bottom-0 hover:after:left-0 text-textColour/80 hover:text-textColour' }`}>
                Home
            </NavLink>
            <NavLink to='/create' className={({isActive})=>`relative transition duration-300 ease-in-out after:transition after:duration-300 after:ease-in-out ${isActive?'after:content-[""] after:w-2/3 after:absolute after:h-[0.13rem] after:bg-textColour after:bottom-0 text-textColour after:left-0' : 'hover:after:content-[""] hover:after:w-2/3 hover:after:absolute hover:after:h-[0.13rem] hover:after:bg-textColour hover:after:bottom-0 hover:after:left-0 text-textColour/80 hover:text-textColour'}`}>
                Create
            </NavLink>
            <NavLink to='/view' className={({isActive})=>`relative transition duration-300 ease-in-out after:transition after:duration-300after:ease-in-out ${isActive?'after:content-[""] after:w-2/3 after:absolute after:h-[0.13rem] after:bg-textColour after:bottom-0 text-textColour after:left-0':'hover:after:content-[""] hover:after:w-2/3 hover:after:absolute hover:after:h-[0.13rem] hover:after:bg-textColour hover:after:bottom-0 hover:after:left-0 text-textColour/80 hover:text-textColour'}`}>
                View
            </NavLink>
            <a href='https://github.com/Vishvesh-Shrikant' target='_blank' className='relative transition duration-300 ease-in-out after:transition after:duration-300after:ease-in-out hover:after:content-[""] hover:after:w-2/3 hover:after:absolute hover:after:h-[0.13rem] hover:after:bg-textColour hover:after:bottom-0 hover:after:left-0 text-textColour/80 hover:text-textColour cursor-pointer'>About</a>

            {
                loggedin &&
                (
                    <div className='relative transition duration-300 ease-in-out after:transition after:duration-300after:ease-in-out hover:after:content-[""] hover:after:w-2/3 hover:after:absolute hover:after:h-[0.13rem] hover:after:bg-textColour hover:after:bottom-0 hover:after:left-0 text-textColour/80 hover:text-textColour cursor-pointer'
                    onClick={handleLogout}
                    >
                        Logout
                    </div>
                    )
            }
            {
                !loggedin &&
                (
                    <NavLink to='/signup' className={({isActive})=>`relative transition duration-300 ease-in-out after:transition after:duration-300after:ease-in-out ${isActive?'after:content-[""] after:w-2/3 after:absolute after:h-[0.13rem] after:bg-textColour after:bottom-0 text-textColour after:left-0':'hover:after:content-[""] hover:after:w-2/3 hover:after:absolute hover:after:h-[0.13rem] hover:after:bg-textColour hover:after:bottom-0 hover:after:left-0 text-textColour/80 hover:text-textColour'}`}>
                        Login/Sign Up
                    </NavLink>
                )
            }
        </nav>
    </div>
  )
}

export default Header