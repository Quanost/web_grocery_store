import axios from "../axios";

export const apiGetAllProductByTypeId = (data) => axios({
    url:'/categories',
    method:'get',
    data
})

export const apiGet5ProductByTypeId = (productId) => axios({
    url:'/product?page=1&limit=4&parent_category_id='+productId,
    method:'get'
})

export const apiGetProductById = (productId) => axios({
    url:'/product/'+ productId,
    method:'get',
})
