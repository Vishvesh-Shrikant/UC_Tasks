import { useContext} from 'react'
import './App.css'
import UserContext from './Context/UserContext'
import AuthRoutes from './Pages/AuthRoutes';
import UnAuthRoutes from './Pages/UnAuthRoutes';


function App() {
  const {user}= useContext(UserContext)  
  return (
    <>
      <div className=' bg-background w-full min-h-screen text-textColour font-Raleway'>
          {user? <AuthRoutes/> : <UnAuthRoutes/>}
      </div>
    </>
  )
}

export default App
