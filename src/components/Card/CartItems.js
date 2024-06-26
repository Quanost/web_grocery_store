import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { formatterMonney } from '../../ultils/helper';
import icon from '../../ultils/icons';
import { apiRemoveCartItems } from '../../apis';
import { getUserCurrent } from '../../store/user/asynActionUser'
import { toast } from 'react-toastify';
import { updateCart } from '../../store/user/userSlice';


const CartItems = ({ item, defaultQuantity = 1, checkout, navigate, link }) => {
    const { MdOutlineDelete } = icon;
    const [quantity, setQuantity] = useState(defaultQuantity);
    const dispatch = useDispatch();
    const current = useSelector(state => state.user.current);


    const removeCartItem = async (cartItemid) => {
        const response = await apiRemoveCartItems(cartItemid);
        if (response?.status === 200) {
            toast.success(response?.message)
            dispatch(getUserCurrent(current?.id))
        } else {
            toast.error(response?.error)
        }
    }

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
    useEffect(() => {
        dispatch(updateCart({ cartItemsId: item.id, variantId: item.variantId, quantity: quantity }))
    }, [quantity])
    useEffect(() => {
        setQuantity(defaultQuantity);
    }, [defaultQuantity]);

    const handlePageProductDetail = () => {
        if (link)
            navigate(link)
    }
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
            <th scope="row" className="flex flex-grow items-center px-6 py-4 text-gray-900  dark:text-white" onClick={handlePageProductDetail}>
                <img className="w-30 h-30 object-cover rounded-lg" src={item.variantId ? item.variant?.thumbnail : item.product?.productGalleries[0]?.imageUrl} alt="Ảnh sản phẩm" />
                <div className="w-full max-w-sm pl-2">
                    <h5 className="font-main font-normal text-lg leading-5 text-black max-[550px]:text-center">
                        {item.product?.name}
                    </h5>
                    <p className="font-main font-normal text-base  my-2 min-[550px]:my-3 max-[550px]:text-center">
                        {item.variantId ? item.variant?.unitPack : ''}
                    </p>
                </div>
            </th>
            <td className="px-6 py-4 ">
                <div className='flex gap-5 mt-5'>
                    <h6 className="font-normal font-main text-xl  text-right">
                        {formatterMonney.format(item.variantId ? item.variant?.discountPrice : item.product?.discountPrice)}
                    </h6>
                    {!checkout && (item.variantId ? item.variant?.discountPrice < item.variant?.regularPrice : item.product?.discountPrice < item.product?.regularPrice) && (
                        <del className="text-gray-400  font-bold text-md  text-right">{formatterMonney.format(item.variantId ? item.variant?.regularPrice : item.product?.regularPrice)}</del>
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    {!checkout &&
                        <button onClick={decrementQuantity} className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 9.5H13.5" stroke="" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>}
                    <input type="text" id="number" value={quantity} className="border  border-gray-200 rounded-full w-11 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center" placeholder="2" readOnly />
                    {!checkout &&
                        <button onClick={incrementQuantity} className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>}
                </div>
            </td>
            <td className="px-6 py-4">
                <h6 className="text-red-500 text-xl  w-full max-w-[176px] text-center items-center flex">
                    {formatterMonney.format(quantity * (item.variantId ? item.variant?.discountPrice : item.product?.discountPrice))}
                </h6>
            </td>
            {!checkout &&
                <td className="px-6 py-4">
                    <MdOutlineDelete size={22} onClick={() => removeCartItem(item?.id)} className='text-gray-600 cursor-pointer' />
                </td>}

        </tr>
    )
}

export default CartItems
