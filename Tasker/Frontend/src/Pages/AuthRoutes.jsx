import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Layout from '../Layout/AuthLayout'
import HomePage from './HomePage'

const AuthRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path='/' element={<Layout/>}>
                <Route path='/home' element={<HomePage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AuthRoutes