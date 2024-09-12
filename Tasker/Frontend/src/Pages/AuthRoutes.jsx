import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Layout from '../Layout/AuthLayout'
import HomePage from './HomePage'

const AuthRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AuthRoutes