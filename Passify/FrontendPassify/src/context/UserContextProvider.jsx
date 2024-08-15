import React, { useState } from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
    const [user,setUser]= useState(null)
    const [viewpw, setViewpw]=useState(null)

  return (
    <UserContext.Provider value={{user, setUser, viewpw, setViewpw}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider