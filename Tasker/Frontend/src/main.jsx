import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import UserContextProvider from './Context/UserContextProvider.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <UserContextProvider>
          <App/>
      </UserContextProvider> 
    </ChakraProvider>
  </StrictMode>,
)