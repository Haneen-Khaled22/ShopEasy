import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <>
    <Navbar/>
  
  
    <Outlet/>

 
      

 
    
    <Footer/>
    </>
  )
}

export default Layout