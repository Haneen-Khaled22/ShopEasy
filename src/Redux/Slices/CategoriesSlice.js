import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories = createAsyncThunk('categorySlice/getAllCategories',async(_,{rejectWithValue})=>{
    
    try {
      const { data } = await axios.get(
      "https://dummyjson.com/products/categories"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
})





const categorySlice = createSlice({
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    name:"categorySlice",
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(getAllCategories.pending,(state,action)=>{
        state.loading=true,
        state.error=null
     }),
     builder.addCase(getAllCategories.fulfilled,(state,action)=>{
        state.loading=false
        state.data =  action.payload;
     }),
     builder.addCase(getAllCategories.rejected,(state,action)=>{
        state.loading = false
        state.error =  action.payload;
     })

    }
})

export const {} = categorySlice.actions;
export default categorySlice.reducer;