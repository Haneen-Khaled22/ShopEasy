import axios from "axios";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../BreadCrumb/BreadCrumb";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import FilterBar from "../FilterBar/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/Slices/ProductsSlice";
import { FiCheck, FiPlus } from "react-icons/fi";
import { addToCart } from "../../Redux/Slices/CartSlice";
import { useNavigate } from "react-router-dom";

const Products = ({ limit, showFilter = true, showBread = true }) => {

  const navigate = useNavigate();
  
  

  const products = useSelector((state) => state.products);
  console.log(products);

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="max-w-7xl mx-auto">
      {showBread && <Breadcrumb />}
      {showFilter && <FilterBar />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {displayedProducts.map((product, index) => {
           const isInCart = cart.some((item)=>item.id===product.id)
          return (
             <div
             onClick={()=>navigate(`/product/${product.id}`)}
            key={product.id}
            className="rounded-2xl p-3 cursor-pointer animate-fadeInUp m-5"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full object-cover rounded-xl border relative border-gray-100 p-5"
            />

            {/* ⭐ Rating تحت الصورة */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                {Array(Math.round(product.rating))
                  .fill()
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
            <div
   onClick={(e) => {
    e.stopPropagation();  
    if (!isInCart) {
      dispatch(addToCart(product));
    }
  }}
  className="absolute top-2 right-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
>
  {isInCart ? (
    <FiCheck className="text-white bg-green-700 rounded-full w-7 h-7 p-1.5 shadow-lg stroke-[2.5]" />
  ) : (
    <FiPlus className="text-white bg-red-900 rounded-full w-7 h-7 p-1.5 shadow-lg stroke-[2.5]" />
  )}
</div>


            </div>

            <h2 className="text-xl text-gray-700 mt-2 mb-2 line-clamp-1">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h2>

            {/* 📦 Stock قبل السعر */}
            <p className="text-sm text-gray-600 mb-1">
              {product.availabilityStatus} 
            </p>

            <h2 className="text-xl text-red-900 mt-2 font-normal">
              ${product.price}
            </h2>
          </div>
          )
        }
         
         
      )}
      </div>
    </div>
  );
};

export default Products;
