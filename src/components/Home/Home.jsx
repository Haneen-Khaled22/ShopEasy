import React from 'react'
import HeroSection from '../HeroSection/HeroSection';
import Products from '../Products/Products';
import{ IoIosArrowForward } from "react-icons/io"; 
import { useNavigate } from 'react-router-dom';
import CategoriesComponent from '../Categories/Categories';


const Home = () => {
   const navigate = useNavigate();

   const navigateToAllProducts =()=>{
    navigate('/products')
   }

      const navigateToAllCategories =()=>{
    navigate('/categories')
   }
    

  return (
   <div >
    <HeroSection/>
      <div className='flex items-center justify-between mb-4 max-w-7xl mx-auto mt-8'>
          <div>
           
    
          </div>
          <button onClick={navigateToAllCategories} className='p-3 rounded-full border border-gray-500 flex items-center gap-2 hover:bg-gray-100 transition cursor-pointer'>See All Categories  <IoIosArrowForward className="text-sm" /></button>
    
        </div>
        
    <CategoriesComponent/>
     <div className='flex items-center justify-between mb-4 max-w-7xl mx-auto mt-8'>
          <div>
            <h2 className='text-2xl font-semibold'>Featured Products</h2>
            <p className='text-sm text-gray-600 mt-1'>Effortless style,inspired by the future of fashion</p>
    
          </div>
          <button onClick={navigateToAllProducts} className='p-3 rounded-full border border-gray-500 flex items-center gap-2 hover:bg-gray-100 transition cursor-pointer'>See More  <IoIosArrowForward className="text-sm" /></button>
    
        </div>
        
        
    <Products limit={8} showFilter={false} showBread={false}/>
  
   </div>
  );
}

export default Home