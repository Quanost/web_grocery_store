
import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { apiGetCart } from '../../apis'
import { CartItems } from '../../components';
import { toast } from "react-toastify";

export default function DialogCart({ visible, setVisible, cartId }) {
    const [currentCart, setCurrentCart] = useState(null);

    const fetchCart = async () => {
        const response = await apiGetCart(cartId);
        if (response?.status === 200) {
            setCurrentCart(response?.data?.cartItem);
        } else {
            toast.error('Lỗi lấy dữ liệu giỏ hàng')
        }
    }
    useEffect(() => {
        if (cartId) {
            fetchCart()
        }
    }, [visible, cartId])
    console.log('currentCart', currentCart)

    return (
        <div className="card flex justify-center">
            <Dialog header="Giỏ hàng" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}
                pt={{
                    header: 'p-5 border-b border-gray-200 dark:border-neutral-700',
                }}>
                <section className="flex justify-center flex-col items-center my-5">
                    {currentCart?.length === 0 ? (
                        <div className="font-main text-lg text-red-500 flex justify-center">Giỏ hàng đang trống</div>
                    ) :
                        <>
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
                                    {currentCart?.map((item) => (
                                        <CartItems key={item.id} item={item} defaultQuantity={item.quantity} checkout />
                                    ))}
                                </tbody>
                            </table>
                        </>}

                </section>
            </Dialog>
        </div>
    )
}
