import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Redux/Slices/ProductsSlice"
import CartReducer from "../Redux/Slices/CartSlice"
import CategoryReducer from "../Redux/Slices/CategoriesSlice"
import productDetailsReducer from "../Redux/Slices/ProductDetailsSlice";


export const store = configureStore({
    reducer:{
        products:productsReducer,
        cart:CartReducer,
        category:CategoryReducer,
        productDetails:productDetailsReducer
    }

})
