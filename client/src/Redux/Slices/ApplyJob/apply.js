import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../Store';
/// action

export const fetchApplyJob = createAsyncThunk('fetchApplyJob',async(applyData)=>{
    try {
        const apiLink =`${BASE_URL}/api-v1/apply/${applyData.id}`
        const {data} = await axios.post(apiLink,applyData,{withCredentials:true});
        return data
    } catch (error) {
        throw error.message;
    }
})



// slice

const applyJob = createSlice({
    name:'applyJob',
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchApplyJob.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchApplyJob.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchApplyJob.rejected,(state,action)=>{
            state.error = action.error;
            state.data = null;
            state.isLoading = false;
        })
    }
})


export default applyJob.reducer;