import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Create from './Components/Create/Create.jsx'
import View from './Components/ViewPW/View.jsx'
import SinglePass from './Components/ViewPW/SinglePass.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App/>}>
      <Route path='/create' element={<Create/>}/>
      <Route path='/view' element={<View/>}/>
      <Route path='/view/:name' element={<SinglePass/>}/>
    </Route>


))



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)