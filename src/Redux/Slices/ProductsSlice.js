import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getAllProducts = createAsyncThunk('productsSlice/getAllProducts',async()=>{
    const {data} = await axios.get('https://dummyjson.com/products');
    return data.products;
})



const productsSlice = createSlice({
    initialState:[],
    name:"productsSlice",
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            return action.payload;
        })
    }
})

export const {}  = productsSlice.actions;
export default productsSlice.reducer;