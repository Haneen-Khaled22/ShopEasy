import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProductById = createAsyncThunk('productDetails/getProductById', async(id,{ rejectWithValue })=>{
   
      try {
      const { data } = await axios.get(
       `https://dummyjson.com/products/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
   
})


const productDetails = createSlice({
    initialState:{
           product: null,
    loading: false,
    error: null,
    },
    name:"productDetails",
    reducers:{},
    extraReducers:(builder)=>{
        builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export const {} = productDetails.actions;
export default productDetails.reducer;