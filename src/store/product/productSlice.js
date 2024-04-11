import { createSlice } from "@reduxjs/toolkit";
import * as action from './asynActionProduct';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: null,
        isLoading:false,
        errorMessage:''
    },
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(action.get4ProductParentCategories.pending, (state) => {  
            state.isLoading = true;
        });
        builder.addCase(action.get4ProductParentCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(action.get4ProductParentCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },

})

export const {} = productSlice.actions
export default productSlice.reducer