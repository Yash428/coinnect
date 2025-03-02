import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
import Image from "../assets/image.png";
import c1 from "../assets/Container1.png";
import c2 from "../assets/Container2.png";
import c3 from "../assets/Container3.png";

function Welcome() {
  const navigate = useNavigate();

  return (
    <>
    <div className="app-container">
      <nav className="custom-navbar">
        <div className="custom-logo-container">
          <img src={Image} alt="Coinnect Logo" className="custom-logo-image" />
        </div>
        <div className="custom-welcome-container">
          <h1 className="custom-welcome-title">
            <span className="custom-green-text"> Welcome To Coinnect</span>
          </h1>
          <h2 className="custom-services-subtitle">Look at our services</h2>
        </div>
      </nav>

      {/* Service Cards Container */}
      <div className="custom-services-container">
        {/* CoinAxis Card */}
        <div className="custom-service-card" onClick={() => navigate("/doubt")}>
          <h3 className="custom-service-title">
            <span className="custom-green-text">CoinAxis</span> ("Navigating the
            <br />
            network of possibilities")
          </h3>
          <div className="custom-service-image-container">
            <img src={c1} alt="CoinAxis Network" className="custom-service-image" />
          </div>
        </div>

        {/* Coiny Card */}
        <div className="custom-service-card" onClick={() => navigate("/coiny")}>
          <h3 className="custom-service-title">
            <span className="custom-green-text">Coiny</span> ("Your Coin-
            <br />
            Savvy BOT")
          </h3>
          <div className="custom-service-image-container">
            <img src={c2} alt="Coiny Bot" className="custom-service-image" />
          </div>
        </div>

        {/* CoinGuru Card */}
        <div className="custom-service-card" onClick={() => navigate("/coinguru")}>
          <h3 className="custom-service-title">
            <span className="custom-green-text">CoinGuru</span>("Your Daily
            <br />
            News BOT")
          </h3>
          <div className="custom-service-image-container">
            <img src={c3} alt="CoinGuru AI" className="custom-service-image" />
          </div>
        </div>
      </div>
    </div>
    <button className="Log" onClick={() => { navigate("/")}}>Logout</button>
    </>
  );
}

export default Welcome;