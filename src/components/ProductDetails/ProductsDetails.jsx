import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../Redux/Slices/ProductDetailsSlice";
import { FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";
import { addToCart, increaseQuantity } from "../../Redux/Slices/CartSlice";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import { useSnackbar } from "notistack";

const ProductsDetails = () => {
  const { id } = useParams();
  const [showCharacteristics, setShowCharacteristics] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showReturns, setShowReturns] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const [mainImage, setMainImage] = useState(null);

  const cart = useSelector((state)=>state.cart);

  const { enqueueSnackbar } = useSnackbar();

  const {product,loading,error} = useSelector((state) => state.productDetails);
  console.log(product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);
  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);

    useEffect(() => {
        if (error) {
          enqueueSnackbar(error, { variant: "error" });
        }
      }, [error]);
    
  return (
    <div className="min-h-screen bg-white dark:bg-black   max-w-7xl mx-auto">
      <Breadcrumbs
        customLabels={{
          [id]: product?.title,
        }}
      />
       {loading && (
       
       <div className="flex justify-center items-center py-24 min-h-screen">
          <span className="loader"></span>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg overflow-hidden aspect-square">
              <img
                src={mainImage}
                alt="Ashes of Moonlight Perfume"
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {product?.images?.slice(1).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg overflow-hidden aspect-square hover:ring-2 hover:ring-amber-400 transition-all"
                >
                  <img
                    src={img}
                    alt={`Product view ${index + 2}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300  uppercase tracking-wider mb-2">
                {product?.category}
              </p>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-300  mb-3">
                {product?.title}
              </h1>

              <p className="text-2xl font-light text-gray-900 dark:text-gray-300 ">
                ${product?.price}
              </p>
            </div>

            {/* Description Short */}
            <p className="text-gray-600 dark:text-gray-300  leading-relaxed">
              {product?.description}
            </p>

            {/* Volume Selection */}
            {/* <div>
                  <p className="text-sm font-medium text-gray-900 mb-3">VOLUME:</p>
                  <div className="flex gap-3">
                    {['100 ml', '70 ml', '50 ml'].map((volume) => (
                      <button
                        key={volume}
                        onClick={() => setSelectedVolume(volume)}
                        className={`px-6 py-2 rounded border transition-all ${
                          selectedVolume === volume
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-900'
                        }`}
                      >
                        {volume}
                      </button>
                    ))}
                  </div>
                </div> */}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
               const isInCart = cart.some(item => item.id === product.id);

                
                  if(!isInCart){
                    dispatch(addToCart(product));
                    enqueueSnackbar(`${product.title} added to cart`, {
                    variant: "default",
                    sx: {
                      backgroundColor: "#776a5d", // لون الخلفية
                      color: "#fff", // لون النص
                      fontWeight: "bold",
                    },
                    anchorOrigin: { vertical: "top", horizontal: "left" },
                    autoHideDuration: 2500,
                  });

                  }else{
                    dispatch(increaseQuantity(product.id));
                    enqueueSnackbar(`${product.title} is already in Cart`, {
                    variant: "default",
                    sx: {
                      backgroundColor: "#776a5d", // لون الخلفية
                      color: "#fff", // لون النص
                      fontWeight: "bold",
                    },
                    anchorOrigin: { vertical: "top", horizontal: "left" },
                    autoHideDuration: 2500,
                  });
                  }
                  
                }}
                className="w-full bg-black dark:bg-[#776a5d] text-white py-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wider cursor-pointer"
              >
                <FiShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
              <button className="cursor-pointer w-full border-2 border-black dark:border-white text-black dark:text-white py-4 rounded hover:bg-gray-50 transition-colors text-sm font-medium uppercase tracking-wider">
                Buy Now
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="border-t border-gray-200 divide-y divide-gray-200">
              {/* Characteristics */}
              <div>
                <button
                  onClick={() => setShowCharacteristics(!showCharacteristics)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100  uppercase tracking-wider">
                    Characteristics
                  </span>
                  {showCharacteristics ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  )}
                </button>
                {showCharacteristics && (
                  <div className="pb-4 space-y-2 text-sm">
                    {product?.brand && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300 ">Brand</span>
                        <span className="text-gray-900 dark:text-gray-300 ">
                          {product.brand}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300 ">Stock</span>
                      <span className="text-gray-900 dark:text-gray-300 ">
                        {product?.stock}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300 ">Rating</span>
                      <span className="text-gray-900 dark:text-gray-300 ">
                        {product?.rating}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer "
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100  uppercase tracking-wider ">
                    DESCRIPTION
                  </span>
                  {showDescription ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  )}
                </button>
                {showDescription && (
                  <div className="pb-4 text-sm text-gray-600 dark:text-gray-300  leading-relaxed space-y-3">
                    <p>{product?.description}</p>
                  </div>
                )}
              </div>

              {/* Payment & Delivery */}
              <div>
                <button
                  onClick={() => setShowPayment(!showPayment)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100  uppercase tracking-wider ">
                    Payment & Delivery
                  </span>
                  {showPayment ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  )}
                </button>
                {showPayment && (
                  <div className="pb-4 text-sm text-gray-600 dark:text-gray-300  leading-relaxed">
                    <p>
                      We accept all major credit cards and secure payment
                      methods. Free delivery on orders over $100.
                    </p>
                  </div>
                )}
              </div>

              {/* Returns */}
              <div>
                <button
                  onClick={() => setShowReturns(!showReturns)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100  uppercase tracking-wider ">
                    Returns
                  </span>
                  {showReturns ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  )}
                </button>
                {showReturns && (
                  <div className="pb-4 text-sm text-gray-600 dark:text-gray-300  leading-relaxed">
                    <p>
                      {product?.returnPolicy}. Items must be unused and in
                      original packaging.
                    </p>
                  </div>
                )}
              </div>
              {/* reviews */}
              <div>
                <button
                  onClick={() => setShowReviews(!showReviews)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100  uppercase tracking-wider ">
                    Reviews
                  </span>
                  {showReviews ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300 " />
                  )}
                </button>
                {showReviews && (
                  <div className="pb-4 text-sm text-gray-600 dark:text-gray-300  leading-relaxed">
                    {product?.reviews?.map((review) => (
                      <div
                      key={review.rating}
                      className="bg-gray-50 dark:bg-gray-200 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-900  ">
                            {review?.reviewerName}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${
                                    i < Math.round(review?.rating)
                                      ? "text-yellow-500 "
                                      : "text-gray-300 dark:text-gray-400"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                          </div>
                        </div>

                        {/* Numeric rating */}
                        <p className="text-xs text-gray-500 mb-2">
                          {review.rating}/5
                        </p>

                        {/* Comment */}
                        <p className="text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
