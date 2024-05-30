const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'dang-nhap',
    REGISTER: 'dang-ky',
    PRODUCT_TYPE: ':namecategory/:categoryId',
    PRODUCT_DETAIL__CNAME__PID__TITLE: ':category/:categoryId/:title/:pid',
    SEARCHPRODUCT: 'search',


    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCT: 'manage-product',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',
    MANAGE_CATEGORY: 'manage-category',
    REPORT_REVENUE: 'revenue-statistics',
    REPORT_INVENTORY: 'inventory-statistics',
    QUESTTION: 'question',

    //Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    PURCHASE_HISTORY: 'purchase-history',
    CART: 'cart',
    CHECKOUT: 'checkout',
    ORDER_DETAIL: 'order-detail',
    ORDER_DETAIL__ID: 'order-detail/:orderId',
    DELIVERY_ADDRESS: 'address',
}
export default path