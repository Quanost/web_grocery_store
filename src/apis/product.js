import axios from "../axios";

export const apiGetAllProductByTypeId = (data) => axios({
    url:'/categories',
    method:'get',
    data
})

export const apiGet5ProductByTypeId = (data) => axios({
    url:'/categories',
    method:'get',
    data
})

export const apiGetProductById = (productId) => axios({
    url:'/product/'+ productId,
    method:'get',
})
