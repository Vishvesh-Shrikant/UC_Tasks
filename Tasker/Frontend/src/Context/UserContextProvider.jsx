import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'
import api from '../api/AxiosApi'



const UserContextProvider = ({children}) => {
    const [user, setUser]= useState(null) 

    useEffect(()=>{
      const checkLoggedIn=()=>{
        if(localStorage.getItem("accessToken"))
        {
          try
          {
            api.post('/user/verify',{}, {
              headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
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
      checkLoggedIn()
    },[])

  return (
    <UserContext.Provider value={{user, setUser }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider