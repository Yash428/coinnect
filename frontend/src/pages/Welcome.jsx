import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/image.png";
import c1 from "../assets/Container1.png";
import c2 from "../assets/Container2.png";
import c3 from "../assets/Container3.png";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto p-5">
      <nav className="flex justify-between items-center mb-14">
        <img src={Image} alt="Coinnect Logo" className="w-28 h-28" />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600">Welcome Mr. Dev</h1>
          <h2 className="text-2xl text-yellow-500">Look at our services</h2>
        </div>
      </nav>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {[ 
          { title: "CoinAxis", desc: "Navigating the network of possibilities", img: c1, path: "/doubt" },
          { title: "Coiny", desc: "Your Coin-Savvy BOT", img: c2, path: "/coiny" },
          { title: "CoinGuru", desc: "Your Daily News BOT", img: c3, path: "/coinguru" }
        ].map((service, index) => (
          <div key={index} onClick={() => navigate(service.path)} className="max-w-md bg-white border-4 border-yellow-500 rounded-xl p-6 flex flex-col items-center shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <h3 className="text-center text-xl font-bold text-gray-800 mb-4">
              <span className="text-green-600">{service.title}</span> ("{service.desc}")
            </h3>
            <img src={service.img} alt={service.title} className="w-32 h-32 transition-transform transform hover:scale-110" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Welcome;
