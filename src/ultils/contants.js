import path from "./path"

export const navigation = [
    {
        id: 1,
        value:'Sản phầm khuyến mãi',
        path: `/${path.KHUYEN_MAI}`
    },
    {
        id: 2,
        value:'Thit - Hải sản tươi',
        path: `/${path.THIT_HAISAN}`
    },
    {
        id: 3,
        value:'Rau - Củ - Trái cây',
        path: `/${path.RAU_CU_TRAICAY}`
    },
    {
        id: 4,
        value:'Chăm sóc cá nhân',
        path: `/${path.CHAM_SOC_CA_NHAN}`
    },
    {
        id: 5,
        value:'Sửa các loại',
        path: `/${path.SUA_CAC_LOAI}`
    }
]

export const sorts = [
    {
        id: 1,
        value: 'onsale',
        text: 'Sản phẩm giảm giá'
    },
    {
        id: 2,
        value: '-price',
        text: 'Giá tăng dần'
    },
    {
        id: 3,
        value: 'price',
        text: 'Giá giảm dần'
    },
    {
        id: 4,
        value: 'lastproduct',
        text: 'Sản phẩm mới nhất'
    },
]

export const filter = [
    {cagory: 'Dầu ăn', value: ['Loại sản phẩm']},
]