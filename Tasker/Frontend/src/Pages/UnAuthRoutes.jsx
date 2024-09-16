import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './Landing'
import Signup from './Signup'
import Login from './Login'
import VerifyOtp from './VerifyOtp'
import UnAuthLayout from '../Layout/UnAuthLayout'

const UnAuthRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<UnAuthLayout/>}>
                <Route index element={<Landing/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/verifyotp' element={<VerifyOtp/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default UnAuthRoutes