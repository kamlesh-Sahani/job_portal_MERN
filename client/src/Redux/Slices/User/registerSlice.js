import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../Store';

//action 

export const fetchUserRegister = createAsyncThunk('fetchUserRegister', async (userData) => {
    try {
        const apiLink = `${BASE_URL}/api-v1/user/register`
        const response = await axios.post(apiLink, userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials:true
        }
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
})


// slice

const userRegisteSlice = createSlice({
    name: 'registerSlice',
    initialState: {
        isLoading: false,
        data: null,
        error: null
    },
    extraReducers: builder => {
        builder.addCase(fetchUserRegister.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchUserRegister.rejected, (state, action) => {
            state.error = action.error;
            state.data = null;
            state.isLoading = false;
        })
    }
})


export default userRegisteSlice.reducer;