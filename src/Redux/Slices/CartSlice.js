import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  initialState: initialState,
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          return state.filter((item) => item.id !== action.payload);
        }
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    deleteFromCart: (state, action) => {
      const updated = state.filter((product) => product.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    },
    clearCart: (state, action) => {
      localStorage.removeItem("cart");

      return [];
    },
  },
 
});

export const { addToCart, deleteFromCart, clearCart , increaseQuantity,
  decreaseQuantity,
 } = cartSlice.actions;
export default cartSlice.reducer;
