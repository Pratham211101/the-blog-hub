import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'
import Button from '@mui/material/Button';
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logoutHandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
            navigate('/login')
        })
        
    }
  return (
    <Button 
      onClick={logoutHandler}
      sx={{
        borderRadius: '999px',        // full pill shape
        paddingX: 3,                  // px-6 equivalent
        paddingY: 1,                  // py-2 equivalent
        textTransform: 'none',        // normal-case
        backgroundColor: '#27548A',   // tailwind blue-500
        '&:hover': {
          backgroundColor: '#eef6b6', // tailwind blue-400,
          color: '#1e3a8a'
        },
      }}
      variant="contained"
    >
    <FaPowerOff className='mr-2'/>  
    Logout</Button>
  )
}

export default LogoutBtn