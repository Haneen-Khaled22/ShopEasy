import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../BreadCrumb/BreadCrumb';
import Breadcrumbs from '../BreadCrumb/BreadCrumb';
import FilterBar from '../FilterBar/FilterBar';






const Products = ({limit,showFilter = true,showBread = true}) => {

   const [products,setProducts] = useState([]);

  

    const  getAllProducts = async()=>{
        const {data} = await axios.get('https://dummyjson.com/products');
        console.log(data.products);
        setProducts(data.products)


    }
    useEffect(()=>{
        getAllProducts();

    },[])

    const displayedProducts = limit?
    products.slice(0,limit):products;


  return (
   <div className='max-w-7xl mx-auto'>
    {showBread && <Breadcrumb />}
   {showFilter && <FilterBar />}


  
    


  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
    {displayedProducts.map((product, index) => (
  <div
    key={product.id}
    className="rounded-2xl p-3 cursor-pointer animate-fadeInUp m-5"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <img
      src={product.images?.[0]}
      alt={product.title}
      className="w-full object-cover rounded-xl border border-gray-100 p-5"
    />

    {/* ⭐ Rating تحت الصورة */}
    {/* ⭐ Rating تحت الصورة */}
<div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
  {Array(Math.round(product.rating))
    .fill()
    .map((_, i) => (
      <span key={i}>⭐</span>
    ))}
</div>


    <h2 className="text-xl text-gray-700 mt-2 mb-2 line-clamp-1">
      {product.title.split(" ").slice(0, 2).join(" ")}
    </h2>

    {/* 📦 Stock قبل السعر */}
    <p className="text-sm text-gray-500 mb-1">
     {product.availabilityStatus} {product.stock}
    </p>

    <h2 className="text-xl text-red-900 mt-2 font-semibold">
      ${product.price}
    </h2>
  </div>
))}

  </div>
</div>



    
  )
}

export default Products