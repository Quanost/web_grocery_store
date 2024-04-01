import axios from "../axios";

export const apiLogin = (data) => axios({
    url:'/user/login',
    method:'post',
    data
})

export const apiRegister = (data) => axios({
    url:'/user/register',
    method:'post',
    data
})

export const apiVerifyCode = (data) => axios({
    url:'/user/verify-code',
    method:'post',
    data
})