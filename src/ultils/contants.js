import icons from "./icons"
import path from "./path"

export const navigation = [
    {
        id: 1,
        value: 'Sản phầm khuyến mãi',
        path: `/${path.KHUYEN_MAI}`
    },
    {
        id: 2,
        value: 'Thit - Hải sản tươi',
        path: `/${path.THIT_HAISAN}`
    },
    {
        id: 3,
        value: 'Rau - Củ - Trái cây',
        path: `/${path.RAU_CU_TRAICAY}`
    },
    {
        id: 4,
        value: 'Chăm sóc cá nhân',
        path: `/${path.CHAM_SOC_CA_NHAN}`
    },
    {
        id: 5,
        value: 'Sửa các loại',
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

const { FaRegUser, IoSettingsOutline, CiLogout, LuLayoutDashboard, TbBrandProducthunt, FaBorderNone, FaUsersCog, TbCategory2 } = icons
export const AdminSidebarMenus = [
    { title: 'Thống kê', icon: <LuLayoutDashboard />, path: `/${path.ADMIN}/${path.DASHBOARD}` },

    {
        title: 'Quản lý sản phẩm',
        submenu: true,
        submenuItems: [
            { title: 'Danh sách sản phẩm', path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}` },
            { title: 'Thêm sản phẩm', path: `/${path.ADMIN}/${path.CREATE_PRODUCT}` },
        ],
        icon: <TbBrandProducthunt />
    },
    {
        title: 'Quản lý đơn hàng',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <FaBorderNone />
    },
    {
        title: 'Quản lý người dùng',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <FaUsersCog />
    },
    {
        title: 'Quản lý loại sản phẩm',
        path: `/${path.ADMIN}/${path.MANAGE_CATEGORY}`,
        icon: <TbCategory2 />
    },
]
export const AdminSidebarMenusDefault = [
    { title: 'Tài khoản', spacing: true, icon: <FaRegUser /> },
    { title: 'Cài đặt', icon: <IoSettingsOutline /> },
    { title: 'Đăng xuất', icon: <CiLogout /> },
]


export const userRoles = [
    { value: 'CUSTOMER', label: 'Khách hàng' },
    { value: 'STAFF', label: 'Nhân viên' },
    { value: 'MANAGER', label: 'Quản lý' },
]
export const userStatus = [
    { value: true, label: 'Đã khoá' },
    { value: false, label: 'Hoạt động' },
]

export const orderStatus = [
    { value: 'PENDING', label: 'Chờ xác nhận' },
    { value: 'PROCESSING', label: 'Chuẩn bị hàng' },
    { value: 'WAITING_PICKUP', label: 'Chờ lấy hàng' },
    { value: 'SHIPPING', label: 'Đang giao hàng' },
    { value: 'CANCELLED', label: 'Huỷ giao hàng' },
    { value: 'SUCCESS', label: 'Hoàn thành đơn hàng' },
    { value: 'RETURN_RECEIVED', label: 'Đã trả hàng' },
]

export const filterOptionsByOrderStatus = (currentStatus) => {
    switch (currentStatus) {
        case 'PENDING':
            return [
                { value: 'CANCELLED', label: 'Huỷ đơn hàng' },
                { value: 'PROCESSING', label: 'Chuẩn bị hàng' }
            ];
        case 'PROCESSING':
            return [
                { value: 'CANCELLED', label: 'Huỷ đơn hàng' },
                { value: 'WAITING_PICKUP', label: 'Chờ lấy hàng' }
            ];
        case 'WAITING_PICKUP':
            return [
                { value: 'CANCELLED', label: 'Huỷ đơn hàng' },
                { value: 'SHIPPING', label: 'Đang giao hàng' }
            ];
        case 'SHIPPING':
            return [
                { value: 'SUCCESS', label: 'Hoàn thành đơn hàng' },
                { value: 'RETURN_RECEIVED', label: 'Đã trả hàng' }
            ];
        default:
            return [];
    }
};

export const paymentType = [
    { value: 'CASH', label: 'Tiền mặt khi nhận hàng' },
    { value: 'VNPAY', label: 'VNPAY' },
]

export const paymentStatus = [
    { value: 'INIT', label: 'Chưa thanh toán' },
    { value: 'SUCCESS', label: 'Đã thanh toán' },
    { value: 'FAIL', label: 'Thanh toán thất bại' },
]

export const noteDelivery = [
    { code: 'KHONGCHOXEMHANG', name: 'Không cho xem hàng' },
    { code: 'CHOTHUHANG', name: 'Cho xem và được thử hàng' },
    { code: 'CHOXEMHANGKHONGTHU', name: 'Cho xem và không thử hàng' },
]

export const addressStore = "463, Đường Số 10, Phường 8, Quận Gò Vấp, Phường 9, Gò Vấp, Thành phố Hồ Chí Minh"