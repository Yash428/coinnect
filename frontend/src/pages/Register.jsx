import React, { useState } from "react";
import Image from "../assets/image.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert("Sign Up Clicked! (No Backend)");
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
            <input type="text" placeholder="User Name" name="username" required className="w-full p-4 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
            <input type="email" placeholder="Email" name="email" required className="w-full p-4 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
            <input type="date" name="dob" required className="w-full p-4 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
            <select name="gender" required className="w-full p-4 mb-4 border-b-2 border-gray-600 outline-none bg-gray-100">
              <option value="" disabled selected>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required className="w-full p-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              )}
            </div>
            <div className="relative mt-4">
              <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required className="w-full p-4 border-b-2 border-gray-600 outline-none bg-gray-100" />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl cursor-pointer text-gray-600" />
              )}
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button type="submit" className="w-full p-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition">Sign Up</button>
              <button type="button" className="w-full p-4 bg-yellow-500 flex items-center justify-center gap-4 font-bold rounded-full hover:bg-yellow-600 transition">
                <img src={GoogleSvg} alt="Google" className="w-6" /> Sign Up with Google
              </button>
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
