import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryProducts } from "../../Redux/Slices/CategoryProducts";
import { FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart, decreaseQuantity, increaseQuantity } from "../../Redux/Slices/CartSlice";
import { enqueueSnackbar, useSnackbar } from "notistack";

const CategoryProducts = () => {
  const { slug } = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const {data,loading,error} = useSelector((state) => state.categoryProducts);
  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryProducts(slug));
  }, []);

   useEffect(() => {
      if (error) {
        enqueueSnackbar(error, { variant: "error" });
      }
    }, [error]);
  

  return (
    <div className="max-w-7xl mx-auto mt-12">
       {loading && (
       
       <div className="flex justify-center items-center py-24 min-h-screen">
          <span className="loader"></span>
        </div>
      )}
      <motion.div
        // key={currentPage + JSON.stringify(filters)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-12"
      >
        
        {data?.map((product, index) => {
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

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                {product.title}
              </h2>
               {isInCart && (
                                      <div className="mb-2">
                                        <button
                                          onClick={(e) => {
                                            (e.stopPropagation(),
                                              dispatch(decreaseQuantity(product.id)));
                                          }}
                                          // disabled={!cartItem || quantity <= 1}
                                          className="p-1 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                          className="p-1 border border-gray-200 rounded hover:bg-gray-100"
                                        >
                                          <FiPlus />
                                        </button>
                                      </div>
                                    )}

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
          );
        })}
      </motion.div>
    </div>
  );
};

export default CategoryProducts;
