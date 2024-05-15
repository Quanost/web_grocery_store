import axios from "../axios";

export const apiLogin = (data) => axios({
    url:'/user/login',
    method:'post',
    data,
    noAuth:true
})

export const apiRegister = (data) => axios({
    url:'/user/register',
    method:'post',
    data,
    noAuth:true
})

export const apiVerifyCode = (data) => axios({
    url:'/user/verify-code',
    method:'post',
    data,
    noAuth:true
})

export const apiGetUsers = (params) => axios({
    url:'/user/users',
    method:'get',
    params
})

export const apiUpdateUser = (data) => axios({
    url:'/user',
    method:'put',
    data
})

export const apiDeleteUser = (id) => axios({
    url:'/user/'+ id,
    method:'delete',
})

export const apiUploadSingleImage = (image) => axios({
    url:'/upload/single/',
    method:'post',
    data:image,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const apiGetUserById = (userId) => axios({
    url:'/user?id=' + userId,
    method:'get',
    noAuth:true
})

