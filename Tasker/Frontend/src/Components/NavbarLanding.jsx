import React from 'react'
import logo from '../assets/TaskerLogo.png'
import { Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NavbarLanding = () => {
  return (
    <div className=' bg-navbar px-3 w-full shadow-md shadow-neutral-700 flex justify-between items-center sticky top-0' >
        <Link to='/' className='flex justify-center items-center '>
          <img src={logo} className=' h-16 p-1'/>
        </Link>
        <div className='flex justify-center items-center'>
          <Link to='/login'>
            <Button 
            _hover={{bg:'#009FFDEE'}}   transition='all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'   color='#EEF1EF'
            variant='outline'   className='mx-2'>
              Log In
            </Button>
          </Link>
          <Link to='/signup'>
            <Button 
            _hover={{bg:'#009FFDEE'}}   transition='all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'   color='#EEF1EF'
            variant='outline'   className='mx-2'>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
  )
}

export default NavbarLanding