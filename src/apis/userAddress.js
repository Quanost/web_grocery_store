import axios from "../axios";

export const apiAddUserAddress = (data) => axios({
    url:'/userAddress',
    method:'post',
    data
})

export const apiUpdateUserAddress = (data) => axios({
    url:'/userAddress',
    method:'put',
    data
})

export const apiDeleteUserAddress= (id) => axios({
    url:'/userAddress?id='+ id,
    method:'delete',
})
