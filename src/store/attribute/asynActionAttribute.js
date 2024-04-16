import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getAttributeProductType = createAsyncThunk(
    'attribute/attributeFilter',
    async(data, {rejectWithValue}) =>{
        try {
            const response = await apis.apiGetAllAttributeProductType()
            if(response.status === 200)
                return response.data
            else
                return rejectWithValue(response.error)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
   
})  
