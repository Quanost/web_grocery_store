import React, { useState } from "react";
import { formatterMonney } from '../../ultils/helper'
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import DialogVariantsProduct from '../Dialog/DialogVariantsProduct';
import { apiUpdateCart } from '../../apis'
import Swal from "sweetalert2";
import path from '../../ultils/path';
import { toast } from "react-toastify";
import { getUserCurrent } from "../../store/user/asynActionUser";

const CardProduct = ({ productId, imgURL, regularPrice, discountPrice, name, variants, link }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const { current } = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
   
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
    const nameProductStyles = {
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        display: '-webkit-box'
    }

    const handleAddToCart = async () => {
        if (variants?.length === 0) {
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
                const response = await apiUpdateCart({ id: current?.cartId, cartItem: [{ productId: productId, quantity: 1 }] })
                if (response?.status === 200) {
                    toast.success('Thêm sản phẩm vào giỏ hàng thành công')
                    dispatch(getUserCurrent(current?.id))
                } else {
                    toast.error(response?.error)
                }
            }

        } else {
            setVisible(true)
        }
    }

    return (
        <article class="relative flex flex-col overflow-hidden rounded-lg border">
            <Link to={link}>
                <div class="aspect-square overflow-hidden">
                    <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src={imgURL} alt="" />
                </div>
                {discountPrice < regularPrice && (
                    <div class="absolute top-0 m-1 rounded-full bg-white">
                        <p class="rounded-full bg-red-400 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Khuyến mãi</p>
                    </div>
                )}
                <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between font-main">
                    <div style={nameProductStyles}>
                        <h3 class="mx-2 text-base text-gray-400 h-20">{name}</h3>
                    </div>
                    <div class="mb-2 flex">
                        <p class="mr-3 text-lg font-semibold">{formatterMonney.format(discountPrice)}</p>
                        {discountPrice < regularPrice && (
                            <del class="text-lg text-gray-400"> {formatterMonney.format(regularPrice)} </del>
                        )}
                    </div>
                </div>
            </Link>
            {current?.cart?.cartItem?.some((item) => item.productId === productId) ?
                (
                    <div className="relative mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 border border-red-300">
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
                                    className="bg-gray-50 border-x-0 border-gray-300  text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                ) :
                (
                    <button onClick={() => handleAddToCart()} className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 border border-red-300">
                        <div className="flex w-full items-center justify-center border-r-4 border-red-200 text-lg font-medium font-main uppercase transition group-hover:bg-red-300 group-hover:text-white">Mua</div>
                        <div className="flex items-center justify-center  px-5 transition group-hover:bg-red-200 group-hover:text-white">+</div>
                    </button>
                )
            }

            <DialogVariantsProduct productId={productId} dispatch={dispatch} visible={visible} current={current} setVisible={setVisible} name={name} variants={variants ? variants : []} />
        </article >
    )
}

export default CardProduct
