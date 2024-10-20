import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/TaskerLogo.png'
import { Button } from '@chakra-ui/react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import api from '../api/AxiosApi'
import UserContext from '../Context/UserContext'


const Navbar = () => {
    const {setUser}= useContext(UserContext)
    const navigate= useNavigate()
    const toast = useToast({position:'top'})

    const logout=()=>{
        api.post('/user/logout' ,{}, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(res=>{
                Cookie.remove('refreshToken', { path: '', domain: '', secure: true, sameSite: 'strict' });
                localStorage.removeItem('accessToken')
                setUser(null)
                toast({
                    title: 'Logged Out',
                    description: "You've been logged out successfully",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                setTimeout(()=>{
                    navigate('/')
                    window.location.href='/'
                }, 500)
        })
        .catch(err =>{
            console.log(err)
        }) 
    }
    


  return (
    <>
        <div className= 'bg-navbar px-3 w-full shadow-md shadow-neutral-700 flex justify-between items-center sticky top-0 z-50' >
            <Link to='/home' className='flex justify-center items-center' >
                <img src={logo} className=' h-16 p-1'/>
            </Link>

            <Button 
            _hover={{bg:'#009FFDBD'}}   transition='all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'   color='#EEF1EF'
            variant='outline' className='mx-2 bg-[#009FFD]'
            onClick={logout}>
              Logout
            </Button>

        </div>
    
    </>
  )
}

export default Navbar