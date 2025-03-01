import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Image from "../assets/image.png";
import { Sun, Moon } from "lucide-react";
function Get() {
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

      <div className="flex flex-col md:flex-row mt-24 mb-5 px-6">
        <div className="w-full md:w-1/2 p-5">
          <h2 className="text-green-600 text-3xl font-bold text-center">Get In Touch</h2>
          <p className="text-lg mt-4 text-center">
            If you have any questions or need further information, feel free to
            contact us through the form below or reach us directly at:
          </p>
          <div className="mt-6 text-lg text-center">
            <p><strong>Address:</strong> CHARUSAT Campus, 139, Highway, off Nadiad, Gujarat</p>
            <p><strong>Phone:</strong> +91 7016773091</p>
            <p><strong>Email:</strong> coinnect0902@gmail.com</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-5">
          <label className="block text-lg">Name:</label>
          <input type="text" className="w-full p-2 border-2 border-green-600 rounded-md mt-2" required />
          <label className="block text-lg mt-4">Email:</label>
          <input type="email" className="w-full p-2 border-2 border-green-600 rounded-md mt-2" />
          <label className="block text-lg mt-4">Message:</label>
          <textarea className="w-full p-2 border-2 border-green-600 rounded-md mt-2"></textarea>
          <button type="submit" className="w-full bg-yellow-500 text-black py-3 rounded-full font-semibold text-lg mt-4 hover:bg-white hover:border-2 hover:border-yellow-500 hover:text-black transition-all">
            Submit
          </button>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-2xl text-green-600">Follow <span className="text-yellow-500">us on</span></p>
        <div className="flex justify-center gap-6 mt-4 text-lg font-semibold">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-green-600 underline hover:text-yellow-500">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-green-600 underline hover:text-yellow-500">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-green-600 underline hover:text-yellow-500">Instagram</a>
        </div>
      </div>
    </>
  );
}

export default Get;
