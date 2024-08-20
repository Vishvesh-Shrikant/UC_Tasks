import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios' 

const UserContextProvider = ({children}) => {
  const [user,setUser]= useState(null)
  const [viewpw, setViewpw]=useState(null)
  const [loggedin, setLoggedin]=useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('http://localhost:5001/verify')
          .then(response =>{
            setUser(response.data)
            setLoggedin(true)
          })
          .catch(() => localStorage.removeItem('token'));
      }
  })

  const login = (email, password) => {
    axios.post('http://localhost:5001/login', { email, password })
    .then(response=>{
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);         
      
    })
    .catch(err=> console.log(err))
  };

  const register = (username, email, password) => {
    axios.post('http://localhost:5001/signin', { username, email, password })
    .then(response=>{
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      alert("Sign Up complete")
    })
    .catch(err=>console.log(err))
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoggedin(false)
  };

  return (
    <UserContext.Provider value={{viewpw, setViewpw, login, register, logout, user, loggedin }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider