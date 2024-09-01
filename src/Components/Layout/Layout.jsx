import React, { useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {




  return <>
    <Navbar />
    <div className="container w-[85%] md:pt-12 mt-5 font-sans">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
