import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Layout from '../Layout/AuthLayout'
import HomePage from './HomePage'
import TaskPage from './TaskPage'

const AuthRoutes = () => {

  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path='/' element={<Layout/>}>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/user/teams/:id' element={<TaskPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AuthRoutes