'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../components/utils';
import { Mail, Lock, LogIn, UserPlus, Coins } from 'lucide-react';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name as keyof typeof loginInfo] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('email and password are required')
    }
    try {
      const url = `https://crypto-tracker-full-stack-mern.onrender.com/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        {/* Header with icon */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
            <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Sign in to access your crypto dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor='email' className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                onChange={handleChange}
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email address'
                value={loginInfo.email}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                onChange={handleChange}
                type='password'
                name='password'
                id='password'
                placeholder='Enter your password'
                value={loginInfo.password}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          <button
            type='submit'
            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded hover:bg-blue-700 font-medium flex items-center justify-center space-x-2 cursor-pointer text-sm sm:text-base"
          >
            <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Sign In</span>
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Don&apos;t have an account?</span>
            </div>
          </div>
          <Link
            href="/signup"
            className="mt-4 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium cursor-pointer text-sm sm:text-base"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </Link>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 9999999,
          width: 'auto',
          padding: 0,
          margin: 0
        }}
      />
    </div>
  )
}

export default Login
