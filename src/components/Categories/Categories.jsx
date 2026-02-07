import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  
  const getAllCategories = async () => {
    const { data } = await axios.get('https://api.escuelajs.co/api/v1/categories');
    console.log(data);
    setCategories(data)
  }
  
  useEffect(() => {
    getAllCategories();
  }, [])
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Header with See All Button */}
      <div className="flex justify-end mb-6">
                  <button  className='p-3 rounded-full border border-gray-500 flex items-center gap-2 hover:bg-gray-100 transition cursor-pointer'>See All Categories <IoIosArrowForward className="text-sm" /></button>
        
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Large Card - First Item */}
        {categories[0] && (
          <div className="md:col-span-2 md:row-span-2 h-[500px] md:h-full min-h-[500px]">
            <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-full">
              {/* Image Background */}
              <div className="absolute inset-0 bg-gray-300">
                <img
                  src={categories[0].image}
                  alt={categories[0].name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                <p className="text-xs md:text-sm font-light mb-2 tracking-wide opacity-90">
                  Featured Collection
                </p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-4 md:mb-6">
                  {categories[0].name}
                </h3>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-white/80 rounded-full w-fit text-sm font-light hover:bg-white hover:text-black transition-all duration-300">
                  Explore Now
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Right Card */}
        {categories[1] && (
          <div className="h-[400px] md:h-[245px] lg:h-auto">
            <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-full">
              {/* Image Background */}
              <div className="absolute inset-0 bg-gray-300">
                <img
                  src={categories[1].image}
                  alt={categories[1].name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                <p className="text-xs md:text-sm font-light mb-2 tracking-wide opacity-90">
                  Collections
                </p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-4 md:mb-6">
                  {categories[1].name}
                </h3>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-white/80 rounded-full w-fit text-sm font-light hover:bg-white hover:text-black transition-all duration-300">
                  Explore Now
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Right Second Card */}
        {categories[2] && (
          <div className="h-[400px] md:h-[245px] lg:h-auto">
            <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-full">
              {/* Image Background */}
              <div className="absolute inset-0 bg-gray-300">
                <img
                  src={categories[2].image}
                  alt={categories[2].name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                <p className="text-xs md:text-sm font-light mb-2 tracking-wide opacity-90">
                  Collections
                </p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-4 md:mb-6">
                  {categories[2].name}
                </h3>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-white/80 rounded-full w-fit text-sm font-light hover:bg-white hover:text-black transition-all duration-300">
                  Explore Now
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Right Card */}
        {categories[3] && (
          <div className="md:col-span-2 h-[400px] md:h-[245px] lg:h-auto">
            <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-full">
              {/* Image Background */}
              <div className="absolute inset-0 bg-gray-300">
                <img
                  src={categories[3].image}
                  alt={categories[3].name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                <p className="text-xs md:text-sm font-light mb-2 tracking-wide opacity-90">
                  Collections
                </p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-4 md:mb-6">
                  {categories[3].name}
                </h3>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-white/80 rounded-full w-fit text-sm font-light hover:bg-white hover:text-black transition-all duration-300">
                  Explore Now
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories