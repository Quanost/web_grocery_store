import React, { useEffect, useState } from 'react'
import { StatusSteps } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetOrderById, apiUpdateOrderStatus, apiUpdateCart, apiClearCart, apiGetDeliveryOrder } from '../../apis'
import { toast } from 'react-toastify';
import { formatDateAndTime, formatterMonney } from '../../ultils/helper';
import { orderStatus, paymentType } from '../../ultils/contants';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import path from '../../ultils/path'
import { getUserCurrent } from '../../store/user/asynActionUser';
import useSocket from '../../hooks/useSocket';

const OrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [order, setOrder] = useState(null);
    const [delivery, setDelivery] = useState(null);
    const { current, currentCart } = useSelector(state => state.user);

    const fetchOrder = async () => {
        const response = await apiGetOrderById(orderId)
        if (response?.status === 200)
            setOrder(response?.data);
        else
            toast.error('Get đơn hàng thất bại')
    }
    const fetchDeliveryOrder = async () => {
        const response = await apiGetDeliveryOrder({order_code: order?.deliveryId})
        if (response?.status === 200)
          setDelivery(response?.data?.data);
        else
          toast.error('Get đơn giao  hàng thất bại')
      }

    useEffect(() => {
        if (orderId)
            fetchOrder()
    }, [orderId])
    const { sendMessage } = useSocket(fetchOrder); // Gọi hàm fetchOrder khi có tin nhắn từ server

    useEffect(() => {
        if (order) {
          if (order.status === 'WAITING_PICKUP' || order.status === 'SHIPPING') {
            fetchDeliveryOrder()
          }
           
        }
      }, [order]);

    const handleCancelledOrderSatus = async (e) => {

        e.preventDefault();
        Swal.fire({
            title: 'Bạn chắc chắn muốn huỷ đơn hàng?',
            text: "Bạn không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiUpdateOrderStatus({ orderId, status: 'CANCELLED' })
                    if (response?.status === 200) {
                        // fetchOrder()
                        sendMessage('Trạng thái đơn hàng đã cập nhật', '');
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
        })

    }

    const handleReOrder = async (e) => {
        e.preventDefault();
        const dataUpdateCart = {
            id: currentCart.id,
            cartItem: order.orderItem.map(item => ({
                productId: item.productId,
                ...(item.variantId !== null && { variantId: item.variantId }),
                quantity: item.quantity
            }))
        }
        if (currentCart?.cartItem?.length === 0 && order?.orderItem) {
            try {
                const response = await apiUpdateCart(dataUpdateCart)
                if (response?.status === 200) {
                    await dispatch(getUserCurrent(current?.id))
                    navigate(`/${path.MEMBER}/${path.CART}`)
                } else {
                    throw new Error('Mua lại đơn hàng thất bại')
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: error.message,
                })
            }
        } else {
            Swal.fire({
                title: 'Trong giỏ hàng đang có sản phẩm.',
                text: "Bạn có muốn mua chung với các sản phẩm của đơn hàng mua lại này không?",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Không'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await apiUpdateCart(dataUpdateCart)
                        if (response?.status === 200) {
                            await dispatch(getUserCurrent(current?.id))
                            navigate(`/${path.MEMBER}/${path.CART}`)
                        }
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Mua lại đơn hàng thất bại',
                        })
                    }
                } else {
                    const clearCart = await apiClearCart(current?.id)
                    if (clearCart?.status === 200) {
                        const response = await apiUpdateCart(dataUpdateCart)
                        if (response?.status === 200) {
                            await dispatch(getUserCurrent(current?.id))
                            navigate(`/${path.MEMBER}/${path.CART}`)
                        }
                    }
                }
            })
        }

    }
    return (
        <div className='bg-slate-50'>
            <h2 className="title font-main font-medium text-xl leading-3 mb-3 shadow-3 text-center border bg-white h-14 pt-5">
                Chi tiết đơn hàng
            </h2>
            <div className='mx-40 bg-white px-10 rounded-lg shadow-2 mb-5'>
                <div className='flex justify-between py-5'>
                    <p className='font-main text-lg'>Ngày đặt: <span className='font-main text-md font-bold ml-2'>{formatDateAndTime(order?.createdAt)}</span></p>
                    <p className='flex flex-col justify-end'>
                        <p className='font-main text-lg'>Trạng thái:
                            <span className='font-main text-md ml-2'>{orderStatus.find(el => el.value === order?.status)?.label}</span>
                        </p>
                        {(order?.status === 'WAITING_PICKUP' || order?.status === 'SHIPPING') &&
                            <p className='font-main text-lg'>{order?.status === 'WAITING_PICKUP' ? 'Ngày lấy dự kiến:' : 'Ngày giao dự kiến:'}
                                <span className='font-main text-md ml-2'>{order?.status === 'WAITING_PICKUP' ? formatDateAndTime(delivery?.pickup_time) : formatDateAndTime(delivery?.leadtime)}</span>
                            </p>
                        }
                    </p>
                </div>
                <div className='flex flex-col gap-5 px-10 py-3 bg-slate-50 rounded-lg my-1'>
                    <div className='flex'>
                        <label className='w-30 text-md font-main text-gray-400 flex justify-end pr-2'>Người nhận:</label>
                        <p className='font-main text-base'>{order?.address?.customerName}, {order?.address?.customerPhone}
                            <br></br> {order?.address?.address}, {order?.address?.ward}, {order?.address?.district}, {order?.address?.city}</p>
                    </div>
                    <div className='flex'>
                        <label className='w-30 text-md font-main text-gray-400 flex justify-end pr-2'>Thanh toán:</label>
                        <p className='font-main text-base'>{paymentType.find(el => el.value === order?.paymentDetail?.paymentType)?.label}</p>
                    </div>
                    <div className='flex'>
                        <label className='w-30 text-md font-main text-gray-400 flex justify-end pr-2'>Tổng đơn hàng:</label>
                        <p className='font-main text-base'>{formatterMonney.format(Number(order?.total) + 20000)}</p>
                    </div>
                </div>
                <p className='font-main text-md  py-5'>Lịch sử giao hàng</p>
                <div className='px-2'>
                    <StatusSteps status={order?.status} />
                </div>
                {order?.orderItem?.map((item, index) => (
                    <div key={index} className='flex justify-between px-5 my-5 py-3 border-t'>
                        <div className='flex flex-grow items-center px-6 py-4 text-gray-900  dark:text-white'>
                            <img className='w-25 h-25 object-cover' src={item.variantId ? item.variant?.thumbnail : item.product?.productGalleries?.[0].imageUrl} />
                            <div className="w-full max-w-sm pl-2 top-0">
                                <h5 className="font-main font-normal text-lg leading-5 text-black max-[550px]:text-center">
                                    {item.product?.name}
                                </h5>
                                <p className="font-main font-normal text-base  my-2 min-[550px]:my-3 max-[550px]:text-center">
                                    {item.variantId ? item.variant?.unitPack : ''}
                                </p>
                            </div>
                        </div>
                        <div className='py-3'>
                            <p className='font-main text-lg font-medium'>{formatterMonney.format(item.price)}</p>
                            <span className='font-main text-md text-gray-300'>Số lượng: {item.quantity}</span>
                        </div>
                    </div>
                ))}

                <div className='flex flex-col gap-2 my-2 py-3 border-t'>
                    <div className='flex justify-between'>
                        <label className='font-main text-lg text-black-2'>Tiền hàng</label>
                        <p className='font-main text-md'>{formatterMonney.format(order?.total)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <label className='font-main text-lg text-black-2'>Phí giao hàng</label>
                        <p className='font-main text-md'>{formatterMonney.format(20000)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <label className='font-main text-lg text-black-2'>Tổng thanh toán</label>
                        <p className='font-main text-md'>{formatterMonney.format(Number(order?.total) + 20000)}</p>
                    </div>
                </div>
                {order?.status === 'PENDING' || order?.status === 'PROCESSING' ? (
                    <div className='flex justify-center'>
                        <button type="button" onClick={handleCancelledOrderSatus} className="w-96 h-12 font-main text-md text-red-600 bg-white border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Huỷ đơn hàng
                        </button>
                    </div>
                ) : (
                    <div className='flex justify-center'>
                        <button type="button" onClick={handleReOrder} className="w-96 h-12 font-main text-md text-red-600 bg-white border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Mua lại đơn hàng
                        </button>
                    </div>
                )}

            </div>

        </div>
    )
}

export default OrderDetail
