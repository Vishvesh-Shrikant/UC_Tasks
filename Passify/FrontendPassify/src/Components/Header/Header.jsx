import React, { useContext} from 'react'
import { Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'

import MdHeader from './MdHeader';
import SubMdHeader from './SubMdHeader';
const Header = () => {
    const {loggedin, logout} = useContext(UserContext)

    const handleLogout=async ()=>{
        await logout()
        if(!loggedin)
            alert("Logged out successfully")
    }

  return (
    <div className='w-full bg-[#DDDDDD] text-textColour px-6 py-3 rounded-2xl font-semibold flex justify-between items-center mb-8 shadow-md shadow-black/80'>
        <Link to='/' className='w-1/2'>
            <p className='text-3xl'>PASSIFY</p>
        </Link>
        <div className="max-md:hidden w-2/5">
            <MdHeader/>   
        </div>
        <div className='md:hidden w-1/2 '>
            <SubMdHeader/>
        </div>
    </div>
  )
}

export default Header