import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FiHeart, FiShoppingCart, FiTrash2, FiSearch, FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import { FaHeart } from "react-icons/fa";

import { deleteFromWishList, clearWishList, addToWishList } 
from "../../Redux/Slices/WishListSlice";
import { deleteFromCart } from "../../Redux/Slices/CartSlice";
import { addToCart } from "../../Redux/Slices/CartSlice";

const WishList = () => {
  const wishlist = useSelector((state) => state.wishList);
    const cart = useSelector((state) => state.cart);

  console.log(wishlist)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);



  const filteredWishlist = wishlist
    .filter((p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const handleRemove = (id) => {
    setLoading(true);
    setTimeout(() => {
      const removed = wishlist.find((p) => p.id === id);
      dispatch(deleteFromWishList(id));
      setProductToDelete(null);
      setLoading(false);
      enqueueSnackbar(`${removed?.title} removed from Wishlist`, snackbarConfig);
    }, 500);
  };

  const handleClearAll = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(clearWishList());
      setClearModalOpen(false);
      setLoading(false);
      enqueueSnackbar("Wishlist has been cleared", snackbarConfig);
    }, 600);
  };

  const handleAddToCart = (product) => {
    // dispatch(addToCart(product));
    enqueueSnackbar(`${product.title} added to Cart`, snackbarConfig);
  };

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Breadcrumbs />

        {/* ── Header ── */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4"
          >
            <div>
              <h1
                className="text-3xl font-light text-[#1a1410]"
                style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
              >
                My{" "}
                <span className="italic text-[#5c3d1e]">Wishlist</span>
              </h1>
              <p className="text-sm text-[#776a5d] mt-1">
                {wishlist.length}  item{wishlist.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Search */}
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ border: "1px solid #c8b49a", background: "#fff" }}
              >
                <FiSearch className="text-[#776a5d]" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none bg-transparent text-[#3d2b1a] placeholder-[#b0a090] text-sm w-36"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full text-sm outline-none cursor-pointer"
                style={{
                  border: "1px solid #c8b49a",
                  color: "#5c3d1e",
                  background: "#fff",
                 
                }}
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* Clear All */}
              <button
                onClick={() => {setClearModalOpen(true)
                
                }}
                className="cursor-pointer flex items-center gap-2 px-5 py-2 rounded-full text-sm font-light border transition-all duration-300"
                style={{
                  border: "1px solid #c8b49a",
                  color: "#5c3d1e",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5c3d1e";
                  e.currentTarget.style.color = "#fffcf7";
                  e.currentTarget.style.borderColor = "#5c3d1e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#5c3d1e";
                  e.currentTarget.style.borderColor = "#c8b49a";
                }}
              >
                ✕ Clear All
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Grid or Empty ── */}
        {wishlist.length > 0 ? (
          <AnimatePresence>
            {filteredWishlist.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#776a5d] mt-16 text-sm"
              >
                No items match your search.
              </motion.p>
            ) : (
             
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
                
                {filteredWishlist.map((product, index) => {
                  const favItem = wishlist.find((item) => item.id === product.id)
                  const isInFav = !!favItem;
                   const cartItem = cart.find((item) => item.id === product.id);
                  const isInCart = !!cartItem;
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

    if (isInCart) {
      dispatch(deleteFromCart(product.id));
      enqueueSnackbar(`${product.title} removed from Cart`, { variant: "default" });
    } else {
      dispatch(addToCart(product));
      enqueueSnackbar(`${product.title} added to Cart`, { variant: "default" });
    }
  }}
  className="absolute top-2 right-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
>
  {isInCart ? (
    <FiCheck className="text-white bg-green-700 rounded-full w-7 h-7 p-1.5 shadow-lg stroke-[2.5]" />
  ) : (
    <FiPlus className="text-white bg-[#776a5d] rounded-full w-7 h-7 p-1.5 shadow-lg stroke-[2.5]" />
  )}
</div>
                                         <div className="absolute bottom-0 left-0 px-3 bg-white/30 rounded-2xl py-1 text-xs font-medium text-gray-600">
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
                                         <span className="text-sm text-gray-500 ml-1">
                                           ({product.rating})
                                         </span>
                                       </div>
                 
                                       {/* Title , fav*/}
                                       <div className="flex justify-between items-center">
                                         <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                                         {product.title}
                                       </h2>
                    {isInFav ? (
   <FaHeart
    onClick={(e) => {
      e.stopPropagation();
      setProductToDelete(product.id); // 👈 يفتح المودال
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
               transform hover:scale-110 active:scale-95"  />
)}
                                         
                                       </div>
                                       
                                      
                 
                                       {/* Price */}
                                       <div className="flex items-center justify-between mt-auto">
                                         <span className="text-xl font-semibold text-[#776a5d]">
                                           ${product.price}
                                         </span>
                                         <span className="text-sm text-gray-600">
                                           {product.discountPercentage}% off
                                         </span>
                                       </div>
                                     </motion.div>
                  )
                   

                }
                    
                )}
              </div>
            )}
          </AnimatePresence>
        ) : (
          /* ── Empty State ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-16 text-center mt-8"
          >
            <div className="text-6xl mb-5">💛</div>
            <p
              className="text-2xl font-light mb-2"
              style={{
                color: "#3d2b1a",
               
              }}
            >
              Your wishlist is <span className="italic">empty</span>
            </p>
            <p className="text-sm mb-8" style={{ color: "#776a5d" }}>
              Save the items you love and come back to them anytime.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="cursor-pointer px-8 py-3 rounded-full text-sm font-light transition-all duration-300"
              style={{ background: "#5c3d1e", color: "#fffcf7" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#3d2b1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#5c3d1e")
              }
            >
              Browse Products
            </button>
          </motion.div>
        )}

        {/* ── Remove Modal ── */}
        <AnimatePresence>
          {productToDelete && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-7 rounded-3xl shadow-2xl w-80 text-center"
                style={{ border: "1px solid #e8dfd0" }}
              >
              <div className="text-4xl mb-3">🗑️</div>
                <h3
                  className="text-lg font-light mb-2 text-[#1a1410]"
                  style={{
                  }}
                >
                  Remove from wishlist?
                </h3>
                <p className="text-xs text-[#776a5d] mb-6">
                  This item will be removed from your saved list.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setProductToDelete(null)}
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light transition-all duration-200"
                    style={{ border: "1px solid #d4c4b0", color: "#776a5d" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f5ede0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleRemove(productToDelete)}
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light text-white transition-all duration-200"
                    style={{ background: "#5c3d1e" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#3d2b1a")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#5c3d1e")
                    }
                  >
                    {loading ? "Loading..." : "Delete"}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── Clear All Modal ── */}
        <AnimatePresence>
          {clearModalOpen && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-7 rounded-3xl shadow-2xl w-80 text-center"
                style={{ border: "1px solid #e8dfd0" }}
              >
                <div className="text-4xl mb-3">🗑️</div>
                <h3
                  className="text-lg font-light mb-2 text-[#1a1410]"
                  style={{
                    fontFamily: "'Palatino Linotype', Palatino, serif",
                  }}
                >
                  Clear entire wishlist?
                </h3>
                <p className="text-xs text-[#776a5d] mb-6">
                  All {wishlist.length} saved items will be removed.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setClearModalOpen(false)}
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light transition-all duration-200"
                    style={{ border: "1px solid #d4c4b0", color: "#776a5d" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f5ede0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClearAll}
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light text-white transition-all duration-200"
                    style={{ background: "#5c3d1e" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#3d2b1a")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#5c3d1e")
                    }
                  >
                    {loading ? "Clearing..." : "Clear All"}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishList;
