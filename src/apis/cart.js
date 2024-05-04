import axios from "../axios";

export const apiUpdateCart = (data) => axios({
    url: '/cart',
    method: 'put',
    data
})

export const apiRemoveCartItems = (id) => axios({
    url: '/cart/' + id,
    method: 'delete',
})