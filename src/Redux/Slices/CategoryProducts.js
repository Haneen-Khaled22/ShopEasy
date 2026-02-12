import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getCategoryProducts = createAsyncThunk('getCategoryProducts/getCategoryProducts',async(slug)=>{
    const {data} = await axios.get(`https://dummyjson.com/products/category/${slug}`);
    return data.products;
});

const categoryProductsSlice = createSlice({
    initialState:[],
    name:"categoryProducts",
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCategoryProducts.fulfilled,(state,action)=>{
            return action.payload;
        })
    }
})

export const {} = categoryProductsSlice.actions;
export default categoryProductsSlice.reducer