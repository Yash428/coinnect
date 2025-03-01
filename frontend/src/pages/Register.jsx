import React, { useState } from "react";
import Image from "../assets/image.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import {login as authLogin} from "../store/authSlice"
import {useDispatch} from "react-redux"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDOB] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    axios.post('http://localhost:8002/api/v1/register',{
      email: email,
      password: password,
      full_name: name,
      gender: gender,
      dob: dob
    })
    .then(res=>res.data)
    .then(result =>{
      toast.success("Registered successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/login")
    })
    .catch(err=>{
      console.log(err);
      toast.warn("Error", {
        position: "top-right",
        autoClose: 2000,
      });
    })
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center">
        <img src={Image} alt="Sign Up" className="max-w-4/5 max-h-4/5 mt-20" />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-4/5 flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-600">Sign <span className="text-yellow-500">Up</span></h2>
          </div>
          <form onSubmit={handleRegisterSubmit} className="flex flex-col mt-6">
            <input type="text" placeholder="User Name" onChange={e=>setName(e.target.value)} value={name} name="username" required className="w-full p-2 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
            <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} value={email} name="email" required className="w-full p-2 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
            <input type="date" name="dob" onChange={e=>setDOB(e.target.value)} value={dob} required className="w-full p-2 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
            <select name="gender" onChange={e=>setGender(e.target.value)} value={gender} required className="w-full p-2 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100">
              <option value="" disabled selected>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} onChange={e=>setPassword(e.target.value)} value={password} placeholder="Password" name="password" required className="w-full p-2 border-b-2 border-gray-600 outline-none bg-gray-100" />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              )}
            </div>
            <div className="relative mt-4">
              <input type={showPassword ? "text" : "password"} onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirm Password" name="confirmPassword" required className="w-full p-2 border-b-2 border-gray-600 outline-none bg-gray-100" />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              )}
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button onClick={handleRegisterSubmit} type="submit" className="w-full p-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition">Sign Up</button>
              
            </div>
          </form>
          <p className="text-center text-gray-700 mt-6">
            Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
