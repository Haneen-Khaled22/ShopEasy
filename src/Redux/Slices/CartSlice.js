import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    initialState:[],
    name:"cartSlice",
    reducers:{
         addToCart:(state,action)=>{
            state.push(action.payload);
           
        },
        deleteFromCart:(state,action)=>{
        return  state.filter((product)=>product.id!==action.payload)
        },
        clearCart:(state,action)=>{
            return [];
        }
    },
    extraReducers:(builder)=>{}
})

export const {addToCart,deleteFromCart,clearCart} =cartSlice.actions;
export default cartSlice.reducer;