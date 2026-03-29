import React from 'react'
import HeroSection from '../HeroSection/HeroSection';
import Products from '../Products/Products';
import{ IoIosArrowForward } from "react-icons/io"; 
import { useNavigate } from 'react-router-dom';
import CategoriesComponent from '../Categories/Categories';
import { useTranslation } from 'react-i18next';
import { FiChevronRight } from 'react-icons/fi';
import i18next from 'i18next';


const Home = () => {
   const navigate = useNavigate();
   const {t} = useTranslation();

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
       {i18next.language === "ar" ? (
  <>
    <FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
 {t("see all categories")} </>
) : (
  <>
 {t("see all categories")}   <FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
  </>
)}
    {/* {t("see all categories")}
    <IoIosArrowForward className="text-sm" /> */}
  </button>

</div>
        
    <CategoriesComponent/>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 max-w-7xl mx-auto mt-8 px-4">
  
  <div>
    <h2 className="text-2xl font-semibold">
    { t( "FeaturedProducts")}
    </h2>
    <p className="text-sm text-gray-600 mt-1">
     { t("Effortless style, inspired by the future of fashion")}
    </p>
  </div>

  <button
    onClick={navigateToAllProducts}
    className="p-3 rounded-full border border-gray-500 flex items-center gap-2 
               hover:bg-gray-100 dark:hover:text-black 
               transition cursor-pointer w-fit"
  >
       {i18next.language === "ar" ? (
  <>
    <FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
{ t("See More" )} </>
) : (
  <>
{ t("See More" )}   <FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
  </>
)}
  
  </button>

</div>
        
        
    <Products limit={8} showFilter={false} showBread={false} showPagination={false} showHeroSrip={false} showBottomBanner={false} showNumberOfProducts={false}/>
  
   </div>
  );
}

export default Home