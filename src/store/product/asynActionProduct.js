import { createAsyncThunk } from "@reduxjs/toolkit";
import { transformCategories } from '../../ultils/helper';
import * as apis from '../../apis'

export const get4ProductParentCategories = createAsyncThunk(
    'product/homeproducts',
    async(data, {rejectWithValue}) =>{
        try {
            const response = await apis.apiGet4ProductAllParentCategories()
            if(response.status === 200)
                return response.data
            else
                return rejectWithValue(response.error)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
   
})  
