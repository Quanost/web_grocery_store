const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'dang-nhap',
    REGISTER: 'dang-ky',
    PRODUCT_TYPE: ':namecategory/:categoryId',
    PRODUCT_DETAIL__CNAME__PID__TITLE: ':category/:categoryId/:title/:pid',
    CART: 'gio-hang',


    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCT: 'manage-product',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',

    //Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    PURCHASE_HISTORY: 'purchase-history',
}
export default path