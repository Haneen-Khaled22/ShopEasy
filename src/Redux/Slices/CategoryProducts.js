import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getCategoryProducts = createAsyncThunk('getCategoryProducts/getCategoryProducts',async(slug,{ rejectWithValue })=>{
   
      try {
      const { data } = await axios.get(
      `https://dummyjson.com/products/category/${slug}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
});

const categoryProductsSlice = createSlice({
    initialState:{
        data:[],
        loading:false,
        error:null

    }
        
    ,
    name:"categoryProducts",
    reducers:{},
    extraReducers:(builder)=>{
        builder .addCase(getCategoryProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
              }),
        builder.addCase(getCategoryProducts.fulfilled,(state,action)=>{
           state.loading = false;
           state.data = action.payload.products;
        }),
         builder.addCase(getCategoryProducts.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
              })
    }
})

export const {} = categoryProductsSlice.actions;
export default categoryProductsSlice.reducer