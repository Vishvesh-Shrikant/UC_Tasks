import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import UserContextProvider from './context/UserContextProvider'

function App() {


  return (
    <>

      <UserContextProvider>
        <div className='bg-gradient-to-b from-[#1D3461] via-[#1F487E] to-[#247BA0] p-5 font-texts min-h-screen'>
          <Header/>
          <div className='w-full flex justify-center items-center min-h-screen'>
            <Outlet/>
          </div>
        </div>
      </UserContextProvider>
      
    </>
  )
}

export default App
