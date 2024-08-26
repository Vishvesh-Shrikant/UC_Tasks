import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'

const UserContextProvider = ({children}) => {
  const [user,setUser]= useState(null)
  const [viewpw, setViewpw]=useState(null)
  const [loggedin, setLoggedin]=useState(false)

  const navigate = useNavigate()

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
      navigate('/login')
    })
    .catch(err=>
      alert(err.response.data.msg))
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoggedin(false)
    navigate('/')
  };

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

  return (
    <UserContext.Provider value={{viewpw, setViewpw, login, register, logout, user, loggedin }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider