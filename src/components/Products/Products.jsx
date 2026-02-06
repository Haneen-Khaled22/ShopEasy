import axios from 'axios'
import React, { useEffect, useState } from 'react'






const Products = ({limit}) => {

   const [products,setProducts] = useState([]);

  

    const  getAllProducts =async()=>{
        const {data} = await axios.get('https://api.escuelajs.co/api/v1/products');
        console.log(data);
        setProducts(data)


    }
    useEffect(()=>{
        getAllProducts();

    },[])

    const displayedProducts = limit?
    products.slice(0,limit):products;


  return (
   <div className='max-w-7xl mx-auto mt-8'>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-12">
    {displayedProducts.map((product, index) => (
      <div
        key={product.id}
        className="rounded-2xl p-3 cursor-pointer animate-fadeInUp"
        style={{ animationDelay: `${index * 0.1}s` }} // كل كارد يظهر بعد التاني
      >
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full object-cover rounded-xl"
        />

        <h2 className="text-xl text-gray-700 mt-2 mb-2">
          {product.title.split(" ").slice(0, 3).join(" ")} ...
        </h2>

        <h2 className='text-xl text-gray-800 font-semibold'>${product.price}</h2>
      </div>
    ))}
  </div>
</div>

    
  )
}

export default Products