import { useContext, useEffect} from 'react'
import './App.css'
import UserContext from './Context/UserContext'
import AuthRoutes from './Pages/AuthRoutes';
import UnAuthRoutes from './Pages/UnAuthRoutes';
import api from './api/AxiosApi'

function App() {
  const {user, setUser}= useContext(UserContext)  
  
  useEffect(()=>{
    const checkLoggedIn=()=>{
      if(localStorage.getItem("accessToken"))
      {
        try
        {
          api.post('/user/verify',{}, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
          })
          .then(res=>{
            if(res.data.success)
            {
              setUser(res.data.user)
            }
          })
        }
        catch(err)
        {
            console.log(err)
        }
      }
  }
    checkLoggedIn()
  })

  return (
    <>
      <div className=' bg-background w-full min-h-screen text-textColour font-Raleway'>
          {user? <AuthRoutes/> : <UnAuthRoutes/>}
      </div>
    </>
  )
}

export default App
