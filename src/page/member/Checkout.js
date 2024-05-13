import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { formatterMonney } from '../../ultils/helper';
import { CartItems, DialogAddress, DialogPaymentMethod } from '../../components';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import icon from '../../ultils/icons';
import { useForm } from 'react-hook-form';
import { apiPayment } from '../../apis';
import { toast } from 'react-toastify';
import { paymentType } from '../../ultils/contants'
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Checkout = () => {
  const { IoLocationSharp } = icon
  const { current, currentCart, userAddress } = useSelector(state => state.user);
  const { control, register, unregister, handleSubmit, watch, reset, setValue: setValueAddress, formState: { errors } } = useForm({
    defaultValues: {
      paymentType: 'CASH',
      orderItem: currentCart?.cartItem,
      address: userAddress?.[0]
    }
  });
  const [showDialogAddress, setShowDialogAddress] = useState(false);
  const [showDialogPaymentMethod, setShowDialogPaymentMethod] = useState(false);
  const navigate = useNavigate();
  const discountPrice = 0;
  const totalPrice = currentCart?.cartItem?.reduce((sum, el) => +el.quantity * (el.variantId ? +el.variant?.discountPrice : +el.product?.discountPrice) + sum, 0) || 0;

  const onSubmit = async(data) => {
    const dataPayment = {
      language: 'vn',
      order: {
        paymentType: data.paymentType,
        userId: current?.id,
        addressId: data.address?.id,
        orderItem: data.orderItem?.map(item => ({
          productId: item.productId,
          ...(item.variantId !== null && { variantId: item.variantId }),
          quantity: item.quantity
        }))
      }
  };
    
    const response = await apiPayment(dataPayment)
    if(response?.status === 200 && response?.data?.id ) {
      socket.emit("clientMsg", { msg: 'Đơn hàng vừa đuọc tạo', room: '' });
      toast.success('Đặt hàng thành công')
      navigate(`/${path.MEMBER}/${path.ORDER_DETAIL}/${response?.data?.id}`)
    }else{
      toast.error('Đặt hàng thất bại')
    }

  }

  return (
    <div className='bg-slate-50'>
      <h2 className="title font-main font-medium text-2xl leading-3 mb-8 text-center border bg-white h-14 pt-5">
        Thanh toán
      </h2>
      <section className='bg-white my-5 px-6 py-3'>
        <div className='flex text-red-500 text-xl font-main items-center gap-5'>
          <IoLocationSharp size={25} />
          Địa chỉ nhận hàng
        </div>
        {userAddress.length === 0 ? (
          <div className="space-y-1 flex items-center my-3 ">
            <p className='pl-10 font-main text-md text-gray-500 text-center'>Chưa có địa chỉ nhận hàng</p>
            <span onClick={() => setShowDialogAddress(!showDialogAddress)} className='pl-10 text-blue-600 text-md font-main cursor-pointer'>Thêm địa chỉ</span>
            <DialogAddress visible={showDialogAddress} setVisible={setShowDialogAddress} userAddress={userAddress} setValueAddress={setValueAddress} current={current}/>
          </div>
        ) :
          (
            <div className="space-y-1 flex items-center my-3 ">
              <p className="font-medium text-md font-main">{userAddress?.[0].customerName}, <span>{userAddress?.[0].customerPhone}</span></p>
              <p className='pl-10 font-main text-md text-gray-500 text-center'>{userAddress?.[0].address}, {userAddress?.[0].ward}, {userAddress?.[0].district}, {userAddress?.[0].city}</p>
              <span onClick={() => setShowDialogAddress(!showDialogAddress)} className='pl-10 text-blue-600 text-md font-main cursor-pointer'>Thay đổi</span>
              <DialogAddress visible={showDialogAddress} setVisible={setShowDialogAddress} userAddress={userAddress} setValueAddress={setValueAddress} current={current}/>
            </div>
          )}

      </section>
      <section className="py-10 relative bg-white overflow-y-auto pb-96">
        {currentCart?.cartItem?.length === 0 ? (
          <div className='flex items-center justify-center h-96'>
            <h3 className='text-gray-400 font-main text-lg'>Giỏ hàng của bạn trống</h3>
          </div>

        ) :
          (
            <table className="w-full text-md text-left rtl:text-right  dark:text-gray-400">
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
                {currentCart?.cartItem?.map((item) => (
                  <CartItems key={item.id} item={item} defaultQuantity={item.quantity} checkout />
                ))}

              </tbody>
            </table>

          )}
      </section>
      <div className="bottom-0 w-main bg-gray-50 rounded-xl mx-1 ">
        <div className='flex justify-between bg-white border-b mt-6 py-3 px-4'>
          <p className='font-main text-black text-lg'>Phương thức thanh toán</p>
          <div className='flex gap-5 font-main text-base text-gray-600 w-65 justify-between'>
            <p>{ watch('paymentType') && paymentType.find(el => el.value === watch('paymentType'))?.label}</p>
            <p onClick={() => setShowDialogPaymentMethod(!showDialogPaymentMethod)} className='text-blue-600 font-main text-lg'>Thay đổi</p>
          </div>
        </div>
        <DialogPaymentMethod setValue={setValueAddress} visible={showDialogPaymentMethod} setVisible={setShowDialogPaymentMethod} register={register} id={'paymentType'} />
        <div className='flex gap-3 justify-end flex-col items-end py-2 border-b px-4 font-main text-base'>
          <div className='flex justify-between w-65'>
            <p>Tổng tiền hàng</p>
            <span>{formatterMonney.format(totalPrice)}</span>
          </div>
          <div className='flex justify-between w-65 ' >
            <p>Phí giao hàng</p>
            <span>{formatterMonney.format(25000)}</span>
          </div>
          <div className='flex justify-between w-65'>
            <p>Tổng thanh toán</p>
            <span>{formatterMonney.format(totalPrice + Number(25000))}</span>
          </div>
        </div>
        <div className="flex justify-end my-10 mx-5">
          <button onClick={handleSubmit(onSubmit)} type="button" className=" w-60 font-main text-lg text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2">
            Đặt hàng
          </button>
        </div>
      </div>


    </div>
  )
}

export default Checkout