import React, { useState } from "react";
import Image from "../assets/image.png";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <>
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary">Coinnect</h1>
        <div className="flex items-center space-x-4">
            <Link to={'/'} variant="ghost">Home</Link>
            {/* <Link to={'about'} variant="ghost">About</Link> */}
            <Link to={'/pricing'} variant="ghost">Pricing</Link>
            <Link to={'/faq'} variant="ghost">FAQs</Link>
            <Link to={'/get'} variant="ghost">Get In Touch</Link>
            <button
                className="rounded-full p-2"
                onClick={() => setDarkMode(!darkMode)}
            >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full mt-8 px-10 py-16 rounded-lg">
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

          {/* Sign Up and Login buttons */}
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