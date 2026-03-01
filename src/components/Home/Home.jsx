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
   <div className='bg-white dark:bg-black dark:text-white min-h-screen'>
    <HeroSection/>
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 max-w-7xl mx-auto mt-8 px-4">
  
  <button
    onClick={navigateToAllCategories}
    className="
      p-3 rounded-full border border-gray-500
      flex items-center gap-2
      hover:bg-gray-100 dark:hover:text-black
      transition cursor-pointer
      w-fit
    "
  >
    See All Categories
    <IoIosArrowForward className="text-sm" />
  </button>

</div>
        
    <CategoriesComponent/>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 max-w-7xl mx-auto mt-8 px-4">
  
  <div>
    <h2 className="text-2xl font-semibold">
      Featured Products
    </h2>
    <p className="text-sm text-gray-600 mt-1">
      Effortless style, inspired by the future of fashion
    </p>
  </div>

  <button
    onClick={navigateToAllProducts}
    className="p-3 rounded-full border border-gray-500 flex items-center gap-2 
               hover:bg-gray-100 dark:hover:text-black 
               transition cursor-pointer w-fit"
  >
    See More  
    <IoIosArrowForward className="text-sm" />
  </button>

</div>
        
        
    <Products limit={8} showFilter={false} showBread={false} showPagination={false} showHeroSrip={false} showBottomBanner={false} showNumberOfProducts={false}/>
  
   </div>
  );
}

export default Home