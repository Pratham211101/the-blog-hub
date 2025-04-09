
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import {Input} from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import logo from '../assets/tbh-logo.png';
import  Button  from '@mui/material/Button';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-28 bg-gray-50 rounded-2xl">
            <div className="w-full max-w-md bg-[#fcf4e4] p-8 rounded-xl shadow-md">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img src={logo} alt="TBH Logo" className='ml-3 w-[70px] object-contain h-auto' />
                    </span>
                </div>
                <h2 className="text-3xl font-bold mb-2 text-center">Sign In</h2>
                <p className="text-gray-600 text-center mb-6">
                    Don&apos;t have an account?{' '}
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Optional: Google Sign-In */}
                <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-100 transition mb-6">
                    <FcGoogle className="text-lg" />
                    <span>Google</span>
                </button>

                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="space-y-4">
                    <Input
                        label="Email:"
                        placeholder="name@example.com"
                        type="email"
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    'Email address must be a valid address',
                            },
                        })}
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <Button
                        variant="contained" // makes it a solid (raised) button
                        color="primary"     // default theme color (blue)
                        type="submit"
                        fullWidth
                        sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                    >
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
