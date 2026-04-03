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
import { decreaseQuantity, deleteFromCart, increaseQuantity } from "../../Redux/Slices/CartSlice";
import { addToCart } from "../../Redux/Slices/CartSlice";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const WishList = () => {
  const wishlist = useSelector((state) => state.wishList);
  const cart = useSelector((state) => state.cart);

  console.log(wishlist)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  // ── تعريف snackbarConfig مرة واحدة بدل ما تتكرر في كل مكان ──
  const snackbarConfig = { variant: "default" };

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
      // ✅ استخدام مفتاح الترجمة الصح مع {{product}}
      enqueueSnackbar(t("removedFromWishlist", { product: removed?.title }), snackbarConfig);
    }, 500);
  };

  const handleClearAll = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(clearWishList());
      setClearModalOpen(false);
      setLoading(false);
      // ✅ استخدام مفتاح الترجمة الصح
      enqueueSnackbar(t("clearedWishlist"), snackbarConfig);
    }, 600);
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
            className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 px-3"
          >
            <div>
              <h1
                className="text-3xl font-light text-[#1a1410] dark:text-white"
                style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
              >
                {i18next.language === "en" && "My "}
                <span className="italic text-[#5c3d1e] dark:text-[#bd9e7d]">{t("wishlist")}</span>
              </h1>
              <p className="text-sm text-[#776a5d] mt-1">
                {wishlist.length} {wishlist.length === 1 ? t("item_singular") : t("item_plural")}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Search */}
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-[#c8b49a] bg-white
                 dark:bg-black dark:text-gray-300 dark:border-gray-300"
              >
                <FiSearch className="text-[#776a5d] dark:text-gray-300" />
                <input
                  type="text"
                  // ✅ مفتاح ترجمة صح للـ placeholder
                  placeholder={t("searchItems")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none bg-transparent text-[#3d2b1a] dark:text-gray-300 placeholder-[#b0a090] text-sm w-36"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-[#c8b49a] bg-white rounded-full text-sm outline-none cursor-pointer dark:bg-black dark:text-gray-300 dark:border-gray-300"
              >
                <option value="default">{t("Sort By")}</option>
                <option value="price-asc">{t("Low → High")}</option>
                <option value="price-desc">{t("High → Low")}</option>
                <option value="rating">{t("Top Rated")}</option>
              </select>

              {/* Clear All */}
              <button
                onClick={() => setClearModalOpen(true)}
                className="
                  cursor-pointer flex items-center gap-2 px-5 py-2 
                  rounded-full text-sm font-light 
                  border border-[#c8b49a] text-[#5c3d1e] bg-transparent 
                  transition-all duration-300
                  dark:text-gray-300
                  dark:border-gray-300
                  hover:bg-[#5c3d1e] hover:text-[#fffcf7] hover:border-[#5c3d1e]
                "
              >
                ✕ {t("ClearFilters")}
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
                {t("noProductsFound")}
              </motion.p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5 px-3">
                {filteredWishlist.map((product, index) => {
                  const favItem = wishlist.find((item) => item.id === product.id);
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
                      className="cursor-pointer p-4 transition-all duration-200 group"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                          className="w-full rounded-2xl h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInCart) {
                              dispatch(deleteFromCart(product.id));
                              // ✅ استخدام snackbarConfig المعرفة مرة واحدة
                              enqueueSnackbar(
                                t("removedFromCart", { product: product.title }),
                                snackbarConfig
                              );
                            } else {
                              dispatch(addToCart(product));
                              enqueueSnackbar(
                                t("addedToCart", { product: product.title }),
                                snackbarConfig
                              );
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
                        <div className="absolute bottom-0 left-0 px-3 bg-white/30 rounded-2xl py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                          {i18next.language === "ar" ? (
                            <>
                              {t("left")} {product.stock} {product.availabilityStatus}
                            </>
                          ) : (
                            <>
                              {product.availabilityStatus} {product.stock} {t("left")}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {Array(Math.round(product.rating))
                          .fill()
                          .map((_, i) => (
                            <span key={i} className="text-amber-400">⭐</span>
                          ))}
                        <span className="text-sm text-gray-500 dark:text-gray-300 ml-1">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Title & Fav */}
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2 line-clamp-2 h-14">
                          {product.title}
                        </h2>
                        {isInFav ? (
                          <FaHeart
                            onClick={(e) => {
                              e.stopPropagation();
                              setProductToDelete(product.id);
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
                              // ✅ استخدام snackbarConfig المعرفة مرة واحدة
                              enqueueSnackbar(
                                t("addedToWishlist", { product: product.title }),
                                snackbarConfig
                              );
                            }}
                            className="cursor-pointer text-gray-400 
                                       hover:text-red-500 
                                       transition-all duration-200 
                                       transform hover:scale-110 active:scale-95"
                          />
                        )}
                      </div>

                      {/* Quantity Controls */}
                      {isInCart && (
                        <div className="mb-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(decreaseQuantity(product.id));
                            }}
                            className="cursor-pointer p-1 border border-gray-100 rounded hover:bg-gray-100 dark:hover:text-black disabled:opacity-50"
                          >
                            <FiMinus />
                          </button>
                          <span className="px-2 font-normal">{cartItem?.quantity}</span>
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
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {product.discountPercentage}% {t("off")}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        ) : (
          /* ── Empty State ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-black rounded-3xl p-16 text-center mt-8"
          >
            <div className="text-6xl mb-5">💛</div>
            <p className="text-2xl font-light mb-2 text-[#3d2b1a] dark:text-white">
              {t("wishlistEmptyTitle")}
            </p>
            <p className="text-sm mb-8" style={{ color: "#776a5d" }}>
              {t("wishlistEmptyDesc")}
            </p>
            <button
              onClick={() => navigate("/products")}
              className="cursor-pointer px-8 py-3 rounded-full text-sm font-light transition-all duration-300"
              style={{ background: "#5c3d1e", color: "#fffcf7" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#3d2b1a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#5c3d1e")}
            >
              {t("browseProducts")}
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
                <h3 className="text-lg font-light mb-2 text-[#1a1410]">
                  {t("removeWishlistTitle")}
                </h3>
                <p className="text-xs text-[#776a5d] mb-6">
                  {t("removeWishlistDesc")}
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setProductToDelete(null)}
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light transition-all duration-200"
                    style={{ border: "1px solid #d4c4b0", color: "#776a5d" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5ede0")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {t("cancel")}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleRemove(productToDelete)}
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light text-white transition-all duration-200"
                    style={{ background: "#5c3d1e" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#3d2b1a")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#5c3d1e")}
                  >
                    {loading ? t("loading") : t("delete")}
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
                <h3 className="text-lg font-light mb-2 text-[#1a1410]">
                  {t("clearWishlistTitle")}
                </h3>
                <p className="text-xs text-[#776a5d] mb-6">
                  {t("clearWishlistDesc", { count: wishlist.length })}
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setClearModalOpen(false)}
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light transition-all duration-200"
                    style={{ border: "1px solid #d4c4b0", color: "#776a5d" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5ede0")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {t("cancel")}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClearAll}
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light text-white transition-all duration-200"
                    style={{ background: "#5c3d1e" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#3d2b1a")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#5c3d1e")}
                  >
                    {loading ? t("clearing") : t("clearall")}
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
