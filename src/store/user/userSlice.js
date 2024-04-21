import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: '',
        isLoading: false
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn =  action.payload.isLoggedIn
            state.current = action.payload.current
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn =  false
            state.current = null
            state.token = ''
        }
    },


})

export const {login, logout} = userSlice.actions
export default userSlice.reducer

export const selectCurentUser = (state) => state.user.current
export const selectCurentToken = (state) => state.user.token