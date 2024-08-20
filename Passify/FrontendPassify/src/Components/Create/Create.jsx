import axios from 'axios'
import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import CreateBox from './CreateBox'

const Create = () => {

    const {user, loggedin}= useContext(UserContext)
    const navigate= useNavigate()


    if(loggedin)
    {
        return (<CreateBox user={user}/>)
    }
   

  return (
    <>
        <div className=' w-full  flex flex-col justify-center items-center'>
            <p className='text-3xl text-[#FCFCFC] font-semibold my-10'>To create password , login or sign up </p>
            <div className='flex justify-center items-center px-10 pb-3 w-full'>
                <button className='bg-[#63C132] w-1/4 border-textColour py-2 rounded-xl font-semibold text-lg mx-5'
                        onClick={()=>{navigate('/login')}}> Login</button>
                <button className='bg-[#63C132] w-1/4 border-textColour py-2 rounded-xl font-semibold text-lg'
                        onClick={()=>{navigate('/signup')}}> Sign Up</button>
            </div>
        </div>
    </>
            
  )
}

export default Create