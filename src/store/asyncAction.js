import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../apis'

export const getCategories = createAsyncThunk(
    'app/categories',
    async(data, {rejectWithValue}) =>{
        try {
            const response = await apis.apiGetCategories()
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
   
})  
