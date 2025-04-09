
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  // Example state and effect usage
  const [loading, setloading] = useState(true);
  const dispatch= useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  },[])
  
  return !loading ? 
  <div className=''>
    <div className='min-h-screen flex flex-col justify-between items-center bg-[#9EC6F3]'>
    <Header/>
    <main className='flex-1 flex items-center justify-center w-full'>
      <Outlet/>
    </main>
    <Footer/>
    </div>
  </div> 
  : (null)
}

export default App;
