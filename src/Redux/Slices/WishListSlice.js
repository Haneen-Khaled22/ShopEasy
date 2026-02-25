import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishListSlice = createSlice({
  initialState: initialState,
  name: "wishListSlice",
  reducers: {
    addToWishList: (state, action) => {
    const product = action.payload;

      const existing = state.find((item) => item.id === product.id);

      if (!existing) {
        state.push(product);
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
  
    deleteFromWishList: (state, action) => {
      const updated = state.filter((product) => product.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    },
    clearWishList: (state, action) => {
      localStorage.removeItem("wishlist");

      return [];
    },
  },
 
});

export const { addToWishList,deleteFromWishList,clearWishList
 } = wishListSlice.actions;
export default wishListSlice.reducer;
