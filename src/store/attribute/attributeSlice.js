import { createSlice } from "@reduxjs/toolkit";
import * as action from './asynActionAttribute';

export const AttributeSlice = createSlice({
    name: 'attribute',
    initialState: {
        attributes: null,
        isLoading:false,
        errorMessage:''
    },
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(action.getAttributeProductType.pending, (state) => {  
            state.isLoading = true;
        });
        builder.addCase(action.getAttributeProductType.fulfilled, (state, action) => {
            state.isLoading = false;
            state.attributes = action.payload;
        });
        builder.addCase(action.getAttributeProductType.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },

})

export const {} = AttributeSlice.actions
export default AttributeSlice.reducer