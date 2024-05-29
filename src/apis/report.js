import axios from "../axios";

export const apiReport = (year) => axios({
    url: '/report?year=' + year,
    method: 'get',
})

export const apiReportRevenue   = (params) => axios({
    url:'/report/reportRevenue',
    method:'get',
    params:params
})