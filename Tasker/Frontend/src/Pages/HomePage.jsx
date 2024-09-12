
import React, { useEffect } from 'react'

const HomePage = () => {

  useEffect(()=>{
    console.log(localStorage.getItem("accessToken"))
  },[])

  return (
    <div>HomePage</div>
  )
}

export default HomePage