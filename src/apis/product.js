import axios from "../axios";

export const apiGetAllProduct = (params) => axios({
    url:'/product?limit=15',
    method:'get',
    params:params
})

export const apiGet5ProductByTypeId = (productId) => axios({
    url:'/product?page=1&limit=4&parent_category_id='+productId,
    method:'get'
})

export const apiGetProductById = (productId) => axios({
    url:'/product/'+ productId,
    method:'get',
})

export const apiGetProductSame = (categoryId) => axios({
    url:'/product?page=1&limit=6&category_id='+ categoryId,
    method:'get',
})

export const apiGet4ProductAllParentCategories = () => axios({
    url:'/product/get4ProductParentCategories',
    method:'get',
})
