import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductById } from '../../Redux/Slices/ProductDetailsSlice';
import { FiChevronDown, FiChevronUp, FiShoppingBag } from 'react-icons/fi';
import { addToCart } from '../../Redux/Slices/CartSlice';
import Breadcrumbs from '../BreadCrumb/BreadCrumb';

const ProductsDetails = () => {

    const {id} = useParams();
      const [showCharacteristics, setShowCharacteristics] = useState(true);
      const [showDescription, setShowDescription] = useState(true);
        const [showPayment, setShowPayment] = useState(false);
        const [showReturns, setShowReturns] = useState(false);
                const [showReviews, setShowReviews] = useState(false);

         const [mainImage, setMainImage] = useState(null);

     
    

    const productDetails = useSelector((state)=>state.productDetails);
    console.log(productDetails);

    const dispatch = useDispatch();

    useEffect(()=>{
   dispatch(getProductById(id));
    },[])
    useEffect(() => {
  if (productDetails?.images?.length) {
    setMainImage(productDetails.images[0]);
  }
}, [productDetails]);

  return (
     <div className="min-h-screen bg-white max-w-7xl mx-auto">
        <Breadcrumbs  customLabels={{
    [id]: productDetails?.title
  }}/>
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
                  {productDetails?.images?.slice(1).map((img, index) => (
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
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    {productDetails.category}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-3">
                     {productDetails.title}
                  </h1>
                  
                  
                  
                  <p className="text-2xl font-light text-gray-900">${productDetails.price}</p>
                </div>
    
                {/* Description Short */}
                <p className="text-gray-600 leading-relaxed">
                     {productDetails.description}
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
                  onClick={()=>dispatch(addToCart(productDetails))}
                  className="w-full bg-black text-white py-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wider cursor-pointer">
                    <FiShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>
                  <button className="cursor-pointer w-full border-2 border-black text-black py-4 rounded hover:bg-gray-50 transition-colors text-sm font-medium uppercase tracking-wider">
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
                      <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                        Characteristics
                      </span>
                      {showCharacteristics ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {showCharacteristics && (
                      <div className="pb-4 space-y-2 text-sm">
                       {productDetails.brand&& <div className="flex justify-between">
                          <span className="text-gray-600">Brand</span>
                          <span className="text-gray-900">{productDetails.brand}</span>
                        </div>}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stock</span>
                          <span className="text-gray-900">{productDetails.stock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating</span>
                          <span className="text-gray-900">{productDetails.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
    
                  {/* Description */}
                  <div>
                    <button
                      onClick={() => setShowDescription(!showDescription)}
                      className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-900 uppercase tracking-wider ">
                       DESCRIPTION
                      </span>
                      {showDescription ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {showDescription && (
                      <div className="pb-4 text-sm text-gray-600 leading-relaxed space-y-3">
                        <p>
                            {productDetails.description}
                        </p>
                        
                      </div>
                    )}
                  </div>
    
                  {/* Payment & Delivery */}
                  <div>
                    <button
                      onClick={() => setShowPayment(!showPayment)}
                      className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-900 uppercase tracking-wider ">
                        Payment & Delivery
                      </span>
                      {showPayment ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {showPayment && (
                      <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                        <p>We accept all major credit cards and secure payment methods. Free delivery on orders over $100.</p>
                      </div>
                    )}
                  </div>
    
                  {/* Returns */}
                  <div>
                    <button
                      onClick={() => setShowReturns(!showReturns)}
                      className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-900 uppercase tracking-wider ">
                        Returns
                      </span>
                      {showReturns ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {showReturns && (
                      <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                        <p>{productDetails.returnPolicy}. Items must be unused and in original packaging.</p>
                      </div>
                    )}
                  </div>
                  {/* reviews */}
                   <div>
                    <button
                      onClick={() => setShowReviews(!showReviews)}
                      className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-900 uppercase tracking-wider ">
                        Reviews
                      </span>
                      {showReviews ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {showReviews && (
                      <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                        {productDetails?.reviews?.map((review)=>
                        (
                       <div className="bg-gray-50 rounded-xl p-4 mb-4">
  <div className="flex items-center justify-between mb-2">
    <p className="font-medium text-gray-900">
      {review.reviewerName}
    </p>

    {/* Rating */}
    <div className="flex items-center gap-1">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < Math.round(review.rating)
                ? "text-yellow-400"
                : "text-gray-300"
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
)
                       

                        )}
                       
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ProductsDetails