import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import beauty from "../../assets/beauty.png";
import fragrances from "../../assets/fragrances.png";
import furniture from "../../assets/furniture.png";
import groceries from "../../assets/groceries.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../Redux/Slices/CategoriesSlice";
import { useSnackbar } from "notistack";



const Categories = () => {
  const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    
  

  const navigateToAllProducts = () => {
    navigate("/products");
  };

  const {data,loading,error} = useSelector((state)=>state.category);
  console.log(data)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllCategories())
  },[]);
   useEffect(() => {
      if (error) {
        enqueueSnackbar(error, { variant: "error" });
      }
    }, [error]);
  
 

const categoryImages = [beauty, fragrances, furniture, groceries];




  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-6">      {loading && (
       
       <div className="flex justify-center items-center py-24 min-h-screen">
          <span className="loader"></span>
        </div>
      )}
  {data?.slice(0, 4).map((category, index) => (
  <div
  onClick={()=>navigate(`/category/${category.slug}`)}
    key={category.slug}
    className={
      index === 0
        ? "md:col-span-2 md:row-span-2 h-[500px] md:h-full min-h-[500px]"
        : index === 3
        ? "md:col-span-2 h-[400px] md:h-[245px] lg:h-auto"
        : "h-[400px] md:h-[245px] lg:h-auto"
    }
  >
    <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-full">
      
      {/* Image */}
      <div className="absolute inset-0 bg-gray-300">
        <img
          src={categoryImages[index]}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
        <p className="text-xs md:text-sm font-light mb-2 tracking-wide opacity-90">
          {index === 0 ? "Featured Collection" : "Collections"}
        </p>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-4 md:mb-6">
          {category.name} {/* ✅ هنا الحل */}
        </h3>

        <button className="flex items-center gap-2 px-6 py-2.5 border border-white/80 rounded-full w-fit text-sm font-light hover:bg-white hover:text-black transition-all duration-300">
          Explore Now
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
))}

</div>

    
  );
};

export default Categories;
