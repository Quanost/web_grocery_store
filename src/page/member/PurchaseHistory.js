import React, { useState, useEffect } from 'react';
import icon from '../../ultils/icons';
import { apiGetOrderHistory, apiUpdateCart, apiClearCart } from '../../apis'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { formatDateAndTime } from '../../ultils/helper'
import { orderStatus } from '../../ultils/contants'
import { Link, useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { getUserCurrent } from '../../store/user/asynActionUser';
import Swal from 'sweetalert2';

const PurchaseHistory = () => {
  const { SlArrowRight } = icon
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderHistory, setOrderHistory] = useState(null)
  const { current, currentCart } = useSelector(state => state.user);

  const fetchOrderHistory = async () => {
    const response = await apiGetOrderHistory(current?.id)
    if (response?.status === 200)
      setOrderHistory(response?.data);
    else
      toast.error('Get lịch sử đơn hàng thất bại')
  }

  useEffect(() => {
    if (current?.id)
      fetchOrderHistory()
  }, [current?.id])
  const handleReOrder = async (e, order) => {
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
  console.log('orderHistory', orderHistory)

  return (
    <div className='bg-slate-50'>
      <h2 className="title font-main font-medium text-2xl leading-3 mb-8 text-center border bg-white h-14 pt-5">
        Đơn hàng từng mua
      </h2>
      {orderHistory?.length === 0 ? <p className='font-main text-lg text-center'>Chưa có đơn hàng nào</p>
        : <>
          {orderHistory?.map((item, index) => (
            <div key={index} className='mx-40 bg-white px-10 rounded-lg shadow-2 mb-5'>
              <div className='flex justify-between pt-3'>
                <p className='font-main text-lg'>Ngày đặt: <span className='font-main text-md font-bold ml-2'>{formatDateAndTime(item?.createdAt)}</span></p>
                <p className='font-main text-lg '>Trạng thái: <span className='font-main text-md ml-2'>{orderStatus.find(el => el.value === item?.status)?.label}</span></p>
              </div>
              <div className='flex justify-between pt-2'>
                <p className='font-main text-lg'>Mã đơn: <span className='font-main text-sm text-gray-500 ml-2'>{item?.id}</span></p>
                <p className='font-main text-lg '>Tổng tiền: <span className='font-main text-md ml-2'>{item?.total}</span></p>
              </div>
              {item?.orderItem?.map((orderitem, index) => (
                <div key={index} className='flex flex-grow items-center px-6 py-4 text-gray-900  dark:text-white'>
                  <img className='w-25 h-25 object-cover' src={orderitem.variantId ? orderitem.variant?.thumbnail : orderitem.product?.productGalleries?.[0].imageUrl} />
                  <div className="w-full max-w-sm pl-2 top-0">
                    <h5 className="font-main font-normal text-lg leading-5 text-black max-[550px]:text-center">
                      {orderitem.product?.name}
                    </h5>
                    <p className="font-main font-normal text-base  my-2 min-[550px]:my-3 max-[550px]:text-center">
                      {orderitem.variantId ? orderitem.variant?.unitPack : ''}
                    </p>
                  </div>
                </div>
              ))}
              <Link to={`/${path.MEMBER}/${path.ORDER_DETAIL}/${item?.id}`}
              >
                <span className='font-main text-lg text-red-500 my-2 flex justify-end items-center gap-1 cursor-pointer'>Xem chi tiết <SlArrowRight size={13} /></span>
              </Link>

              <div className='flex justify-between'>
                <button type="button" className="w-80 h-12 font-main text-md text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Đánh giá
                </button>
                <button type="button" onClick={(e) => handleReOrder(e, item)} className="w-80 h-12 font-main text-md text-red-600 bg-white border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Mua lại đơn hàng
                </button>
              </div>
            </div>
          ))}
        </>
      }
    </div>
  )
}

export default PurchaseHistory