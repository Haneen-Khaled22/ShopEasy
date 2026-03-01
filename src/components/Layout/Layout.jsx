import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import Footer from '../Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

const Layout = () => {
  return (
    <>
    <Navbar/>
  
  <ScrollToTop/>
  <div className='dark:bg-black dark:text-white'>
     <Outlet/>

  </div>
   

 
      

 
    
    <Footer/>
    </>
  )
}

export default Layout