import axios from "../axios";

export const apiGetSubCategory = (id) => axios({
    url:'/categories/subcategories?id='+id,
    method:'get',
})

export const apiGetAllCategory = (params) => axios({
    url:'/categories/seachcategories',
    method:'get',
    params
})

export const apiAddCategory = (data) => axios({
    url:'/categories',
    method:'post',
    data
})

export const apiUpdateCategory = (data) => axios({
    url:'/categories',
    method:'put',
    data
})

export const apiDeleteCategory = (id) => axios({
    url:'/categories?id='+ id,
    method:'delete',
})
