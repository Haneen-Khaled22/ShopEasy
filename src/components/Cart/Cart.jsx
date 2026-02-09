import React, { useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";


import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteFromCart } from "../../Redux/Slices/CartSlice";
import { FiMinusCircle } from "react-icons/fi";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import FilterBar from "../FilterBar/FilterBar";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const dispatch = useDispatch();


  return (
    <div className='max-w-7xl mx-auto'>
        <Breadcrumbs/>
        
        <div className="flex items-center justify-between">
                <FilterBar/>
                  <button
                  onClick={()=>dispatch(clearCart())}
                  className="bg-red-800 w-20 h-8 cursor-pointer text-white rounded-4xl hover:bg-red-700 transition ease-in ">Clear all</button>
        </div>
        
            
      

      

        <div className="flex items-center gap-4 justify-between">
            
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
             
      {cart.length > 0 ?
      (cart.map((product, index) => (
        <div
          key={product.id}
          className="rounded-2xl p-3 cursor-pointer animate-fadeInUp m-5"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative">
  <img
    src={product.images?.[0]}
    alt={product.title}
    className="w-full object-cover rounded-xl border border-gray-100 p-5 relative"
  />

  {/* 🗑️ Delete Icon */}
  <div
    onClick={() => dispatch(deleteFromCart(product.id))}
    className="absolute -top-1 -right-1 cursor-pointer  "
  >
    <FiMinusCircle className="text-white bg-red-700 p-0 text-2xl  rounded-full " />
  </div>
</div>


          {/* ⭐ Rating تحت الصورة */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
              {Array(Math.round(product.rating))
                .fill()
                .map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
            </div>
            {/* <div
              onClick={() => dispatch(deleteFromCart(product.id))}
              className="border border-gray-200 rounded-lg p-1 hover:bg-gray-100 transition cursor-pointer"
            >
              <IoCloseCircleOutline className="text-gray-600 font-normal text-lg" />
            </div> */}
          </div>

          <h2 className="text-xl text-gray-700 mt-2 mb-2 line-clamp-1">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h2>

          {/* 📦 Stock قبل السعر */}
          <p className="text-sm text-gray-500 mb-1">
            {product.availabilityStatus} {product.stock}
          </p>

          <h2 className="text-xl text-red-900 mt-2 font-normal">
            ${product.price}
          </h2>
        </div>
      ))):<p className="text-center text-gray-600 m-2">Nothing in your cart yet  </p>}
    </div>

   <div className="w-px bg-gray-400 h-25 mx-8"></div>



            <div>CheckOut</div>

        </div>


         
    </div>
  
  );
};

export default Cart;
