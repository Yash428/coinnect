import React from "react";

const Pricing = () => {
  return (
    <div className="bg-[#F5F5F5] text-[#333333] min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-[#28A745]">Coin Cravers Pricing</h1>
      <p className="text-lg text-gray-600 mb-6">Choose a plan that fits your needs.</p>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {/* Basic Plan */}
        <div className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-300 w-80">
          <h2 className="text-2xl font-semibold text-[#28A745]">Basic</h2>
          <p className="text-3xl font-bold my-4">$9.99/mo</p>
          <ul className="text-gray-600 mb-4">
            <li>✔️ 10 Coin Trades</li>
            <li>✔️ Basic Analytics</li>
            <li>✔️ Email Support</li>
          </ul>
          <button className="bg-[#28A745] text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600">
            Choose Plan
          </button>
        </div>

        {/* Standard Plan */}
        <div className="bg-white p-6 rounded-lg text-center shadow-lg border-2 border-[#FFD700] w-80">
          <h2 className="text-2xl font-semibold text-[#28A745]">Standard</h2>
          <p className="text-3xl font-bold my-4">$19.99/mo</p>
          <ul className="text-gray-600 mb-4">
            <li>✔️ 50 Coin Trades</li>
            <li>✔️ Advanced Analytics</li>
            <li>✔️ Priority Email Support</li>
          </ul>
          <button className="bg-[#FFD700] text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500">
            Choose Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-300 w-80">
          <h2 className="text-2xl font-semibold text-[#28A745]">Premium</h2>
          <p className="text-3xl font-bold my-4">$29.99/mo</p>
          <ul className="text-gray-600 mb-4">
            <li>✔️ Unlimited Coin Trades</li>
            <li>✔️ Premium Analytics</li>
            <li>✔️ 24/7 Support</li>
          </ul>
          <button className="bg-[#28A745] text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
