import React from 'react'
import { Spinner } from '@chakra-ui/react'

const Loader = () => {
  return (
    <>
    <Spinner 
    thickness='4px'
    size='xl' 
    speed='0.8s'
    color='blue.500'
    />
    </>
  
  )
}

export default Loader