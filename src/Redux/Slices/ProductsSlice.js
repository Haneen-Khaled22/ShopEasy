import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getAllProducts = createAsyncThunk('productsSlice/getAllProducts',async(_,{ rejectWithValue })=>{
     try {
      const { data } = await axios.get(
        "https://dummyjson.com/products?limit=3000"
      );
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
   
})



const productsSlice = createSlice({
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    name:"productsSlice",
    reducers:{},
    extraReducers:(builder)=>{
         builder.addCase(getAllProducts.pending,(state,action)=>{
            state.loading = true,
            state.error = null
        }),
        builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.data =  action.payload;
        }),
         builder.addCase(getAllProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || "something went wrong";
        })
    }
})

export const {}  = productsSlice.actions;
export default productsSlice.reducer;