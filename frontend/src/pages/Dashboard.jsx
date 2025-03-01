import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useSelector} from 'react-redux'

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const user = useSelector(state=>state.auth.data)
  console.log(user);
  

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
