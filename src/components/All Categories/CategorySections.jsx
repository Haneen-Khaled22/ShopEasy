import React, { useEffect, useRef, useState } from "react";
import background from "../../assets/catbackground.png";
import { HiArrowUpRight } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
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
import CategoryProducts from "../CategoryProducts/CategoryProducts";
import { useNavigate } from "react-router-dom";
import { getCategoryProducts } from "../../Redux/Slices/CategoryProducts";
import Products from "../Products/Products";

const categoryImages = [
  beauty, fragrances, furniture, groceries,
  homeDecoration, kitchenAccessories, laptops, mensShirts,
  mensShoes, mensWatches, mobileAccessories, motorcycle,
  skinCare, smartphones, sportsAccessories, sunglasses,
  tablets, tops, vehicle, womensBags,
  womensDresses, womensJewellery, womensShoes, womensWatches,
];

const features = [
  { icon: "✦", title: "Free Shipping", desc: "On all orders over $50" },
  { icon: "◈", title: "Easy Returns", desc: "30-day return policy" },
  { icon: "⬡", title: "Secure Payment", desc: "100% protected checkout" },
  { icon: "◎", title: "24/7 Support", desc: "Always here to help" },
];

const CategorySections = () => {
  const {data,loading,error} = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const navigate = useNavigate();

  useEffect(() => { dispatch(getAllCategories()); }, []);

  // Auto-scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const interval = setInterval(() => {
      if (!isHovering && !isDragging && scrollContainer) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isHovering, isDragging]);

  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat.slug);
    dispatch(getCategoryProducts(cat.slug));
    setTimeout(() => {
      const el = document.getElementById("category-products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };
 useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error]);
  return (
    <div className=" min-h-screen">
        {loading && (
       
       <div className="flex justify-center items-center py-24 min-h-screen">
          <span className="loader"></span>
        </div>
      )}

      {/* ══ HERO ══ */}
      <div className="relative w-full h-[680px] overflow-hidden">
        <motion.img
          src={background}
          alt="category background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Decorative lines */}
        <div className="absolute top-12 left-12 w-16 h-px bg-white/40" />
        <div className="absolute top-12 left-12 w-px h-16 bg-white/40" />
        <div className="absolute bottom-12 right-12 w-16 h-px bg-white/40" />
        <div className="absolute bottom-12 right-12 w-px h-16 bg-white/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 max-w-3xl">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="w-8 h-px bg-amber-400" />
            <span className="text-xs uppercase tracking-[0.35em] text-amber-400 font-medium">
              New Collection 2025
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.15] mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          >
            Where Timeless
            <br />
            <span className="italic text-amber-200">Beauty</span> Meets
            <br />
            <span className="font-normal">Modern Craft</span>
          </motion.h1>

          <motion.p
            className="text-base text-gray-300 mb-8 font-light leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Discover the latest trends and exclusive styles curated just for you — from beauty to furniture.
          </motion.p>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <button
              onClick={() => navigate("/products")}
              className=" cursor-pointer group px-8 py-3.5 bg-white text-black text-sm font-medium flex items-center gap-2 hover:bg-amber-500 hover:text-white transition-all duration-300 rounded-full"
            >
              Explore Collection
              <HiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollRef.current?.scrollIntoView({ behavior: "smooth" })}
              className=" cursor-pointer px-8 py-3.5 border border-white/40 text-white text-sm font-light hover:border-white/80 transition-all duration-300 rounded-full"
            >
              Browse Categories
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
          <motion.div
            className="w-px h-8 bg-white/30"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* ══ FEATURE STRIP ══ */}
      <div className="bg-[#1a1410] py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4 px-8 py-2">
              <span className="text-amber-400 text-xl">{f.icon}</span>
              <div>
                <p className="text-white text-sm font-medium">{f.title}</p>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SHOP BY CATEGORY ══ */}
       
      <div className="max-w-7xl mx-auto mt-20 px-4">
        {/* Section heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-amber-600" />
              <p className="text-xs uppercase tracking-[0.3em] text-amber-600 font-medium">Discover</p>
            </div>
            <h2
              className="text-3xl md:text-4xl font-light text-[#1a1a1a] dark:text-white"
            >
              Shop By <span className="italic text-[#6b5744] ">Category</span>
            </h2>
          </div>
          <p className="hidden md:block text-sm text-gray-400 font-light">
            {data?.length} categories available
          </p>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto select-none pb-4"
          onWheel={handleWheel}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); setIsDragging(false); }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            scrollBehavior: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {[...data, ...data].map((cat, index) => (
            <motion.div
              key={index}
              onClick={() => handleCategoryClick(cat)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className={`min-w-[180px] flex-shrink-0 cursor-pointer group rounded-2xl overflow-hidden relative
                ${selectedCategory === cat.slug ? "ring-2 ring-amber-500 ring-offset-2" : ""}
              `}
            >
              <div className="relative w-full h-[240px] overflow-hidden ">
                <img
                  src={categoryImages[index % categoryImages.length]}
                  alt={cat.slug}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  draggable="false"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Active indicator */}
                {selectedCategory === cat.slug && (
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
                )}

                {/* Name */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-white text-sm font-light capitalize tracking-wide leading-snug">
                    {cat.slug.replace(/-/g, " ")}
                  </h2>
                  <div className="w-0 group-hover:w-full h-px bg-amber-400/70 transition-all duration-400 mt-1.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Drag hint */}
        <p className="text-center text-xs text-gray-400 mt-4 tracking-widest uppercase">
          ← drag or scroll to explore →
        </p>
      </div>

      {/* ══ SELECTED CATEGORY LABEL ══ */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            className="max-w-7xl mx-auto px-4 mt-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between pb-5 border-b border-[#e8e2d9]">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">Browsing</p>
                  <h3
                    className="text-2xl font-light text-[#1a1a1a] capitalize"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {selectedCategory.replace(/-/g, " ")}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-gray-400 hover:text-[#6b5744] flex items-center gap-1.5 transition-colors border border-gray-200 hover:border-[#c8b89e] px-4 py-2 rounded-full"
              >
                ✕ Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ PRODUCTS SECTION ══ */}
      
      <div id="category-products" className="mt-10">
        {selectedCategory ? (
          <CategoryProducts slug={selectedCategory} />
        ) : (<div className="max-w-7xl mx-auto px-4 mt-14">
             <h3
              className="text-3xl md:text-4xl font-light text-[#1a1a1a] dark:text-white"
            >
             <span> Featured Products</span>
            </h3>
            
          <Products limit={3} showFilter={false} showBread={false} showPagination={false} showBottomBanner={false} showNumberOfProducts={false} showHeroSrip={false}/>
        </div>
         
        )}
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default CategorySections;
