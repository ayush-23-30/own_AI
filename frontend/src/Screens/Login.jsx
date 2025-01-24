import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../custom/Button';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";


function Login() {
  const [eyes,setEyes] = useState(false); 


const toggle = ()=>{
setEyes(!eyes)
console.log(":", eyes);

}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full m-2 max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <div className="relative w-full">
        <input
          type={eyes ? 'text' : 'password'}
              id="password"
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          <div className='absolute bottom-3 right-3' onClick={toggle}>
          {eyes ? <IoEyeSharp color='black'  /> : <FaEyeSlash color='black'/>}

          </div>

          </div>

          </div>
          {/* Submit Button */}
          <Button
          type="submit"
          // loading={loading}
          className="w-full"
        >
       Log In
        </Button>
        </form>
        {/* Navigation to Sign-Up */}
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
