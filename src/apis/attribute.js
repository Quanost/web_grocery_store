import axios from "../axios";

export const apiGetAllAttributeProductType = () => axios({
    url:'/attribute/attributeFilter',
    method:'get',
})
