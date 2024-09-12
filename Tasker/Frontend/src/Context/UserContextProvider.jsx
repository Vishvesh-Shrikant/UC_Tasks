import React, {useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'



const UserContextProvider = ({children}) => {
    const [user, setUser]= useState()

    const handleRefreshToken=()=>{
      axios.post(`${import.meta.env.VITE_API_URL}/user/refreshToken`,{}, {
        withCredentials:true
      })
      .then(res=>{
        localStorage.setItem('accessToken', res.data.accessToken)
      })
      .catch(err=>{
        console.log(err)
      })
    }

    const checkLoggedIn=()=>{
        if(localStorage.getItem("accessToken"))
        {
          try
          {
            axios.get(`${import.meta.env.VITE_API_URL}/user/verify`, {
              headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
              }
            })
            .then(res=>{
              if(res.data.success)
              {
                setUser(res.data.user)
              }
            })
          }
          catch(err)
          {
              console.log(err)
          }
        }
    }
    

    useEffect(()=>{
      //handleRefreshToken()
      checkLoggedIn()
    })
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider