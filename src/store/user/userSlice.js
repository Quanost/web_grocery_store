import { createSlice } from "@reduxjs/toolkit";
import * as action from './asynActionUser';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        currentCart: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.current = action.payload.current
            state.token = action.payload.token
            state.currentCart = action.payload.currentCart
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.current = null
            state.token = ''
        },
        updateCart: (state, action) => {
            const { cartItemsId, variantId, quantity } = action.payload
            const updateCart = JSON.parse(JSON.stringify(state?.currentCart || {}));
            const updateCartItem = updateCart?.cartItem?.map(item => {
                if(item.id === cartItemsId) {
                    return {...item, quantity: quantity}
                } else return item
            })
            state.currentCart = {...updateCart, cartItem: updateCartItem}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(action.getUserCurrent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(action.getUserCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true;
            state.currentCart = action.payload?.cart;
        });
        builder.addCase(action.getUserCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.currentCart = null;
        });
    },

})

export const { login, logout, updateCart } = userSlice.actions
export default userSlice.reducer

export const selectCurentUser = (state) => state.user.current
export const selectCurentToken = (state) => state.user.token