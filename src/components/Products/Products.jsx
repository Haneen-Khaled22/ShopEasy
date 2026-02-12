import axios from "axios";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../BreadCrumb/BreadCrumb";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import FilterBar from "../FilterBar/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/Slices/ProductsSlice";
import { FiCheck, FiMinusCircle, FiPlus } from "react-icons/fi";
import { addToCart } from "../../Redux/Slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Products = ({ limit, showFilter = true, showBread = true }) => {
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
  setFilters({
    ...filters,
    [e.target.name]: e.target.value,
  });

  setCurrentPage(1); // يرجع لأول صفحة
};

  const products = useSelector((state) => state.products);
  console.log(products);

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

 


  let filteredProducts = [...products];

// فلتر category
if (filters.category) {
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.category.toLowerCase() === filters.category.toLowerCase()
  );
}

// فلتر brand
if (filters.brand) {
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.brand?.toLowerCase() === filters.brand.toLowerCase()
  );
}

// ترتيب السعر
if (filters.price === "low") {
  filteredProducts.sort((a, b) => a.price - b.price);
}

if (filters.price === "high") {
  filteredProducts.sort((a, b) => b.price - a.price);
}







if (filters.sort === "newest") {
  filteredProducts.sort((a, b) => b.id - a.id);
}

if (filters.sort === "rating") {
  filteredProducts.sort((a, b) => b.rating - a.rating);
}

if (filters.sort === "discount") {
  filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
}

// const displayedProducts = limit
//   ? filteredProducts.slice(0, limit)
//   : filteredProducts;




const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

const startIndex = (currentPage - 1) * productsPerPage;
const endIndex = startIndex + productsPerPage;

const displayedProducts = filteredProducts.slice(startIndex, endIndex);

const getPagination = () => {
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage > 2) pages.push(1);
    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    if (currentPage < totalPages - 1) pages.push(totalPages);
  }

  return pages;
};
const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="max-w-7xl mx-auto">
      {showBread && <Breadcrumb />}
      {showFilter && <FilterBar filters={filters} handleChange={handleFilterChange} brands={brands} categories={categories}/>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 mt-5">
        {displayedProducts.map((product, index) => {
          const isInCart = cart.some((item) => item.id === product.id);
          return (
            <motion.div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="cursor-pointer bg-white rounded-2xl p-4  transition-all duration-200 group m-3"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full rounded-2xl h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                />
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
                <span className="text-sm text-gray-600">
                  {product.discountPercentage}% off
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    <div className="flex justify-center mt-12 gap-2 flex-wrap">
  {getPagination().map((page, index) =>
    page === "..." ? (
      <span key={index} className="px-3 py-2">
        ...
      </span>
    ) : (
      <button
        key={index}
        onClick={() => setCurrentPage(page)}
        className={`px-4 py-2 rounded-full cursor-pointer transition ${
          currentPage === page
            ? "bg-red-900 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {page}
      </button>
    )
  )}
</div>
    </div>
  );
};

export default Products;
