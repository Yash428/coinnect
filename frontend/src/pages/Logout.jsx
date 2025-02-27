import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { persistedStore } from "../store/store";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8002/api/v1/logout', {}, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      
      toast.success("Logged out successfully");
      localStorage.removeItem("accessToken");
      dispatch(logout());
      await persistedStore.purge(); // Ensure purge is awaited
      navigate('/');
      console.log("Logged out");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-3xl">
      <h1 className="font-bold">Logout</h1>
      <button 
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
