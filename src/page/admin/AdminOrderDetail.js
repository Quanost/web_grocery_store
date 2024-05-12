import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { CartItems, Select } from '../../components'
import { apiGetOrderById, apiUpdateOrderStatus } from '../../apis'
import { toast } from 'react-toastify';
import path from '../../ultils/path';
import { formatterMonney, formatDateAndTime } from '../../ultils/helper'
import { orderStatus, paymentStatus, paymentType } from '../../ultils/contants';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

const AdminOrderDetail = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    const response = await apiGetOrderById(orderId)
    if (response?.status === 200)
      setOrder(response?.data);
    else
      toast.error('Get đơn hàng thất bại')
  }

  useEffect(() => {
    if (orderId)
      fetchOrder()
  }, [orderId])

  useEffect(() => {
    if (order) {
      setValue('status', order.status);
    }
  }, [order, setValue]);

  const handleUpdateOrder = async (data) => {
    try {
      const response = await apiUpdateOrderStatus({ orderId, status: data.status })
      if (response?.status === 200) {
        fetchOrder()
        toast.success('Cập nhật trạng thái đơn hàng thành công')
      } else
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Cập nhật trạng thái đơn hàng thất bại',
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Cập nhật trạng thái đơn hàng thất bại',
      })
    }
  }

  return (
    <div className='dark:bg-strokedark dark:text-white min-h-screen bg-gray-50'>
      <div>
        <h1 className='h-[75px] flex justify-between items-center text-2xl font-medium font-main px-4 border-b'>
          Chi tiết đơn hàng # {orderId}
          <Link to={`/${path.ADMIN}/${path.MANAGE_ORDER}`}><p className='font-main text-lg text-blue-500'>Quay lại</p></Link>
        </h1>
      </div>

      <div className=' my-5 py-10 bg-white shadow-3 w-[70%] mx-auto'>
        <div className='flex justify-between px-5 py-2'>
          <p className='font-main text-lg'>Ngày đặt: <span className='font-main text-md font-bold ml-2'>{formatDateAndTime(order?.createdAt)}</span></p>
          <p className='font-main text-lg '>Trạng thái: <span className='font-main text-md ml-2'>{orderStatus.find(el => el.value === order?.status)?.label}</span></p>
        </div>

        <div className='w-[90%] flex  gap-5 mx-auto  py-5 px-5 bg-gray-200'>
          <div className='w-[40%] flex flex-col gap-1'>
            <label className='font-main text-xl font-medium'>Địa chỉ người nhận</label>
            <div className='bg-white px-5 py-5 font-main text-md flex flex-col gap-1'>
              <p className='font-main text-md text-black-2'>{order?.address?.customerName}</p>
              <p>Địa chỉ: {order?.address?.address}, {order?.address?.ward}, {order?.address?.district}, {order?.address?.city}</p>
              <p>Điện thoại: {order?.address?.customerPhone}</p>
            </div>
          </div>
          <div className='w-[30%] flex flex-col gap-1'>
            <label className='font-main text-xl font-medium'>Hình thức giao hàng</label>
            <div className='bg-white px-5 py-5 font-main text-md h-full flex flex-col gap-1'>
              <p>Được giao bởi: Giao Hàng Nhanh</p>
              <p>Phí vận chuyển: {formatterMonney.format(25000)}</p>
            </div>
          </div>
          <div className='w-[30%] flex flex-col gap-1'>
            <label className='font-main text-xl font-medium'>Hình thức thanh toán</label>
            <div className='bg-white px-5 py-5 font-main text-md h-full flex flex-col gap-1'>
              <p>{paymentType.find(item => item.value === order?.paymentDetail?.paymentType)?.label}</p>
              <p>{paymentStatus.find(item => item.value === order?.paymentDetail?.status)?.label}</p>
            </div>
          </div>
        </div>
        <div>
          <table className="w-[90%] mx-auto  text-md text-left rtl:text-right  dark:text-gray-400">
            <thead className="text-xl font-main  ">
              <tr>
                <th scope="col" className="px-6 py-3 text-base font-main font-normal">
                  Sản phẩm
                </th>
                <th scope="col" className="px-6 py-3 text-base font-main font-normal">
                  Đơn giá
                </th>
                <th scope="col" className="px-6 py-3 text-base font-main font-normal">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3 text-base font-main font-normal">
                  Số tiền
                </th>
                <th scope="col" className="px-6 py-3 text-base font-main font-normal">

                </th>
              </tr>
            </thead>
            <tbody >
              {order?.orderItem?.map((item) => (
                <CartItems key={item.id} item={item} defaultQuantity={item.quantity} checkout />
              ))}

            </tbody>
          </table>

          <div className="bottom-0 w-full bg-gray-50 rounded-xl mx-1 ">


            <div className='flex gap-3 justify-end flex-col items-end py-2 border-b px-4 font-main text-base'>
              <div className='flex justify-between w-65'>
                <p>Tổng tiền hàng</p>
                <span>{formatterMonney.format(order?.total)}</span>
              </div>
              <div className='flex justify-between w-65 ' >
                <p>Phí giao hàng</p>
                <span>{formatterMonney.format(25000)}</span>
              </div>
              <div className='flex justify-between w-65'>
                <p>Tổng thanh toán</p>
                <span>{formatterMonney.format(Number(order?.total) + 25000)}</span>
              </div>
            </div>
            <div className="flex gap-5 justify-end my-10 mx-5">
              <Select id={'status'} register={register} errors={errors} options={orderStatus} defaultValue={order?.status}
                validate={{
                  required: 'Tên sản phẩm không được trống',
                }} />
              <button type="button" onClick={handleSubmit(handleUpdateOrder)} className=" w-60 font-main text-lg text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2">
                Cập nhật trạng thái
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetail