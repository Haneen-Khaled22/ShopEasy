import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryProducts } from "../../Redux/Slices/CategoryProducts";
import { FiCheck, FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart, decreaseQuantity, deleteFromCart, increaseQuantity } from "../../Redux/Slices/CartSlice";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { FaHeart } from "react-icons/fa";
import { addToWishList, deleteFromWishList } from "../../Redux/Slices/WishListSlice";


const CategoryProducts = () => {
  const { slug } = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const {t} =useTranslation();
   
      const wishlist = useSelector((state) => state.wishList);

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const {data,loading,error} = useSelector((state) => state.categoryProducts);
  console.log(data);

  const dispatch = useDispatch();
   const snackbarConfig = {
    variant: "default",
    sx: {
      backgroundColor: "#776a5d",
      color: "#fff",
      fontWeight: "bold",
    },
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    autoHideDuration: 2500,
  };

  useEffect(() => {
    dispatch(getCategoryProducts(slug));
  }, []);

  useEffect(() => {
  if (error) {
    enqueueSnackbar(typeof error === "string" ? error : "Something went wrong", { variant: "error" });
  }
}, [error, enqueueSnackbar]);
  

  return (
    <div className="max-w-7xl mx-auto mt-12">
       {loading && (
       
       <div className="flex justify-center items-center py-24 min-h-screen">
          <span className="loader"></span>
        </div>
      )}
    <h1 className="text-2xl font-medium text-gray-800 dark:text-gray-300 mb-6 capitalize p-3">
  {slug}
</h1>
      <motion.div
        // key={currentPage + JSON.stringify(filters)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12 px-4"
      >
        
        
        {data?.map((product, index) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const isInCart = !!cartItem;
            const favItem = wishlist.find((item) => item.id === product.id);
            const isInFav = !!favItem;
            return (
              <motion.div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="cursor-pointer p-4 transition-all duration-200 group sm:px-3"
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
                      if (!isInCart) dispatch(addToCart(product));
                      enqueueSnackbar(
                          t("addedToCart", { product: product?.title }),
                          snackbarConfig
                        );
                    }}
                    className="absolute top-2 right-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
                  >
                    {isInCart ? (
                      <FiCheck
                        onClick={(e) => {
                          e.stopPropagation(),
                          dispatch(deleteFromCart(product.id));
                          enqueueSnackbar(
                          t("deletedFromCart", { product: product?.title }),
                          snackbarConfig
                        );
                        }}
                        className="text-white bg-green-700 rounded-full w-7 h-7 p-1.5 shadow-lg stroke-[2.5]"
                      />
                    ) : (
                      <FiPlus className="text-white bg-[#776a5d] rounded-full w-7 h-7 p-1.5 shadow-lg stroke-[2.5]" />
                    )}
                  </div>
                 <div className="absolute bottom-0 left-0 px-3 bg-white/30 dark:bg-white/30 rounded-2xl py-1 text-xs font-medium text-gray-600 dark:text-white">
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
                  <span className="text-sm text-gray-500 dark:text-gray-300 ml-1">
                    ({product.rating})
                  </span>
                </div>

                {/* Title , fav */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2 line-clamp-2 h-14">
                    {product.title}
                  </h2>
                  {isInFav ? (
                    <FaHeart
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteFromWishList(product.id));
  enqueueSnackbar(
                          t("removedFromWishlist", { product: product?.title }),
                          snackbarConfig
                        );                      }}
                      className="cursor-pointer text-red-600 hover:text-red-700 transition-all duration-200 transform hover:scale-110 active:scale-95"
                    />
                  ) : (
                    <FiHeart
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToWishList(product));
                        enqueueSnackbar(`${product.title} ${t("added to Wishlist")}`, { variant: "default" });
                      }}
                      className="cursor-pointer text-gray-400 hover:text-red-500 transition-all duration-200 transform hover:scale-110 active:scale-95"
                    />
                  )}
                </div>

                {/* quantity */}
                {isInCart && (
                  <div className="mb-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(decreaseQuantity(product.id));
                      }}
                      className="cursor-pointer p-1 border border-gray-100 rounded hover:bg-gray-100 dark:hover:text-black disabled:opacity-50 "
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
                  <span className="text-sm text-gray-600 dark:text-gray-300 ">
                    {product.discountPercentage}% {t("off")}
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
