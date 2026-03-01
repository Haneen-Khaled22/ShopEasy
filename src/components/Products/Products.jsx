import React, { useEffect, useState } from "react";
import Breadcrumb from "../BreadCrumb/BreadCrumb";
import FilterBar from "../FilterBar/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/Slices/ProductsSlice";
import { FiCheck, FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "../../Redux/Slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSnackbar } from "notistack";
import { addToWishList, deleteFromWishList } from "../../Redux/Slices/WishListSlice";
import { FaHeart } from "react-icons/fa";

const Products = ({
  limit,
  showFilter = true,
  showBread = true,
  showPagination = true,
  showHeroSrip = true,
  showBottomBanner = true,
  showNumberOfProducts = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: "",
    sort: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const { data, loading, error } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
    const wishlist = useSelector((state) => state.wishList);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error]);

 
  let filteredProducts = [...data];
  if (filters.category)
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === filters.category.toLowerCase(),
    );
  if (filters.brand)
    filteredProducts = filteredProducts.filter(
      (p) => p.brand?.toLowerCase() === filters.brand.toLowerCase(),
    );
  if (filters.price === "low")
    filteredProducts.sort((a, b) => a.price - b.price);
  if (filters.price === "high")
    filteredProducts.sort((a, b) => b.price - a.price);
  if (filters.sort === "newest") filteredProducts.sort((a, b) => b.id - a.id);
  if (filters.sort === "rating")
    filteredProducts.sort((a, b) => b.rating - a.rating);
  if (filters.sort === "discount")
    filteredProducts.sort(
      (a, b) => b.discountPercentage - a.discountPercentage,
    );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const getPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      if (currentPage < totalPages - 1) pages.push(totalPages);
    }
    return pages;
  };

  const brands = [...new Set(data.map((p) => p.brand).filter(Boolean))];
  const categories = [...new Set(data.map((p) => p.category).filter(Boolean))];

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div >
       {loading && (
       
       <div className="flex justify-center items-center py-24 min-h-screen">
          <span className="loader"></span>
        </div>
      )}
      {/* ══ PAGE HEADER ══ */}
      {showBread && (
        <div className="border-b border-[#ede8e0] dark:border-black">
          <div className="max-w-7xl mx-auto px-4 ">
            <Breadcrumb />
          </div>
        </div>
      )}

      {/* ══ HERO STRIP ══ */}
      {showHeroSrip && (
        <div
          className="w-full py-16 px-4 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1a1410 0%, #3d2b1f 50%, #6b4c36 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -80,
              left: -40,
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-amber-400" />
                  <span className="text-xs uppercase tracking-[0.35em] text-amber-400 font-medium">
                    ShopEasy Store
                  </span>
                </div>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  All <span className="italic text-amber-200">Products</span>
                </h1>
                <p className="text-gray-400 text-sm mt-3 font-light">
                  {filteredProducts.length} products
                  {hasActiveFilters && (
                    <span className="text-amber-400 ml-1">· filtered</span>
                  )}
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex gap-6 md:gap-10">
                {[
                  { n: data.length, label: "Total Items" },
                  { n: categories.length, label: "Categories" },
                  { n: brands.length, label: "Brands" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p
                      className="text-2xl font-light text-white"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {s.n}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ FILTER BAR ══ */}
      {showFilter && (
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-black backdrop-blur-md border-b border-[#ede8e0] dark:border-black ">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
            <FilterBar
              filters={filters}
              handleChange={handleFilterChange}
              brands={brands}
              categories={categories}
            />
            {hasActiveFilters && (
              <button
                onClick={() =>
                  setFilters({ category: "", brand: "", price: "", sort: "" })
                }
                className=" cursor-pointer text-xs text-[#6b5744] dark:text-gray-300 border border-[#c8b89e] dark:border-gray-300 hover:bg-[#6b5744] hover:text-white transition-all duration-300 px-4 py-2 rounded-full whitespace-nowrap ml-auto"
              >
                ✕ Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* ══ PRODUCTS GRID ══ */}
    
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Result count */}
          {showNumberOfProducts && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="text-[#1a1a1a] dark:text-gray-400 font-medium">
                  {startIndex + 1}–
                  {Math.min(
                    startIndex + productsPerPage,
                    filteredProducts.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="text-[#1a1a1a] dark:text-gray-400  font-medium">
                  {filteredProducts.length}
                </span>{" "}
                results
              </p>
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters)
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <span
                        key={k}
                        className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full capitalize"
                      >
                        {k}: {v}
                      </span>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Grid */}
          <AnimatePresence mode="wait">
            {displayedProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-5xl mb-4">◎</p>
                <p
                  className="text-xl font-light text-gray-400"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  No products found
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Try adjusting your filters
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={currentPage + JSON.stringify(filters)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12"
              >
                {displayedProducts.map((product, index) => {
                  const cartItem = cart.find((item) => item.id === product.id);
                  const isInCart = !!cartItem;
                  const favItem = wishlist.find((item) => item.id === product.id)
                  const isInFav = !!favItem;
                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      className="cursor-pointer   p-4 transition-all duration-200 group  "
                      // style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                          className=" w-full rounded-2xl h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isInCart) dispatch(addToCart(product));
                            enqueueSnackbar(`${product.title} added to Cart`, {
                              variant: "default",
                              sx: {
                                backgroundColor: "#776a5d", // لون الخلفية
                                color: "#fff", // لون النص
                                fontWeight: "bold",
                              },
                              anchorOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              autoHideDuration: 2500,
                            });
                          }}
                          className="absolute top-2 right-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
                        >
                          {isInCart ? (
                            <FiCheck
                            onClick={()=>{
                              dispatch(deleteFromCart(product.id)),
                              enqueueSnackbar(`${product.title} deleted from Cart`, {
                              variant: "default",
                              sx: {
                                backgroundColor: "#776a5d", // لون الخلفية
                                color: "#fff", // لون النص
                                fontWeight: "bold",
                              },
                              anchorOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              autoHideDuration: 2500,
                            });
                            }}
                            className="text-white bg-green-700 rounded-full w-7 h-7 p-1.5 shadow-lg stroke-[2.5]" />
                          ) : (
                            <FiPlus className="text-white bg-[#776a5d] rounded-full w-7 h-7 p-1.5 shadow-lg stroke-[2.5]" />
                          )}
                        </div>
                        <div className="absolute bottom-0 left-0 px-3 bg-white/30 dark:bg-white/30 rounded-2xl py-1 text-xs font-medium text-gray-600 dark:text-white">
                          {product.availabilityStatus} • {product.stock} left
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {Array(Math.round(product.rating))
                          .fill()
                          .map((_, i) => (
                            <span key={i} className="text-amber-400">
                              ⭐
                            </span>
                          ))}
                        <span className="text-sm text-gray-500 dark:text-gray-300 ml-1">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Title , fav*/}
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2 line-clamp-2 h-14">
                        {product.title}
                      </h2>
                       {isInFav ? (
  <FaHeart
    onClick={(e) => {
      e.stopPropagation();
      dispatch(deleteFromWishList(product.id));
      enqueueSnackbar(`${product.title} deleted from Wishlist`, {
        variant: "default",
      });
    }}
    className="cursor-pointer text-red-600 hover:text-red-700 
               transition-all duration-200 
               transform hover:scale-110 active:scale-95"
  />
) : (
  <FiHeart
    onClick={(e) => {
      e.stopPropagation();
      dispatch(addToWishList(product));
      enqueueSnackbar(`${product.title} added to Wishlist`, {
        variant: "default",
      });
    }}
    className="cursor-pointer text-gray-400 
               hover:text-red-500 
               transition-all duration-200 
               transform hover:scale-110 active:scale-95"
  />
)}
                        
                      </div>
                      
                      {/* quantity */}
                      {isInCart && (
                        <div className="mb-2">
                          <button
                            onClick={(e) => {
                              (e.stopPropagation(),
                                dispatch(decreaseQuantity(product.id)));
                            }}
                            // disabled={!cartItem || quantity <= 1}
                            className="cursor-pointer p-1 border border-gray-100 rounded hover:bg-gray-100 dark:hover:text-black disabled:opacity-50 "
                          >
                            <FiMinus />
                          </button>

                          <span className="px-2 font-normal">
                            {cartItem?.quantity}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(increaseQuantity(product.id));
                            }}
                            className="p-1 border border-gray-100 rounded hover:bg-gray-100 dark:hover:text-black cursor-pointer"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-semibold text-[#776a5d] dark:text-[#bd9e7d]">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300 ">
                          {product.discountPercentage}% off
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══ PAGINATION ══ */}
          {showPagination && totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center gap-4">
              {/* Progress bar */}
              <div className="w-full max-w-xs h-px bg-[#ede8e0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6b5744] rounded-full transition-all duration-500"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 tracking-widest uppercase">
                Page {currentPage} of {totalPages}
              </p>

              {/* Page buttons */}
              <div className="flex items-center gap-2">
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ede8e0] text-gray-500 hover:border-[#6b5744] hover:text-[#6b5744] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm"
                >
                  ‹
                </button>

                {getPagination().map((page, index) =>
                  page === "..." ? (
                    <span
                      key={index}
                      className="w-8 text-center text-gray-400 text-sm"
                    >
                      ···
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full text-sm font-light transition-all duration-200
                      ${
                        currentPage === page
                          ? "bg-[#3d2b1f] text-white shadow-md shadow-[#3d2b1f]/30"
                          : "bg-white text-gray-600 border border-[#ede8e0] hover:border-[#6b5744] hover:text-[#6b5744]"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ede8e0] text-gray-500 dark:text-gray-300 hover:border-[#6b5744] hover:text-[#6b5744] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm"
                >
                  ›
                </button>
              </div>

              {/* Jump to page */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400 ">Go to page</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  defaultValue={currentPage}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= totalPages) setCurrentPage(val);
                    }
                  }}
                  className="w-12 text-center text-sm border border-[#ede8e0] rounded-lg py-1 outline-none focus:border-[#6b5744] text-gray-600 dark:text-gray-300"
                />
              </div>
            </div>
          )}
        </div>
   

      {/* ══ BOTTOM BANNER ══ */}
      {showBottomBanner && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div
            className="rounded-3xl px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              background:
                "linear-gradient(135deg, #1a1410 0%, #3d2b1f 60%, #6b4c36 100%)",
            }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">
                Limited time
              </p>
              <h3
                className="text-3xl md:text-4xl font-light text-white leading-snug"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Get <span className="italic text-amber-200">20% off</span>
                <br />
                your first order
              </h3>
              <p className="text-gray-400 text-sm mt-3 font-light">
                Use code{" "}
                <span className="text-amber-300 font-medium tracking-wider">
                  WELCOME20
                </span>{" "}
                at checkout
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/products")}
                className="cursor-pointer px-8 py-3.5 bg-white text-black text-sm font-medium hover:bg-amber-900 hover:text-white transition-all duration-300 rounded-full"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate("/about")}
                className="cursor-pointer px-8 py-3.5 border border-white/30 text-white text-sm font-light hover:border-white/70 transition-all duration-300 rounded-full"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
