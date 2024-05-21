import { createAsyncThunk } from "@reduxjs/toolkit";
import { transformCategories } from '../../ultils/helper';
import * as apis from '../../apis'

export const getCategories = createAsyncThunk(
    'app/categories',
    async(data, {rejectWithValue}) =>{
        try {
            const response = await apis.apiGetCategories()
            const categoriesTransForm = transformCategories(response.data);
            console.log('categoriesTransForm', categoriesTransForm)
            return categoriesTransForm
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
   
})  
