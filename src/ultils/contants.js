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
            { title: 'Cập nhật sản phẩm', path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}` },
            { title: 'Thêm sản phẩm', path: `/${path.ADMIN}/${path.CREATE_PRODUCT}` },
        ],
        icon: <TbBrandProducthunt />
    },
    {
        title: 'Quản lý hoá đơn',
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
    {value: 'CUSTOMER', label: 'Khách hàng'},
    {value: 'STAFF', label: 'Nhân viên'},
    {value: 'MANAGER', label: 'Quản lý'},
]
export const userStatus = [
    {value: true , label: 'Đã khoá'},
    {value: false , label: 'Hoạt động'},
]

export const orderStatus = [
    {value: 'PENDING', label: 'Chờ xác nhận'},
    {value: 'PROCESSING', label: 'Đã xác nhận'},
    {value: 'SHIPPED', label: 'Đang giao hàng'},
    {value: 'DELIVERED', label: 'Đã nhận hàng'},
    {value: 'CANCELLED', label: 'Huỷ giao hàng'},
    {value: 'SUCCESS', label: 'Đơn hàng đã hoàn thành'},
]

export const paymentType = [
    {value: 'CASH', label: 'Tiền mặt khi nhận hàng'},
    {value: 'VNPAY', label: 'VNPAY'},
]