import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../Store';
/// action

export const fetchAllJobs = createAsyncThunk('fetchAllJobs',async(queryObejct)=>{
    try {

        // Convert arrays to comma-separated strings for multiple values
    const formattedQueryParams = Object.entries(queryObejct)
    .map(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        return `${key}=${value.join(',')}`;
      }
      return `${key}=${value}`;
    })
    .join('&');
        const apiLink = `${BASE_URL}/api-v1/job/all?${formattedQueryParams}`;
        const {data} = await axios.get(apiLink,{withCredentials:true});
        return data
    } catch (error) {
        return error.message;
    }
})



// slice

const allJobs = createSlice({
    name:'allJobs',
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchAllJobs.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchAllJobs.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchAllJobs.rejected,(state,action)=>{
            state.error = action.error;
            state.data = null;
            state.isLoading = false;
        })
    }
})


export default allJobs.reducer;