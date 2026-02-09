import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories = createAsyncThunk('categorySlice/getAllCategories',async()=>{
    const {data} = await axios.get("https://dummyjson.com/products/categories");
    console.log(data)
    return data; 
})





const categorySlice = createSlice({
    initialState:[],
    name:"categorySlice",
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(getAllCategories.fulfilled,(state,action)=>{
        return action.payload;
     })
    }
})

export const {} = categorySlice.actions;
export default categorySlice.reducer;