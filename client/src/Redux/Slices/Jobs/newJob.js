import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../Store';
/// action

export const fetchNewJob = createAsyncThunk('fetchNewJob',async(jobData)=>{
    try {
        const apiLink = `${BASE_URL}/api-v1/job/new`;
        const {data} = await axios.post(apiLink,jobData,{withCredentials:true});
        return data
    } catch (error) {
        return error.message;
    }
})



// slice

const newJob = createSlice({
    name:'newJob',
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchNewJob.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchNewJob.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchNewJob.rejected,(state,action)=>{
            state.error = action.error;
            state.data = null;
            state.isLoading = false;
        })
    }
})


export default newJob.reducer;