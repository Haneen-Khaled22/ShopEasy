import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import Footer from '../Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

const Layout = () => {
  return (
    <>
   
  <div className='dark:bg-black dark:text-white'>
     <Navbar/>
  
  <ScrollToTop/>
     <Outlet/>

  </div>
   

 
      

 
    
    <Footer/>
    </>
  )
}

export default Layout