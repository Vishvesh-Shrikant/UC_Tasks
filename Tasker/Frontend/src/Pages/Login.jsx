import React, {useState } from 'react'
import logo from '../assets/TaskerLogo.png'
import { Button, FormControl, FormErrorMessage, FormLabel, Input} from '@chakra-ui/react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Login = () => {


    const [email, setEmail]=useState('')
    const [password, setPassword]= useState('')
    const [isEmailBlank, setEmailBlank]=useState(false)
    const [isPasswordBlank, setPasswordBlank]= useState(false)
    const navigate= useNavigate()

    const handleSubmit= ()=>{
        setEmailBlank(email==='')
        setPasswordBlank(password==='')
        if(isEmailBlank || isPasswordBlank)
        {
            setEmail('')
            setPassword('')
            return;
        }
        axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {email, password})
        .then(res=>{
            console.log(res)
            if(res.data.success)
            {
                setEmail('')
                setPassword('')
                localStorage.setItem("accessToken", res.data.accessToken);
                navigate('/verifyotp')
            }
            
        })
        .then(err=>{
            console.log(err)
        })
    }
  return (
    <>  
        <div className='w-full flex justify-center items-center h-screen'>
            <div className='w-1/2 bg-white/20 backdrop-blur-md rounded-md border shadow-lg shadow-black border-white/60 p-3 flex flex-col justify-between items-center'>
                <Link to='/'>
                    <img src={logo} className='h-14'></img>
                </Link>
                <div className='w-full flex justify-center items-start flex-col p-6'>
                    <FormControl isInvalid={isEmailBlank} isRequired>
                        <FormLabel className='text-lg font-semibold'>Email</FormLabel>
                        <Input type='email' value={email} onChange={e=> setEmail(e.target.value)} placeholder='Enter email' className='text-textColour'></Input>
                        {
                            isEmailBlank &&
                            (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            )
                        }
                    </FormControl>
                    <FormControl className='my-3' isInvalid={isPasswordBlank} isRequired>
                        <FormLabel className='text-lg font-semibold'>Password</FormLabel>
                        <Input type='password' value={password} onChange={e=> setPassword(e.target.value)} placeholder='Enter password' className='text-textColour'></Input>
                        {
                            isPasswordBlank &&
                            (
                                <FormErrorMessage>Password is required.</FormErrorMessage>
                            )
                        }
                    </FormControl>
                    <div className='flex justify-start items-start w-full my-2'>
                        <Button bg='#009FFD' _hover={{bg:'#009FFDDD'}} color='#EEEEEE' width='30%' variant='solid' onClick={handleSubmit}>
                            Log In
                        </Button>
                    </div>
                    <div className='mt-2'>
                        <p> Don't have an account. <Link to='/signup' className='font-semibold underline'> Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Login