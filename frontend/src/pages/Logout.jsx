import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-3xl">
      <h1 className="font-bold">Logout Successful!</h1>
      <p className="text-lg mt-2">You will be redirected to the landing page in 3 seconds...</p>
    </div>
  );
};

export default Logout;