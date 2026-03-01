import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decreaseQuantity, deleteFromCart, increaseQuantity } from "../../Redux/Slices/CartSlice";
import { FiMinus, FiMinusCircle, FiPlus } from "react-icons/fi";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productToDelete, setProductToDelete] = useState(null);
  const [productsToClear, setProductsToClear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
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
  return sum + discountedPrice * product.quantity; // ضرب في الكمية
}, 0);
if (isPageLoading) {
  return (
    <div className="flex justify-center items-center py-24 min-h-screen">
      <span className="loader"></span>
    </div>
  );
}

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
                My <span className="italic text-[#5c3d1e]">Cart</span>
              </h1>
              <p className="text-sm text-[#776a5d] mt-1">
                {cart.length} item{cart.length !== 1 ? "s" : ""}
              </p>
            </div>
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
  ✕ Clear All
</button>
          </motion.div>
        ) : null}

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            {cart.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-5">
                {cart.map((product, index) => (
                  <motion.div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="cursor-pointer bg-white rounded-2xl p-4 transition-all duration-300 group "
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

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-800  line-clamp-2 h-15">
                      {product.title}
                    </h2>
                    {/* quantity */}
                    <div className="mb-2">
                      <button
                        onClick={(e)=>{e.stopPropagation(),dispatch(decreaseQuantity(product.id))}}
                        // disabled={!cartItem || quantity <= 1}
                        className="p-1 border border-gray-200 rounded dark:text-black hover:bg-gray-100 disabled:opacity-50  cursor-pointer"
                      >
                        <FiMinus />
                      </button>

                      <span className="px-2 font-normal dark:text-black">{product.quantity}</span>

                      <button
                        onClick={(e)=>{
                           e.stopPropagation()
                          dispatch(increaseQuantity(product.id))
                         

                        }}
                        className="p-1 border border-gray-200 rounded dark:text-black cursor-pointer hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-auto">
                      <span
                        className="text-2xl font-semibold"
                        style={{ color: "#5c3d1e" }}
                      >
                        ${product.price}
                      </span>
                      <span className="text-sm text-[#776a5d]">
                        {product.discountPercentage}% off
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
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
                  Your cart is <span className="italic">empty</span>
                </p>
                <p className="text-sm mb-8" style={{ color: "#776a5d" }}>
                  Start shopping and add items to your cart!
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
                  Browse Products
                </button>
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
                className="rounded-3xl p-6 sticky top-6"
                style={{
                  background: "#fff",
                  border: "1px solid #e8dfd0",
                  boxShadow: "0 4px 24px rgba(100,70,40,0.08)",
                }}
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
                    className="text-xl font-light text-[#1a1410]"
                    style={{
                      fontFamily: "'Palatino Linotype', Palatino, serif",
                    }}
                  >
                    Order Summary
                  </h3>
                </div>

                {/* Items Count */}
                <div
                  className="flex justify-between items-center mb-4 pb-4"
                  style={{ borderBottom: "1px solid #f0e8da" }}
                >
                  <span className="text-sm font-light text-[#776a5d]">
                    Items in cart
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
                  <span className="text-sm font-light text-[#776a5d]">
                    Subtotal
                  </span>
                  <span className="text-sm font-medium text-[#3d2b1a]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-light text-[#776a5d]">
                    Shipping
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    Free
                  </span>
                </div>

                {/* Tax */}
                <div
                  className="flex justify-between items-center mb-5 pb-5"
                  style={{ borderBottom: "1px solid #f0e8da" }}
                >
                  <span className="text-sm font-light text-[#776a5d]">
                    Tax (10%)
                  </span>
                  <span className="text-sm font-medium text-[#3d2b1a]">
                    ${(total * 0.1).toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-medium text-[#1a1410]">
                    Total
                  </span>
                  <span
                    className="text-2xl font-light"
                    style={{
                      color: "#5c3d1e",
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
                  onClick={() => navigate("/checkout")}
                  className="w-full cursor-pointer py-4 rounded-xl font-light text-base tracking-wide transition-all duration-300"
                  style={{ background: "#3d2b1a", color: "#fffcf7" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#5c3d1e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#3d2b1a")
                  }
                >
                  Proceed to Checkout →
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/products")}
                  className="w-full mt-3 py-3 rounded-xl font-light text-sm transition-all duration-300"
                  style={{
                    border: "1px solid #c8b49a",
                    color: "#5c3d1e",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5ede0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div
                  className="mt-5 pt-5 flex items-center justify-center gap-5"
                  style={{ borderTop: "1px solid #f0e8da" }}
                >
                  {["🔒 Secure Payment", "🔄 Free Returns"].map((badge) => (
                    <span
                      key={badge}
                      className="text-xs font-light"
                      style={{ color: "#9a8878" }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

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
                Remove this product?
              </h3>
              <p className="text-xs text-[#776a5d] mb-6">
                This item will be removed from your cart.
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
                  Cancel
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
      `${deletedProduct.title} deleted from Cart`,
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
                  {loading ? "loading.." : "Remove"}
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
                Clear entire cart?
              </h3>
              <p className="text-xs text-[#776a5d] mb-6">
                All {cart.length} items will be removed.
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
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                 onClick={() => {
  setLoading(true);

  setTimeout(() => {
    dispatch(clearCart());
    setProductsToClear(null);
    setLoading(false);

    enqueueSnackbar("Cart has been cleared", {
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
                 {loading ? "loading" : "Clear All"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
