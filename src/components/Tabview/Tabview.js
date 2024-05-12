import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { TableDataOrder } from '../../components'
import icon from '../../ultils/icons'
import path from '../../ultils/path';
import { apiUpdateOrderStatus } from '../../apis';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const Tabview = ({ dataTable, errorGetAPI, navigate, getOrders }) => {
    const { FaRegEye, MdOutlineVerified, MdCancelPresentation, CiDeliveryTruck, FaRegStar, IoMdTime, GiReturnArrow } = icon

    const updateOrderStatus = async (id, status) => {
        const response = await apiUpdateOrderStatus({ orderId: id, status });
        if (response?.status === 200) {
            getOrders();
            toast.success('Cập nhật trạng thái thành công');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Cập nhật trạng thái thất bại',
            });
        }
    }
    const handleClickUpdateOrderStatus = async (type, e, id, status) => {
        switch (type) {
            case 'WATCH_DETAIL':
                e.preventDefault()
                navigate(`/${path.ADMIN}/${path.ORDER_DETAIL}/${id}`)
                break;
            case 'PROCESSING':
                await updateOrderStatus(id, 'PROCESSING');
                break;
            case 'WAITING_PICKUP':
                await updateOrderStatus(id, 'WAITING_PICKUP');
                break;
            case 'SHIPPING':
                await updateOrderStatus(id, 'SHIPPING');
                break;
            case 'SUCCESS':
                await updateOrderStatus(id, 'SUCCESS');
                break;
            case 'RETURN_RECEIVED':
                await updateOrderStatus(id, 'RETURN_RECEIVED');
                break;
            case 'CANCELLED':
                try {
                    const response = await apiUpdateOrderStatus({ orderId: id, status: 'CANCELLED' })
                    if (response?.status === 200) {
                        getOrders()
                        toast.success('Huỷ đơn hàng thành công')
                    } else
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Huỷ đơn hàng thất bại',
                        })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Huỷ đơn hàng thất bại',
                    })
                }
                break;

            default:
                alert('Hành động không hợp lệ')
                break;
        }
    }
    const handleClickCancelOrder = async (e, orderId, statusOrder) => {
        try {
            const response = await apiUpdateOrderStatus({ orderId, status: 'CANCELLED' })
            if (response?.status === 200) {
                getOrders()
                toast.success('Huỷ đơn hàng thành công')
            } else
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Huỷ đơn hàng thất bại',
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Huỷ đơn hàng thất bại',
            })
        }
    }
    const datatableFilter = {
        All: dataTable,
        PENDING: dataTable.filter(item => item.status === 'PENDING'),
        PROCESSING: dataTable.filter(item => item.status === 'PROCESSING'),
        WAITING_PICKUP: dataTable.filter(item => item.status === 'WAITING_PICKUP'),
        SHIPPING: dataTable.filter(item => item.status === 'SHIPPING'),
        CANCELLED: dataTable.filter(item => item.status === 'CANCELLED'),
        SUCCESS: dataTable.filter(item => item.status === 'SUCCESS'),
        RETURN_RECEIVED: dataTable.filter(item => item.status === 'RETURN_RECEIVED'),
    }
    const actions = {
        All: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, status) }
        ],
        PENDING: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, status) },
            { icons: <MdOutlineVerified size={22} />, action: 'Xác nhận', handleClick: (e, id, status) => handleClickUpdateOrderStatus('PROCESSING', e, id, status) },
            { icons: <MdCancelPresentation size={22} />, action: 'Huỷ đơn hàng', handleClick: (e, id, status) => handleClickUpdateOrderStatus('CANCELLED', e, id, status) }
        ],
        PROCESSING: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, status) },
            { icons: <IoMdTime size={22} />, action: 'Chờ lấy hàng', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WAITING_PICKUP', e, id, status) },
            { icons: <MdCancelPresentation size={22} />, action: 'Huỷ đơn hàng', handleClick: (e, id, status) => handleClickUpdateOrderStatus('CANCELLED', e, id, status) }
        ],
        WAITING_PICKUP: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, status) },
            { icons: <CiDeliveryTruck size={22} />, action: 'Giao hàng', handleClick: (e, id, status) => handleClickUpdateOrderStatus('SHIPPING', e, id, status) },
            { icons: <MdCancelPresentation size={22} />, action: 'Huỷ đơn hàng', handleClick: (e, id, status) => handleClickUpdateOrderStatus('CANCELLED', e, id, status) }
        ],
        SHIPPING: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, status) },
            { icons: <FaRegStar size={22} />, action: 'Hoàn thành đơn', handleClick: (e, id, status) => handleClickUpdateOrderStatus('SUCCESS', e, id, status) },
            { icons: <GiReturnArrow size={22} />, action: 'Đã trả hàng', handleClick: (e, id, status) => handleClickUpdateOrderStatus('RETURN_RECEIVED', e, id, status) },
        ],
        CANCELLED: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, status) }
        ],
        SUCCESS: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, status) }
        ],
        RETURN_RECEIVED: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, status) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, status) }
        ],
    }

    const tab = [
        { header: 'Tất cả', content: <TableDataOrder actions={actions.All} dataTable={datatableFilter.All} /> },
        { header: 'Chờ xác nhận', content: <TableDataOrder actions={actions.PENDING} dataTable={datatableFilter.PENDING} /> },
        { header: 'Chuẩn bị hàng', content: <TableDataOrder actions={actions.PROCESSING} dataTable={datatableFilter.PROCESSING} /> },
        { header: 'Chờ lấy hàng', content: <TableDataOrder actions={actions.WAITING_PICKUP} dataTable={datatableFilter.WAITING_PICKUP} /> },
        { header: 'Đang giao hàng', content: <TableDataOrder actions={actions.SHIPPING} dataTable={datatableFilter.SHIPPING} /> },
        { header: 'Hoàn thành đơn hàng', content: <TableDataOrder actions={actions.SUCCESS} dataTable={datatableFilter.SUCCESS} /> },
        { header: 'Đã huỷ', content: <TableDataOrder actions={actions.CANCELLED} dataTable={datatableFilter.CANCELLED} /> },
        { header: 'Đã trả hàng', content: <TableDataOrder actions={actions.CANCELLED} dataTable={datatableFilter.RETURN_RECEIVED} /> },
    ]
    return (
        <div className="dark:border-strokedark dark:bg-boxdark">
            <TabView
                pt={{
                    navContent: 'flex gap-1 relative dark:border-strokedark dark:bg-boxdark',
                    nav: 'flex justify-center gap-5 bord dark:border-strokedark dark:bg-boxdark dark:text-black',
                    tabContent: 'relative p-4 ',
                    inkbar: 'bg-green-500 w-full h-2 absolute field bottom-0 left-0 right-0 ',
                }}
            >
                {tab.map((item, index) => (
                    <TabPanel key={index} header={item.header} pt={{
                        content: 'p-5 relative dark:border-strokedark dark:bg-boxdark',
                        headerAction: 'bg-green-200 px-5 py-4 relative',
                    }}>
                        {errorGetAPI ? <p className='text-red-500'>{errorGetAPI}</p> : item.content}

                    </TabPanel>
                ))}
            </TabView>
        </div>
    )
}

export default Tabview