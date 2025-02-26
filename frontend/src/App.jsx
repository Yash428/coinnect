// import './App.css'
// import { GoogleLogin } from '@react-oauth/google';


// function App() {
//   return (
//     <>
//       <div className='text-5xl text-center bg-green-400 '>Coinnect</div>
//       <GoogleLogin onSuccess={credentialResponse => {
//         console.log(credentialResponse);
//       }}
//       onError={() => {
//         console.log('Login Failed');
//       }}
// />
//     </>
//   )
// }

// export default App

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from "react";

// Lazy load pages for better performance
const HomeLayout = lazy(() => import("./pages/HomeLayout"));
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Logout = lazy(() => import("./pages/Logout"));
const Contact = lazy(() => import("./pages/Contact"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<div>Loading...</div>}><HomeLayout /></Suspense>,
    children: [
      { index: true, element: <Suspense fallback={<div>Loading...</div>}><Landing /></Suspense> },
      { path: "login", element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
      { path: "register", element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense> },
      { path: "dashboard", element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense> },
      { path: "logout", element: <Suspense fallback={<div>Loading...</div>}><Logout /></Suspense> },
      {path: "contact", element: <Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>}
    ],
  },
]);

console.log(import.meta.env.VITE_GOOGLE_API);


function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
