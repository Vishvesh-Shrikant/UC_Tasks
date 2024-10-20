import React, {useState } from 'react'
import logo from '../assets/TaskerLogo.png'
import api from '../api/AxiosApi'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
    const [name, setName]= useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]= useState('')

    const [isNameBlank, setNameBlank] =useState(false)
    const [isEmailBlank, setEmailBlank]=useState(false)
    const [isPasswordBlank, setPasswordBlank]= useState(false)
    const toast= useToast({position:'top'})
    const navigate= useNavigate()
    
    const handleSubmit=()=>{
        setNameBlank(name=='')
        setEmailBlank(email==='')
        setPasswordBlank(password==='')

        if(isNameBlank || isEmailBlank || isPasswordBlank)
        {
            setName('')
            setEmail('')
            setPassword('')
        }
        else
        {
            api.post('/user/signup', {name:name, email:email, password:password})
            .then(res=>{
                if(res.data.success)
                {
                    setName('')
                    setEmail('')
                    setPassword('')
                    const userid= res.data.new_user._id
                    console.log(userid)
                    api.post('/user/privateTeam/createFirst', { 
                        id:userid, name:"Your Private Team"
                    })
                    .then(response=>{
                        console.log(response)
                        if(response.data.success)
                            {
                                toast({
                                    title: 'Account created.',
                                    description: "We've created your account for you.",
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true,
                                })
                                navigate('/login')
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
  return (
    <>
    <div className='w-full flex justify-center items-center h-screen'>
            <div className='w-1/2 bg-white/20 backdrop-blur-md rounded-md border shadow-lg shadow-black border-white/60 p-2 flex flex-col justify-between items-center'>
                <Link to='/'>
                    <img src={logo} className='h-14'></img>
                </Link>
                <div className='w-full flex justify-center items-start flex-col p-4'>
                    <FormControl isRequired isInvalid={isNameBlank}>
                        <FormLabel className='text-lg font-semibold'>Name</FormLabel>
                        <Input type='text' value={name} onChange={e=> setName(e.target.value)} placeholder='Enter name' className='text-textColour'></Input>
                        {
                            isNameBlank &&
                            (
                                <FormErrorMessage>Name is required.</FormErrorMessage>
                            )
                        }
                    </FormControl>
                    <FormControl className='my-3' isRequired isInvalid={isEmailBlank}>
                        <FormLabel className='text-lg font-semibold'>Email</FormLabel>
                        <Input type='email' value={email} onChange={e=> setEmail(e.target.value)} placeholder='Enter email' className='text-textColour'></Input>
                        {
                            isEmailBlank &&
                            (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            )
                        }
                    </FormControl>
                    <FormControl className='mb-3'  isRequired isInvalid={isPasswordBlank}>
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
                            Sign Up
                        </Button>
                    </div>
                    <div className='mt-2'>
                        <p>Already have an account. <Link to='/login' className='font-semibold underline'> Log In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup