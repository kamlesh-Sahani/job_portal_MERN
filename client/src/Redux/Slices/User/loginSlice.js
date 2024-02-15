import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios  from "axios";
import { BASE_URL } from "../../Store";
//action

export const fetchLoginUser = createAsyncThunk('fetchLoginUser',async(userData)=>{
    try {
        const apiLink = `${BASE_URL}/api-v1/user/login`;

        const config = {
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            mode:'cors',
            credentials:'include',
            withCredentials:true
        }


        const {data} = await axios.post(apiLink,userData,config);
        return data;
    } catch (error) {
        return error.message;
    }
})


/// sclice 
const userLoginSlice = createSlice({
    name:'userLogin',
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchLoginUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchLoginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchLoginUser.rejected,(state,action)=>{
            state.error = action.error;
            state.data = null;
            state.isLoading = false;
        })
    }
})


export default userLoginSlice.reducer;