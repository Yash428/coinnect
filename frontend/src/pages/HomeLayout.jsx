import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Image from "../assets/image.png";



const HomeLayout = () => {
  return (
   <>
   <Outlet></Outlet>
   </>
  )
}

export default HomeLayout