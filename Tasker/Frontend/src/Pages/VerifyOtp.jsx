import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../assets/TaskerLogo.png'
import { HStack, PinInput , PinInputField , Button, useToast} from '@chakra-ui/react'
import UserContext from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const VerifyOtp = () => {
    const [otp, setOtp]=useState();
    const toast= useToast({position:'top'})
    const navigate=useNavigate()
    const {setUser}= useContext(UserContext)
    const handleSubmit=()=>{
        axios.post(`${import.meta.env.VITE_API_URL}/user/verifyotp`, {otp},
            {
                headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
            })
        .then(res=>{
            console.log(res)
            if(res.data.success)
            {
                setUser(res.data.user)
                toast({
                    title: 'Account verified',
                    description: "account verified successfully",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                navigate('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const sendotp=()=>{
        axios.post(`${import.meta.env.VITE_API_URL}/user/sendotp`,{} , {
            headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then((res)=>{
            if(res.data.success)
            {
                toast({
                    title: 'OTP',
                    description: "OTP sent",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        sendotp()
    },[])
  return (
    <>
        <div className='w-full flex justify-center items-center h-screen'>
            <div className='w-1/2 bg-white/20 backdrop-blur-md rounded-md border shadow-lg shadow-black border-white/60 p-3 flex flex-col justify-between items-center'>
                <div>
                    <img src={logo} className='h-14'></img>
                </div>
                <div className=' w-full text-xl m-5 flex juustify-center items-center flex-col'>
                    <p className='w-4/5'>Enter your one time password sent to your regsitered Email ID</p>
                    <HStack className='my-4'>
                        <PinInput otp onChange={(e)=> setOtp(e)}>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                        </PinInput>
                    </HStack>
                    <div className='w-4/5 text-lg'>
                        <p>Did not receive and OTP. <button className='underline font-semibold'> Resend OTP </button> </p>
                    </div>
                    <div className='flex justify-start items-start w-4/5 my-2'>
                        <Button bg='#009FFD' _hover={{bg:'#009FFDDD'}} color='#EEEEEE' width='45%' variant='solid' onClick={handleSubmit}>
                        Verify OTP
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VerifyOtp