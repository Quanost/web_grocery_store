import React from 'react'
import { useSelector } from 'react-redux';
import { formatterMonney } from '../../ultils/helper';
import { CartItems } from '../../components';

const CartUser = () => {
    const { currentCart } = useSelector(state => state.user);
    const discountPrice = 0;
    const totalPrice = currentCart?.cartItem?.reduce((sum, el) => +el.quantity * (el.variantId ? +el.variant?.discountPrice : +el.product?.discountPrice) + sum, 0) || 0;

    console.log('curentCart',currentCart)
    return (
        <div className='bg-slate-50'>
            <h2 class="title font-main font-medium text-2xl leading-3 mb-8 text-center border bg-white h-14 pt-5">
                Giỏ hàng
            </h2>
            {currentCart?.cartItem?.length === 0 ? (
                <div className='flex items-center justify-center h-96'>
                    <h3 className='text-gray-400 font-main text-lg'>Giỏ hàng của bạn trống</h3>
                </div>

            ) :
                (
                    <>
                        <section class="py-10 relative bg-white overflow-y-auto pb-96">
                            {currentCart?.cartItem?.length === 0 ? (
                                <div className='flex items-center justify-center h-96'>
                                    <h3 className='text-gray-400 font-main text-lg'>Giỏ hàng của bạn trống</h3>
                                </div>

                            ) :
                                (
                                    <table class="w-full text-md text-left rtl:text-right  dark:text-gray-400">
                                        <thead class="text-xl font-main  ">
                                            <tr>
                                                <th scope="col" class="p-4">
                                                    <div class="flex items-center">
                                                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                                    </div>
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-base font-main font-normal">
                                                    Sản phẩm
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-base font-main font-normal">
                                                    Đơn giá
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-base font-main font-normal">
                                                    Số lượng
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-base font-main font-normal">
                                                    Số tiền
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-base font-main font-normal">

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {currentCart?.cartItem?.map((item) => (
                                                <CartItems key={item.id} item={item} defaultQuantity={item.quantity} />
                                            ))}

                                        </tbody>
                                    </table>

                                )}
                        </section>
                        <div class="fixed z-10 bottom-0 w-main bg-gray-50 rounded-xl p-6 mx-1 ">
                            <div class="flex items-center justify-between mb-6">
                                <p class="font-normal text-lg  text-gray-400">Tổng tiền hàng</p>
                                <h6 class="font-normal font-main text-lg  text-gray-500">{formatterMonney.format(totalPrice)}</h6>
                            </div>
                            <div class="flex items-center justify-between pb-6 border-b border-gray-200">
                                <p class="font-normal text-lg  text-gray-400">Voucher giảm giá</p>
                                <h6 class="font-normal font-main text-lg  text-gray-500">{formatterMonney.format(0)}</h6>
                            </div>
                            <div class="flex items-center justify-between py-6">
                                <p class="font-medium font-main text-xl leading-5 text-gray-500">Tổng thanh toán</p>
                                <h6 class="font-medium text-2xl leading-9 text-red-500">{formatterMonney.format(totalPrice - discountPrice)}</h6>
                            </div>
                            <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-1">
                                <button class="rounded-full py-3 w-full max-w-[280px] flex items-center bg-red-50 justify-center transition-all duration-500 hover:bg-red-100">
                                    <span class="px-2 font-semibold text-lg leading-8 text-red-600">Thêm Voucher</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="red" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button class="rounded-full w-full max-w-[280px] py-3 text-center justify-center items-center bg-red-500 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-red-400">Mua hàng
                                    <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                        <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                )}

        </div>
    )
}

export default CartUser