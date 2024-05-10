
import React, { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { SelectGroup } from '../../components';
import { createSearchParams, useNavigate } from "react-router-dom";
import path from '../../ultils/path';
import Swal from "sweetalert2";
import { apiUpdateCart } from '../../apis';
import { toast } from "react-toastify";
import { getUserCurrent } from "../../store/user/asynActionUser";


export default function DialogVariantsProduct({ productId, name, dispatch, current, currentCart, variants, visible, setVisible }) {

    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const navigate = useNavigate();
    const location = window.location;


    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const incrementQuantity = () => {
        if (quantity < 50) {
            setQuantity(quantity + 1);
        }
    };
    const handleVariantChange = (variantSelected) => {
        setSelectedVariant(variantSelected);
    }
    useEffect(() => {
        // set quantity khi sản phẩm đã có trong giỏ hàng
        const itemInCart = currentCart?.cartItem?.find((item) => item.variantId === selectedVariant);
        if (itemInCart) {
            setQuantity(itemInCart.quantity);
        }else {
            setQuantity(1);
        }
    }, [selectedVariant])

    const handleAddToCart = async () => {
        if (!current) {
            return Swal.fire({
                title: 'Bạn chưa đăng nhập',
                text: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng',
                icon: 'info',
                cancelButtonText: 'Hủy',
                showCancelButton: true,
                confirmButtonText: 'Đăng nhập',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate({
                        pathname: `/${path.LOGIN}`,
                        search: createSearchParams({ redirect: location.pathname }).toString(),
                    })
                }
            })
        } else {
            const response = await apiUpdateCart({ id: current?.cartId, cartItem: [{ productId: productId, variantId: selectedVariant, quantity: quantity }] })
            if (response?.status === 200) {
                setVisible(false);
                toast.success('Thêm sản phẩm vào giỏ hàng thành công')
                dispatch(getUserCurrent(current?.id))
            } else {
                toast.error(response?.error)
            }
        }
    }
    return (
        <div className="card flex justify-content-center">
            <Dialog header={name} visible={visible} style={{ width: '35vw' }} onHide={() => setVisible(false)}
                pt={{
                    header: 'p-5 font-main text-xl font-bold text-black',
                }}>
                <div className="">
                    <div className="my-5 mx-5 px-20 rounded-xl">
                        <SelectGroup variantdefault='' variant={variants ? variants : []} handleSelected={handleVariantChange} />
                    </div>

                    <div className="flex flex-col gap-5 font-main text-base font-medium text-black mx-5 ">
                        <div class="flex gap-5 ">
                            <label for="quantity-input" class="block mb-2 ">Số lượng:</label>
                            <div className="relative flex items-center max-w-[8rem] border border-red-300 rounded-md">
                                <button
                                    type="button"
                                    onClick={decrementQuantity}
                                    className="bg-red-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-red-100  p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700  "
                                >
                                    <svg
                                        className="w-3 h-3 text-gray-900 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 2"
                                    >
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    id="quantity-input"
                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="999"
                                    value={quantity}
                                    required
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={incrementQuantity}
                                    className="bg-red-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-red-100  p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 "
                                >
                                    <svg
                                        className="w-3 h-3 text-gray-900 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                    >
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <label>Thành tiền:</label>
                            <span className="text-red-500 text-xl">120.000</span>
                        </div>
                    </div>
                    <div className="flex justify-end mr-10 py-2">
                        <button type="button" onClick={handleAddToCart} className="w-[30%] font-main text-base text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2">Mua</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

