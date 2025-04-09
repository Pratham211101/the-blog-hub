import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Input } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Logo from '../assets/tbh-logo.png'
import Button from '@mui/material/Button';


function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div >
            <div className="w-full max-w-md bg-[#fcf4e4] rounded-xl shadow-md p-8">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img src={Logo} alt="TBH Logo" className='ml-3 w-[70px] object-contain h-auto' />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold text-black">Sign Up</h2>
                <p className="mt-2 text-center text-m text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
                    <Input
                        label="Full Name:"
                        placeholder="Enter your full name"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Email:"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be valid",
                            },
                        })}
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />
                    <Button
                        variant="contained" // makes it a solid (raised) button
                        color="primary"     // default theme color (blue)
                        type="submit"
                        fullWidth
                        sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signup
