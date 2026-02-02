import React, { useEffect } from 'react'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import {Loader} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from "./store/useThemeStore";
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore';


const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore()

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

 // ADD THIS USEEFFECT: 
  // This is the "bridge" that tells the browser to change the theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  console.log({authUser});
  if(isCheckingAuth && !authUser) 
    return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )

  return (
    <div>
       <Navbar />
       <Routes>
        <Route path = '/' element={authUser ? <HomePage /> : <Navigate to = '/login' />} />
        <Route path = '/profile' element={authUser ? <ProfilePage /> : <Navigate to = '/login' />} />
        <Route path = '/signup' element={!authUser ? <SignupPage /> : <Navigate to = '/' />} />
        <Route path = '/login' element={!authUser ? <LoginPage /> : <Navigate to = '/' />} />
        <Route path = '/settings' element={<SettingPage />} />
       </Routes>

       <Toaster />
    </div>
  )
}

export default App
