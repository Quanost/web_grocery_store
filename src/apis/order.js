import axios from "../axios";

export const apiPayment = (data) => axios({
    url:'/payment',
    method:'post',
    data
})

export const apiGetOrderById = (orderId) => axios({
    url:'/order?id=' + orderId,
    method:'get',
})

export const apiUpdateOrderStatus = (data) => axios({
    url:'/order/status',
    method:'put',
    data
})
