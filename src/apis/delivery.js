import axios from 'axios';

export const apiCreateDelivery = (data) => {
    return axios({
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create',
        method: 'post',
        data,
        headers: {
            ShopId: '192264',
            token: '075840d3-0f32-11ef-8bfa-8a2dda8ec551'
        }
    });
};

export const apiGetTokenPrintDelivery = (data) => {
    return axios({
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token',
        method: 'post',
        data,
        headers: {
            Token: '075840d3-0f32-11ef-8bfa-8a2dda8ec551'
        }
    });
};

export const apiGetDeliveryOrder= (data) => {
    return axios({
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
        method: 'post',
        data,
        headers: {
            Token: '075840d3-0f32-11ef-8bfa-8a2dda8ec551'
        }
    });
};


export const apiPrintDeliveryOrder = "https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token="