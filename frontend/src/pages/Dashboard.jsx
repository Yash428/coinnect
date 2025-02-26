import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  // const fetchLuckyNumber = async () => {
  //   let axiosConfig = {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   };

  //   // try {
  //   //   const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
  //   //   setData({ msg: response.data.msg, luckyNumber: response.data.secret });
  //   // } catch (error) {
  //   //   toast.error(error.message);
  //   // }
  // };

  // useEffect(() => {
  //   //fetchLuckyNumber();
  //   if (token === "") {
  //     navigate("/login");
  //     toast.warn("Please login first to access dashboard");
  //   }
  // }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-center p-4">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      {/* <p className="text-lg mt-4">Hi {data.msg}! {data.luckyNumber}</p> */}
      <Link 
        to="/logout" 
        className="mt-6 px-6 py-3 text-lg font-semibold bg-black text-white rounded-full border-2 border-black transition duration-300 hover:bg-white hover:text-black"
      >
        Logout
      </Link>
    </div>
  );
};

export default Dashboard;
