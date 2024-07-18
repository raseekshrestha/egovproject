import { useState, useEffect } from 'react'
import './App.css'
import {
  Routes,
  Route
} from 'react-router-dom';
import LoginComponent from './components/LoginComponent'
import AuthContextProvider from './context/AuthContext'
import AlertContextProvider from './context/AlertContext'
import Home from './components/Home'
import ShowAlert from './components/Alert'
import CustomNavbar from './components/CustomNavbar'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark:bg-[#0D1117]')
  }, []);

  return (
    <>
      <AuthContextProvider>
        <AlertContextProvider>
          <ShowAlert />
          <CustomNavbar />

          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/login' Component={LoginComponent} />
          </Routes>
          {/* <Home /> */}
          {/* <LoginComponent /> */}

        </AlertContextProvider>

      </AuthContextProvider>
    </>
  )
}

export default App
