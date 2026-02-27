import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const loginUser = createAsyncThunk('authSlice/loginUser',async(formData,{ rejectWithValue })=>{
     try {
      const response = await axios.post
       ('https://dummyjson.com/auth/login',formData)
      ;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
   
});

export const registerUser = createAsyncThunk('authSlice/registerUser',async(formData,{ rejectWithValue })=>{
     try {
      const response = await axios.post
       ('https://dummyjson.com/users/add',formData)
      ;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
   
})



const authSlice = createSlice({
    initialState:{
         user:null,
         token:null,
        loading:false,
        error:null
    },
    name:"authSlice",
    reducers:{
        logout:(state)=>{
            state.user = null,
            state.token = null,
            localStorage.removeItem('token');
        }
    },
    extraReducers:(builder)=>{
        //login
         builder.addCase(loginUser.pending,(state,action)=>{
            state.loading = true,
            state.error = null
        }),
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.user,
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token);
        }),
         builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || "something went wrong";
        });
        
        //register
        
    builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // مفيش token هنا
        // لو عايزة token اعملي login بعد التسجيل
    });
    builder.addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
    });
    }
})

export const {logout}  = authSlice.actions;
export default authSlice.reducer;