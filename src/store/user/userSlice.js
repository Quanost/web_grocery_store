import { createSlice } from "@reduxjs/toolkit";
import * as action from './asynActionUser';
import { toast } from 'react-toastify'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        refreshToken: null,
        isLoading: false,
        currentCart: null,
        userAddress: null,
       
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.current = action.payload.current
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken
            state.currentCart = action.payload.currentCart
            state.userAddress = action.payload.userAddress
            
        },
        updateToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.current = null
            state.token = ''
            state.refreshToken = null
            state.currentCart = null
            state.userAddress = null
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
        },
       
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
            state.userAddress = action.payload?.address;
        });
        builder.addCase(action.getUserCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.currentCart = null;
            state.userAddress = null;
        });
    },

})

export const { login, updateToken, logout, updateCart } = userSlice.actions
export default userSlice.reducer
