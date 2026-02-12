import React, { useEffect, useRef, useState } from "react";
import background from "../../assets/catbackground.png";
import { HiArrowUpRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../Redux/Slices/CategoriesSlice";
import beauty from "../../assets/beauty.png";
import fragrances from "../../assets/fragrances.png";
import furniture from "../../assets/furniture.png";
import groceries from "../../assets/groceries.png";

import homeDecoration from "../../assets/home decoration.png";
import kitchenAccessories from "../../assets/kitchen decoration.png";
import laptops from "../../assets/laptops.png";
import mensShirts from "../../assets/mens shirts.png";

import mensShoes from "../../assets/mens shoes.png";
import mensWatches from "../../assets/mens watches.png";
import mobileAccessories from "../../assets/mobile accessories.png";
import motorcycle from "../../assets/motorcycle.png";

import skinCare from "../../assets/skincare.png";
import smartphones from "../../assets/smartphones.png";
import sportsAccessories from "../../assets/sports accessories.png";
import sunglasses from "../../assets/sunglasses.png";

import tablets from "../../assets/tablets.png";
import tops from "../../assets/tops.png";
import vehicle from "../../assets/vechiles.png";
import womensBags from "../../assets/womens bags.png";

import womensDresses from "../../assets/womens dresses.png";
import womensJewellery from "../../assets/womens jewellery.png";
import womensShoes from "../../assets/womens shoes.png";
import womensWatches from "../../assets/womens watches.png";
import CategoryDetails from "../CategoryProducts/CategoryProducts";
import { useNavigate } from "react-router-dom";
import CategoryProducts from "../CategoryProducts/CategoryProducts";
import { getCategoryProducts } from "../../Redux/Slices/CategoryProducts";
import Products from "../Products/Products";

const CategorySections = () => {
  const categories = useSelector((state) => state.category);
  console.log(categories);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // <-- state جديد


  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovering && scrollContainer) {
          scrollContainer.scrollLeft += 1;

          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 20);
    };

    startAutoScroll();

    return () => clearInterval(scrollInterval);
  }, [isHovering]);

  const categoryImages = [
    beauty,
    fragrances,
    furniture,
    groceries,

    homeDecoration,
    kitchenAccessories,
    laptops,
    mensShirts,

    mensShoes,
    mensWatches,
    mobileAccessories,
    motorcycle,

  skinCare,
smartphones,
sportsAccessories,
sunglasses,
tablets,

tops,
vehicle,
womensBags,
womensDresses,
womensJewellery,
womensShoes,
womensWatches
  ];

  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat.slug); // <-- نخزن الـ slug
    dispatch(getCategoryProducts(cat.slug)); // جلب المنتجات
    // Scroll تلقائي للـ products
    const el = document.getElementById("category-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* breadcrumb */}
      {/* <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
      </div> */}
      {/* hero img */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Background Image with Ken Burns effect */}
        <motion.img
          src={background}
          alt="category background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Content */}
        <div className="absolute bottom-1/6 left-12 text-white max-w-xl">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-3 leading-[1.4]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Where Timeless Beauty
            <br />
            Meets Modern Craft
          </motion.h1>

          <motion.p
            className="text-sm md:text-base text-gray-200 mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Discover the latest trends and exclusive styles just for you
          </motion.p>

          <motion.button
            className="group cursor-pointer px-6 py-3 bg-white text-black font-semibold flex items-center gap-2 hover:bg-black hover:text-white transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={()=>navigate(`/products`)}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Collection
            <HiArrowUpRight className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>
      {/* shop by category */}
      <div className="max-w-7xl mx-auto mt-20  overflow-hidden">
        <h1 className="text-2xl font-semibold mb-8">Shop By Category</h1>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ scrollBehavior: 'auto' }}
        >
          {[...categories, ...categories].map((cat, index) => (
            <div key={index}
            onClick={() => handleCategoryClick(cat)}
            className="min-w-[200px] flex-shrink-0 text-center group cursor-pointer">
  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
    <img
      src={categoryImages[index % categoryImages.length]}
      alt={cat.slug}
      className="w-[220px] h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/30"></div>
    
    {/* Category Name */}
    <h2 className="absolute top-1/8 inset-0 flex items-center justify-center text-white text-2xl font-normal capitalize px-4">
      {cat.slug}
    </h2>
  </div>
</div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* category products */}
      {/* Category Products يظهر فقط لو اختارت كاتيجوري */}
      {selectedCategory ?(
        <div id="category-products" className="mt-12">
          
          <CategoryProducts slug={selectedCategory} />
        </div>
      )
      :
      <Products limit={12} showFilter={false} showBread={false}/>}

    


    </div>
  );
};

export default CategorySections;