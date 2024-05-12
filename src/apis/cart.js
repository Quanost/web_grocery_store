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

export const apiClearCart = (userId) => axios({
    url: '/cart/clear?userId=' + userId,
    method: 'put',
})