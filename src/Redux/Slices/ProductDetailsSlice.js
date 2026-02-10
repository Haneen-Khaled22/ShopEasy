import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProductById = createAsyncThunk('productDetails/getProductById', async(id)=>{
    const {data} = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;
})


const productDetails = createSlice({
    initialState:{},
    name:"productDetails",
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProductById.fulfilled,(state,action)=>{
            return action.payload
        })
    }
})

export const {} = productDetails.actions;
export default productDetails.reducer;