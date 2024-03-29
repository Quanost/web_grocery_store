import axios from "../axios";

export const apiGetCategories = () => axios({
    url:'/categories',
    method:'get'
})
