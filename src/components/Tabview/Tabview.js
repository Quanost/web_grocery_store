import React, { useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { TableDataOrder, DialogDelivery } from '../../components'
import icon from '../../ultils/icons'
import path from '../../ultils/path';
import { apiUpdateOrderStatus, apiGetOrderById, apiGetTokenPrintDelivery, apiPrintDeliveryOrder, apiconfirmPaymentCash } from '../../apis';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useSocket from '../../hooks/useSocket';
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Tabview = ({ dataTable, errorGetAPI, navigate, getOrders }) => {
    const { FaRegEye, MdOutlineVerified, MdCancelPresentation, CiDeliveryTruck, FaRegStar, IoMdTime, GiReturnArrow, FaPrint } = icon
    const [showDialogDelivery, setShowDialogDelivery] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);


    const fetchOrder = async (orderId) => {
        try {
            const response = await apiGetOrderById(orderId)
            if (response?.status === 200)
                setCurrentOrder(response?.data);
            else
                toast.error('Get đơn hàng thất bại')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Get đơn hàng thất bại',
            })
        }

    }
    useEffect(() => {
        const handleServerMsg = (data) => {
            // setMessages(data.msg);
            getOrders();
        };

        socket.on("serverMsg", handleServerMsg);

        return () => {
            socket.off("serverMsg", handleServerMsg);
        };
    }, [socket]);
    const { sendMessage } = useSocket(getOrders); // Gọi hàm fetchOrder khi có tin nhắn từ server
    const updateOrderStatus = async (id, status) => {
        const response = await apiUpdateOrderStatus({ orderId: id, status, deliveryId:'LF3VUR'});
        if (response?.status === 200) {
            // getOrders();
            sendMessage('Trạng thái đơn hàng đã cập nhật', '');
            toast.success('Cập nhật trạng thái thành công');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Cập nhật trạng thái thất bại',
            });
        }
    }
    const updatePaymentOrderCash = async (id) => {
        const response = await apiconfirmPaymentCash({ orderId: id});
        if (response?.status === 200) {
            // getOrders();
            console.log('Cập nhật trạng thái thanh toán thành công');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Cập nhật trạng thái thanh toán cash thất bại',
            });
        }
    }
    const handleClickUpdateOrderStatus = async (type, e, id, item) => {
        switch (type) {
            case 'WATCH_DETAIL':
                e.preventDefault()
                navigate(`/${path.ADMIN}/${path.ORDER_DETAIL}/${id}`)
                break;
            case 'PROCESSING':
                await updateOrderStatus(id, 'PROCESSING');
                break;
            case 'WAITING_PICKUP':
                // await fetchOrder(id)
                // setShowDialogDelivery(true)
                await updateOrderStatus(id, 'WAITING_PICKUP');
                break;
            case 'SHIPPING':
                await updateOrderStatus(id, 'SHIPPING');
                break;
            case 'SUCCESS':
                await updateOrderStatus(id, 'SUCCESS');
                await updatePaymentOrderCash(id);
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
            case 'PRINT_DELIVERY':
                try {
                    const response = await apiGetTokenPrintDelivery({ order_codes: [item?.deliveryId] })
                    if (response?.status === 200) {
                        const token = response?.data?.data?.token;
                        const url = `https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${token}`;
                        window.open(url, '_blank');
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'In vận đơn hàng thất bại',
                    })
                }
                break;
            default:
                alert('Hành động không hợp lệ')
                break;
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
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, item) }
        ],
        PENDING: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, item) },
            { icons: <MdOutlineVerified size={22} />, action: 'Xác nhận', handleClick: (e, id, item) => handleClickUpdateOrderStatus('PROCESSING', e, id, item) },
            { icons: <MdCancelPresentation size={22} />, action: 'Huỷ đơn hàng', handleClick: (e, id, item) => handleClickUpdateOrderStatus('CANCELLED', e, id, item) }
        ],
        PROCESSING: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, item) },
            { icons: <IoMdTime size={22} />, action: 'Chờ lấy hàng', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WAITING_PICKUP', e, id, item) },
            { icons: <MdCancelPresentation size={22} />, action: 'Huỷ đơn hàng', handleClick: (e, id, item) => handleClickUpdateOrderStatus('CANCELLED', e, id, item) }
        ],
        WAITING_PICKUP: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, item) },
            { icons: <CiDeliveryTruck size={22} />, action: 'Giao hàng', handleClick: (e, id, item) => handleClickUpdateOrderStatus('SHIPPING', e, id, item) },
            { icons: <FaPrint size={22} />, action: 'In vận đơn', handleClick: (e, id, item) => handleClickUpdateOrderStatus('PRINT_DELIVERY', e, id, item) },
            { icons: <MdCancelPresentation size={22} />, action: 'Huỷ đơn hàng', handleClick: (e, id, item) => handleClickUpdateOrderStatus('CANCELLED', e, id, item) }
        ],
        SHIPPING: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, item) },
            { icons: <FaRegStar size={22} />, action: 'Hoàn thành đơn', handleClick: (e, id, item) => handleClickUpdateOrderStatus('SUCCESS', e, id, item) },
            { icons: <GiReturnArrow size={22} />, action: 'Đã trả hàng', handleClick: (e, id, item) => handleClickUpdateOrderStatus('RETURN_RECEIVED', e, id, item) },
        ],
        CANCELLED: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, item) }
        ],
        SUCCESS: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, item) }
        ],
        RETURN_RECEIVED: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: (e, id, item) => handleClickUpdateOrderStatus('WATCH_DETAIL', e, id, item) }
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
            <DialogDelivery visible={showDialogDelivery} setVisible={setShowDialogDelivery} order={currentOrder && currentOrder} getOrders={getOrders} />
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
                        {errorGetAPI ? <p className='text-red-500 flex justify-center items-center'>{errorGetAPI}</p> : item.content}

                    </TabPanel>
                ))}
            </TabView>
        </div>
    )
}

export default Tabview