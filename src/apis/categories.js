import axios from "../axios";

export const apiGetSubCategory = (id) => axios({
    url:'/categories/subcategories?id='+id,
    method:'get',
})
