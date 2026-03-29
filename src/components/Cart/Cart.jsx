import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decreaseQuantity, deleteFromCart, increaseQuantity } from "../../Redux/Slices/CartSlice";
import { FiMinus, FiMinusCircle, FiPlus, FiSearch } from "react-icons/fi";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productToDelete, setProductToDelete] = useState(null);
  const [productsToClear, setProductsToClear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
   const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const {t} = useTranslation();
  useEffect(() => {
  const timer = setTimeout(() => {
    setIsPageLoading(false);
  }, 800);

  return () => clearTimeout(timer);
}, []);


  const { enqueueSnackbar } = useSnackbar();

  const total = cart.reduce((sum, product) => {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;
  return sum + discountedPrice * product.quantity; 
}, 0);
if (isPageLoading) {
  return (
    <div className="flex justify-center items-center py-24 min-h-screen">
      <span className="loader"></span>
    </div>
  );
}
const token = localStorage.getItem("token"); 

 const filteredCart = cart
    .filter((p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    
    <div className="min-h-screen ">
    
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs />

        {/* Header */}
        {cart.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-2"
          >
            <div>
              <h1
                className="text-3xl font-light text-[#1a1410] dark:text-white"
                style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
              >
              {i18next.language === "en" && "My " }
                <span className="italic text-[#5c3d1e] dark:text-[#bd9e7d]">{t("Cart")}</span>
              </h1>
              <p className="text-sm text-[#776a5d] mt-1">
              
                 {cart.length} {cart.length === 1 ? t("item_singular") : t("item_plural")}
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
                              placeholder={t("Search items...")}
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
                            <option value="default">{t("sortDefault")}</option>
<option value="price-asc">{t("priceLowHigh")}</option>
<option value="price-desc">{t("priceHighLow")}</option>
                           
                          </select>
                             <button
  onClick={setProductsToClear}
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
        ) : null}

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            {cart.length > 0 ? (
           <AnimatePresence>
            {filteredCart.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#776a5d] mt-16 text-sm"
              >
                {t("noItemsMatch")}
              </motion.p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-5">
                {filteredCart?.map((product, index) => (
                  <motion.div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="cursor-pointer bg-white dark:bg-black rounded-2xl p-4 transition-all duration-300 group "
                    // style={{ boxShadow: "0 1px 3px rgba(100,70,40,0.06)" }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className=" w-full h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Delete Icon */}
                      <motion.div
                        onClick={(e) => {
                          e.stopPropagation();
                          setProductToDelete(product.id);
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-0 right-0 cursor-pointer"
                      >
                        <FiMinusCircle
                          className="p-1 text-3xl rounded-full transition-colors duration-200"
                          style={{ color: "white", background: "#5c3d1e" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#3d2b1a")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#5c3d1e")
                          }
                        />
                      </motion.div>

                      {/* Stock Badge */}
                      <div className="absolute bottom-0 left-0 px-3 bg-white/30 rounded-2xl py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                         {i18next.language === "ar" ? (
    <>
      {t("left")}    {product.stock} {product.availabilityStatus}
    </>
  ) : (
    <>
      {product.availabilityStatus} {product.stock}    {t("left")}
    </>
  )}
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
                      <span className="text-sm text-gray-500 ml-1 dark:text-gray-300">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300  line-clamp-2 h-15">
                      {product.title}
                    </h2>
                    {/* quantity */}
                    <div className="mb-2">
                      <button
                        onClick={(e)=>{e.stopPropagation(),dispatch(decreaseQuantity(product.id))}}
                        // disabled={!cartItem || quantity <= 1}
                        className="p-1 border border-gray-200 rounded dark:text-gray-300  hover:bg-gray-100  hover:dark:text-black disabled:opacity-50  cursor-pointer"
                      >
                        <FiMinus />
                      </button>

                      <span className="px-2 font-normal dark:text-gray-300 ">{product.quantity}</span>

                      <button
                        onClick={(e)=>{
                           e.stopPropagation()
                          dispatch(increaseQuantity(product.id))
                         

                        }}
                        className="p-1 border border-gray-200 rounded dark:text-gray-300  cursor-pointer hover:bg-gray-100 hover:dark:text-black "
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-auto">
                      <span
                        className="text-2xl font-semibold text-[#5c3d1e] dark:text-[#bd9e7d]"
                      >
                        ${product.price}
                      </span>
                      <span className="text-sm text-[#776a5d] dark:text-gray-300">
                         {product.discountPercentage}% {t("off")}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
              </AnimatePresence>):
            (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-16 text-center mt-8"
              >
                <div className="text-6xl mb-5">🛍️</div>
                <p
                  className="text-2xl font-light mb-2"
                  style={{
                    color: "#3d2b1a",
                    fontFamily: "'Palatino Linotype', Palatino, serif",
                  }}
                >
                  {t("yourCartEmpty")}
                </p>
                <p className="text-sm mb-8" style={{ color: "#776a5d" }}>
                {t("startShopping")}
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className=" cursor-pointer px-8 py-3 rounded-full text-sm font-light transition-all duration-300"
                  style={{ background: "#5c3d1e", color: "#fffcf7" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#3d2b1a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#5c3d1e")
                  }
                >
{t("browseProducts")}                </button>
              </motion.div>
            )} 
          </div>

          {/* Checkout Sidebar */}
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-96 w-full"
            >
              <div
                className="rounded-3xl p-6 sticky top-6 bg-white dark:bg-black border border-[#e8dfd0] shadow-[0_4px_24px_rgba(100,70,40,0.08)]"
                
              >
                {/* Sidebar Header */}
                <div
                  className="flex items-center gap-3 mb-6 pb-5"
                  style={{ borderBottom: "1px solid #ede4d3" }}
                >
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ background: "#8a5c2e" }}
                  />
                  <h3
                    className="text-xl font-light text-[#1a1410] dark:text-white"
                    style={{
                      fontFamily: "'Palatino Linotype', Palatino, serif",
                    }}
                  >
                  {t("orderSummary")}
                  </h3>
                </div>

                {/* Items Count */}
                <div
                  className="flex justify-between items-center mb-4 pb-4"
                  style={{ borderBottom: "1px solid #f0e8da" }}
                >
                  <span className="text-sm font-light text-[#776a5d] dark:text-gray-300">
                    {t("itemsInCart")}
                  </span>
                  <span
                    className="text-sm font-medium px-3 py-0.5 rounded-full"
                    style={{ background: "#f0e4d0", color: "#5c3d1e" }}
                  >
                       {cart.reduce((totalQty, product) => totalQty + product.quantity, 0)} {/* إجمالي الكميات */}

                  </span>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-light text-[#776a5d] dark:text-gray-300">
                    {t("subtotal")}
                  </span>
                  <span className="text-sm font-medium text-[#3d2b1a] dark:text-gray-300">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-light text-[#776a5d] dark:text-gray-300">
                    {t("shipping")}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {t("free")}
                  </span>
                </div>

                {/* Tax */}
                <div
                  className="flex justify-between items-center mb-5 pb-5"
                  style={{ borderBottom: "1px solid #f0e8da" }}
                >
                  <span className="text-sm font-light text-[#776a5d] dark:text-gray-300">
                    {t("tax")} (10%)
                  </span>
                  <span className="text-sm font-medium text-[#3d2b1a] dark:text-gray-300">
                    ${(total * 0.1).toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-medium text-[#1a1410] dark:text-gray-400">
                    {t("total")}
                  </span>
                  <span
                    className="text-2xl font-light text-[#5c3d1e] dark:text-[#b07235]"
                    style={{
                     
                      fontFamily: "'Palatino Linotype', Palatino, serif",
                    }}
                  >
                    ${(total * 1.1).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                 onClick={() => {
  const token = localStorage.getItem("token"); // أو استخدمي user من Redux
  if (token) {
    navigate("/checkout");
  } else {
    enqueueSnackbar(t("mustLogin"), { 
      variant: "error",
      autoHideDuration: 2000,
    });
    navigate("/login"); // ممكن توجهه لصفحة تسجيل الدخول
  }
}}
                  className="w-full cursor-pointer py-4 rounded-xl font-light text-base tracking-wide transition-all duration-300"
                  style={{ background: "#3d2b1a", color: "#fffcf7" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#5c3d1e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#3d2b1a")
                  }
                >
                 {t("checkout")}
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/products")}
                  className=" cursor-pointer w-full text-[#5c3d1e] hover:text-black dark:text-gray-300 mt-3 py-3 rounded-xl font-light text-sm transition-all duration-300"
                  style={{
                    border: "1px solid #c8b49a",
                    
                    background: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5ede0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                {t("continueShopping")}
                </button>

                {/* Trust Badges */}
                <div
                  className="mt-5 pt-5 flex items-center justify-center gap-5"
                  style={{ borderTop: "1px solid #f0e8da" }}
                >
                  {[
  { icon: "🔒", text: t("securePayment") },
  { icon: "🔄", text: t("freeReturns") },
].map((badge) => (
                    <span
                      key={badge}
                      className="text-xs font-light"
                      style={{ color: "#9a8878" }}
                    >
                      {badge.icon}  {badge.text}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        {/* </div> */}

        {/* ── Delete Modal ── */}
        {productToDelete && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-7 rounded-3xl shadow-2xl w-80 text-center"
              style={{ border: "1px solid #e8dfd0" }}
            >
              <div className="text-4xl mb-3">🗑️</div>
              <h3
                className="text-lg font-light mb-2 text-[#1a1410]"
                style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
              >
                {t("removeProduct")}
              </h3>
              <p className="text-xs text-[#776a5d] mb-6">
                {t("removeConfirm")}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setProductToDelete(null);
                  }}
                  className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light transition-all duration-200"
                  style={{ border: "1px solid #d4c4b0", color: "#776a5d" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5ede0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                 {t("cancel")}
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
  setLoading(true);

  setTimeout(() => {
    const deletedProduct = cart.find(
      (p) => p.id === productToDelete,
    );

    dispatch(deleteFromCart(productToDelete));
    setProductToDelete(null);
    setLoading(false);

    enqueueSnackbar(
       `${deletedProduct.title} ${t("deletedFromCart")}`,
      { variant: "default", sx: {
                                backgroundColor: "#776a5d", // لون الخلفية
                                color: "#fff", // لون النص
                                fontWeight: "bold",
                              },
                              anchorOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              autoHideDuration: 2500, },
    );
  }, 500);
}}
                  className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light text-white transition-all duration-200"
                  style={{ background: "#5c3d1e" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#3d2b1a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#5c3d1e")
                  }
                >
                  {loading ? t("loading") : t("remove")}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── Clear All Modal ── */}
        {productsToClear && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-7 rounded-3xl shadow-2xl w-80 text-center"
              style={{ border: "1px solid #e8dfd0" }}
            >
              <div className="text-4xl mb-3">🛒</div>
              <h3
                className="text-lg font-light mb-2 text-[#1a1410]"
                style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
              >
               {t("clearCart")}
              </h3>
              <p className="text-xs text-[#776a5d] mb-6">
               {t("clearConfirm", { count: cart.length })}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setProductsToClear(null)}
                  className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light transition-all duration-200"
                  style={{ border: "1px solid #d4c4b0", color: "#776a5d" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5ede0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {t("cancel")}
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                 onClick={() => {
  setLoading(true);

  setTimeout(() => {
    dispatch(clearCart());
    setProductsToClear(null);
    setLoading(false);

    enqueueSnackbar(t("cartCleared"), {
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
    })
    ;
  }, 600);
}}
                  className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-light text-white transition-all duration-200"
                  style={{ background: "#5c3d1e" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#3d2b1a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#5c3d1e")
                  }
                >
                 {loading ? t("loading") : t("clearAll")}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
        </div>
        </div>
        </div>);
}

export default Cart;
