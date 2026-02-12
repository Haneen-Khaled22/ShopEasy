import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteFromCart } from "../../Redux/Slices/CartSlice";
import { FiMinusCircle } from "react-icons/fi";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import FilterBar from "../FilterBar/FilterBar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [productToDelete, setProductToDelete] = useState(null);
  const [productsToClear, setProductsToClear] = useState(null);


  // حساب الإجمالي
  const total = cart.reduce((sum, product) => {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return sum + discountedPrice;
}, 0);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 ">
        <Breadcrumbs />

        {/* Header with Filter and Clear Button */}
        {cart.length >0 ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between  bg-white rounded-2xl "
          >
            {/* <FilterBar /> */}
            <button
              onClick={setProductsToClear}
              className="bg-gradient-to-r from-red-950 to-red-800 px-6 py-2 text-white rounded-full cursor-pointer hover:scale-105 transition-all duration-300 font-medium"
            >
              Clear All
            </button>
          </motion.div>
        ) : null}

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            {cart.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {cart.map((product, index) => (
                  <motion.div
                    key={product.id}
                     onClick={()=>navigate(`/product/${product.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="cursor-pointer bg-white rounded-2xl p-4  transition-all duration-300 group"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Delete Icon */}
                      <motion.div
                       onClick={(e) => {
                          e.stopPropagation();  
                          setProductToDelete(product.id)
                        }}
                      
                        // whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute -top-0 -right-0 cursor-pointer"
                      >
                        <FiMinusCircle className="text-white bg-red-800 hover:bg-red-600 p-1 text-3xl rounded-full " />
                      </motion.div>

                      {/* Stock Badge */}
                      <div className="absolute bottom-0 left-0 px-3  bg-white/30 rounded-2xl  py-1  text-xs font-medium text-gray-600">
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

                    {/* Product Title */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                      {product.title}
                    </h2>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-semibold text-red-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-700">
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
                className="bg-white rounded-2xl p-12 text-center "
              >
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-2xl text-gray-600 font-light mb-2">
                  Your cart is empty
                </p>
                <p className="text-gray-500">
                  Start shopping and add items to your cart!
                </p>
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
              <div className="bg-gradient-to-br from-white/30 to-white rounded-2xl p-6 sticky top-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Order Summary
                </h3>

                {/* Cart Items Count */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Items in cart</span>
                  <span className="font-semibold text-gray-800">
                    {cart.length}
                  </span>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold text-gray-800">
                    ${(total * 0.1).toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold text-gray-800">
                    Total
                  </span>
                  <span className="text-2xl font-semibold text-red-900">
                    ${(total * 1.1).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={()=>navigate('/checkout')}
                  className="w-full cursor-pointer bg-gradient-to-r from-red-950 to-red-800 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Proceed to Checkout
                </motion.button>

                {/* Continue Shopping */}
                <button
                onClick={()=>navigate(`/products`)}
                className=" cursor-pointer w-full mt-3 border-2 border-red-900 text-red-900 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Free Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        {productToDelete && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
      <h3 className="text-lg font-semibold mb-4">
       Remove this product from cart ?
      </h3>

      <div className="flex justify-center gap-4">
        <motion.button
        onClick={() => setProductToDelete(null)}
          className="px-4 py-2 border font-normal rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-300"
        >
        Cancel

        </motion.button>
        

<motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
               
                  onClick={() => {
            dispatch(deleteFromCart(productToDelete));
            setProductToDelete(null);
          }}
                  className="px-4 py-2 cursor-pointer bg-gradient-to-r from-red-950 to-red-800 text-white  rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Delete
                </motion.button>
       
      </div>
    </div>
  </div>
)}

  {productsToClear && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
      <h3 className="text-lg font-semibold mb-4">
       Clear all products in cart ?
      </h3>

      <div className="flex justify-center gap-4">
        <motion.button
        onClick={() => setProductsToClear(null)}
          className="px-4 py-2 border font-normal rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-300"
        >
        Cancel

        </motion.button>
        

<motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
               
                  onClick={() => {
            dispatch(clearCart(productsToClear));
            setProductsToClear(null);
          }}
                  className="px-4 py-2 cursor-pointer bg-gradient-to-r from-red-950 to-red-800 text-white  rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Clear
                </motion.button>
       
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Cart;