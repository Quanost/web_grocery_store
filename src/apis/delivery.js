import axios from 'axios';

export const apiCreateDelivery = (data) => {
    return axios({
        url: 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create',
        method: 'post',
        data,
        headers: {
            ShopId: '5064031',
            token: 'e17d4669-1108-11ef-9784-7aa329317c2b'
        }
    });
};

export const apiGetTokenPrintDelivery = (data) => {
    return axios({
        url: 'https://online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token',
        method: 'post',
        data,
        headers: {
            Token: 'e17d4669-1108-11ef-9784-7aa329317c2b'
        }
    });
};

export const apiGetDeliveryOrder= (data) => {
    return axios({
        url: 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
        method: 'post',
        data,
        headers: {
            Token: 'e17d4669-1108-11ef-9784-7aa329317c2b'
        }
    });
};


export const apiPrintDeliveryOrder = "https://online-gateway.ghn.vn/a5/public-api/printA5?token="