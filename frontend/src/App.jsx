import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const LoadingPopup = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
    </div>
  </div>
);

const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const Coinguru = lazy(() => import("./pages/Coinguru"));
const Coiny = lazy(() => import("./pages/Coiny"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Doubt = lazy(() => import("./pages/Doubt"));
const Get = lazy(() => import("./pages/Get"));
const HomeLayout = lazy(() => import("./pages/HomeLayout"));
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Logout = lazy(() => import("./pages/Logout"));
const Register = lazy(() => import("./pages/Register"));
const Welcome = lazy(() => import("./pages/Welcome"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<LoadingPopup />}><HomeLayout /></Suspense>,
    children: [
      { index: true, element: <Suspense fallback={<LoadingPopup />}><Landing /></Suspense> },
      { path: "login", element: <Suspense fallback={<LoadingPopup />}><Login /></Suspense> },
      { path: "register", element: <Suspense fallback={<LoadingPopup />}><Register /></Suspense> },
      {
        element: <Suspense fallback={<LoadingPopup />}><ProtectedRoute /></Suspense>,
        children: [
          { path: "dashboard", element: <Suspense fallback={<LoadingPopup />}><Dashboard /></Suspense> },
          { path: "logout", element: <Suspense fallback={<LoadingPopup />}><Logout /></Suspense> },
          { path: "welcome", element: <Suspense fallback={<LoadingPopup />}><Welcome /></Suspense> },
          { path: "get", element: <Suspense fallback={<LoadingPopup />}><Get /></Suspense> },
          { path: "doubt", element: <Suspense fallback={<LoadingPopup />}><Doubt /></Suspense> },
          { path: "coiny", element: <Suspense fallback={<LoadingPopup />}><Coiny /></Suspense> },
          { path: "coinguru", element: <Suspense fallback={<LoadingPopup />}><Coinguru /></Suspense> }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
