import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../Store';
//action

export const fetchLogoutUser = createAsyncThunk('fetchLogoutUser',async()=>{
    try {
        const apiLink= `${BASE_URL}/api-v1/user/logout`;
        const {data} = await axios.get(apiLink,{ withCredentials:true});
        return data;
    } catch (error) {
        return error.message;
    }
})


// slice

const logoutUserSlice =createSlice({
    name:"logoutUser",
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchLogoutUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchLogoutUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchLogoutUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.data=null;
            state.error = action.error;
        })
    }
})


export default logoutUserSlice.reducer;