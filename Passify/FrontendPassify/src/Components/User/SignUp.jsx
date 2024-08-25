import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext'
import { Link, NavLink, useNavigate } from 'react-router-dom';
const SignUp = () => {

  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [username, setUsername]=useState("")

  const {register}=useContext(UserContext)
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/login')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className='flex flex-col justify-center items-start bg-[#FCFCFC] rounded-2xl w-1/2' onSubmit={handleSubmit}>
            <div className='flex-col flex justify-center items-start px-10 py-3 w-full'>
                <div className='w-full flex flex-col justify-between items-start my-2'>
                    <label className='text-lg font-semibold'>Username<span className='text-[#FB3640] text-xs pb-3'>*</span></label>
                    <input type='text' placeholder='Enter username' className='outline-none border border-textColour p-2 w-full rounded-lg' value={username} onChange={e=> setUsername(e.target.value.trim())}/>
                </div>

                <div className='w-full flex flex-col justify-between items-start my-2'>
                    <label className='text-lg font-semibold'>Email<span className='text-[#FB3640] text-xs pb-3'>*</span></label>
                    <input type='text' placeholder='Enter email' className='outline-none border border-textColour p-2 w-full rounded-lg' value={email} onChange={e=> setEmail(e.target.value.trim())}/>

                </div>
                <div className='w-full flex flex-col justify-between items-start my-2'>
                    <label className='text-lg font-semibold'> Password<span className='text-[#FB3640] text-xs pb-3'>*</span></label>
                    <input type='text' placeholder='Enter password' className='outline-none border border-textColour p-2 w-full rounded-lg' value={password} onChange={e=>setPassword(e.target.value.trim())}/>
                </div>
            </div>
            <div className='flex justify-between items-center px-10 pb-3 w-full'>
                <button className='bg-[#63C132] w-1/4 border-textColour py-2 rounded-xl font-semibold text-lg'
                onClick={handleSubmit}> Sign Up</button>
            </div>

            <div className='flex justify-center items-center text-base font-texts px-10 py-2'>
              <p className='mr-3'>Already have an account</p>
              <Link to='/login' className='font-semibold underline'>Log In</Link>
            </div>
        </form>
  )
}

export default SignUp