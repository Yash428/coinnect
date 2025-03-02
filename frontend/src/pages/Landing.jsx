import React from "react";
import Image from "../assets/image.png";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="home-navbar-container">
          <ul className="home-navbar-menu">
            <li>
              <Link to="/about" className="home-navbar-link">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to="/price" className="home-navbar-link">
                PRICE
              </Link>
            </li>
            <li>
              <Link to="/get" className="home-navbar-link">
                GET IN TOUCH
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="home-hero-section">
        <div className="home-hero-content">
          <h1>
            <label className="home-coin">Coin</label>
            <label className="home-nect">nect</label>
          </h1>
          <h3>
            <label className="home-link">Link it, </label>
            <label className="home-it">Coin it, </label>
            <label className="home-own">Own it.</label>
          </h3>

          {/* Sign Up and Login Buttons */}
          <div className="home-button-container">
            <Link to="/register" className="home-auth-button home-signup">SIGN UP</Link>
            <Link to="/login" className="home-auth-button home-login">LOGIN</Link>
          </div>
        </div>
        
        {/* Right Side Image */}
        <div className="home-hero-image">
          <img src={Image} alt="Landing Illustration" />
        </div>
      </div>
    </>
  );
};

export default Home;