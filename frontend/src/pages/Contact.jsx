import React from "react";

const Contact = () => {
  return (
    <div className="w-full flex flex-col md:flex-row bg-gray-100 p-5 rounded-lg">
      {/* Left Section */}
      <div className="md:w-1/2 bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 text-center underline">Contact Us</h2>
        <p className="text-lg text-gray-800 text-center mt-4">
          If you have any questions or need further information, feel free to contact us through the form below or reach us directly at:
        </p>
        <div className="mt-4 text-center">
          <p className="text-gray-700"><strong>Address:</strong> 26 Car Rental, Vadodara, Gujarat</p>
          <p className="text-gray-700"><strong>Phone:</strong> +91 7016773091</p>
          <p className="text-gray-700"><strong>Email:</strong> info@carrental.com</p>
        </div>
        <div className="text-center mt-5">
          <p className="text-lg font-semibold">Follow us on:</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 font-bold hover:underline">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 font-bold hover:underline">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 font-bold hover:underline">Instagram</a>
          </div>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="md:w-1/2 bg-white p-5 rounded-lg shadow-lg mt-5 md:mt-0 md:ml-5">
        <form className="flex flex-col items-center">
          <label className="w-full text-left font-bold text-gray-700">Name:
            <input type="text" name="name" required className="w-full p-2 mt-2 border-2 border-green-600 rounded-lg bg-gray-100 focus:border-yellow-500 focus:ring focus:ring-yellow-300" />
          </label>
          <label className="w-full text-left font-bold text-gray-700 mt-3">Email:
            <input type="email" name="email" required className="w-full p-2 mt-2 border-2 border-green-600 rounded-lg bg-gray-100 focus:border-yellow-500 focus:ring focus:ring-yellow-300" />
          </label>
          <label className="w-full text-left font-bold text-gray-700 mt-3">Message:
            <textarea name="message" required className="w-full p-2 mt-2 border-2 border-green-600 rounded-lg bg-gray-100 focus:border-yellow-500 focus:ring focus:ring-yellow-300"></textarea>
          </label>
          <button type="submit" className="mt-5 w-full p-3 bg-yellow-500 text-gray-800 font-bold rounded-lg hover:bg-green-600 hover:text-white transition">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;