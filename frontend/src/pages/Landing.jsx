import React from "react";
import Image from "../assets/image.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="w-full flex justify-center items-center py-4 bg-white fixed top-0 left-0 z-50">
        <div className="flex items-center justify-center px-6 py-2 border-2 border-yellow-500 rounded-2xl bg-white w-3/5">
          <ul className="flex list-none gap-8 text-2xl font-bold text-green-600">
            <li><Link to="/about" className="hover:text-green-700">ABOUT US</Link></li>
            <li><Link to="/contact" className="hover:text-green-700">CONTACT US</Link></li>
            <li><Link to="/get-in-touch" className="hover:text-green-700">GET IN TOUCH</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full mt-24 px-10 py-16 rounded-lg">
        <div className="flex-1 pr-10">
          <h1 className="text-6xl font-bold text-center md:text-left">
            <span className="text-yellow-500 font-bold">Coin</span>
            <span className="text-green-600 font-bold">nect</span>
          </h1>
          <h3 className="text-4xl mt-2 text-center md:text-left">
            <span className="text-yellow-500">Link it, </span>
            <span className="text-green-600">Coin it, </span>
            <span className="text-yellow-500">Own it.</span>
          </h3>

          {/* Sign Up and Login Buttons */}
          <div className="flex gap-6 mt-6 justify-center md:justify-start">
            <Link to="/register" className="px-6 py-3 text-xl font-bold border-2 border-yellow-500 rounded-full bg-white text-green-600 transition hover:bg-green-600 hover:text-white">
              SIGN UP
            </Link>
            <Link to="/login" className="px-6 py-3 text-xl font-bold border-2 border-yellow-500 rounded-full bg-white text-green-600 transition hover:bg-green-600 hover:text-white">
              LOGIN
            </Link>
          </div>
        </div>
        
        {/* Right Side Image */}
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img src={Image} alt="Landing Illustration" className="w-full max-w-md rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default Landing;