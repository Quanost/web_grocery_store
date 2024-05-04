import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getUserCurrent = createAsyncThunk(
    'user/current',
    async(data, {rejectWithValue}) =>{
        try {
            const response = await apis.apiGetUserById(data)
            if(response.status === 200)
                return response?.data
            else
                return rejectWithValue(response?.error)
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
   
})  
