import React, { useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { toast } from 'react-toastify';
import {login as authLogin} from "../store/authSlice"
import {useDispatch} from "react-redux"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8002/api/v1/login',{
      email: email,
      password: password
    })
    .then(res=>res.data)
    .then(result =>{
      
      localStorage.setItem('accessToken',result.data.accessToken)
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch(authLogin(result.data.user))
      navigate("/welcome");
    })
    .catch(err=>{
      console.log(err);
      toast.warn("Incorrect Email or Password");
    })
  };

  const Google = (e) =>{
    return (
        <>
            <GoogleLogin  onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />
        </>
)}

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center">
        <img src={Image} alt="Login" className="max-w-4/5 max-h-4/5 mt-20" />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-4/5 flex flex-col justify-center">
          <div className="flex justify-center pb-8">
            <img src={Logo} alt="Logo" className="w-12" />
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-yellow-500">Welcome back!</h2>
            <p className="text-xl text-green-600 mt-2">Please enter your details</p>
          </div>
          <form onSubmit={handleLoginSubmit} className="flex flex-col mt-6">
            <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" required className="w-full p-4 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} name="password" required className="w-full p-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              )}
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember-checkbox" className="cursor-pointer" />
                <label htmlFor="remember-checkbox" className="cursor-pointer text-gray-700">Remember for 30 days</label>
              </div>
              <a href="#" className="text-green-600 hover:underline">Forgot password?</a>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button type="submit" onClick={handleLoginSubmit} className="w-full p-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition">Log In</button>
              {/* <button type="button" className="w-full p-4 bg-yellow-500 flex items-center justify-center gap-4 font-bold rounded-full hover:bg-yellow-600 transition">
                <img src={GoogleSvg} alt="Google" className="w-6" /> Log In with Google
              </button> */}
              <Google />
            </div>
          </form>
          <p className="text-center text-gray-700 mt-6">
            Don't have an account? <Link to="/register" className="text-green-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
