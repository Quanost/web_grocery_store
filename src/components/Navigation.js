import React, {memo } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { CiHeadphones } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import DropdownMenu from './Menu/DropdownMenu';

const Navigation = () => {
    return (
        <nav className='border px-4 py-3 flex justify-between w-main bg-white'>
            <div className='flex items-center text-xl'>
                   <DropdownMenu/>
            </div>
           
            <div className='flex items-center gap-20'>
                <div className='flex items-center text-xl hover:text-red-600 cursor-pointer'>
                    <MdOutlineShoppingBag className=' me-2 ' />
                    <span className='font-main text-sm'>Sản phẩm đã mua</span>
                </div>
                <div className='flex items-center text-xl hover:text-red-600 cursor-pointer'>
                    <MdOutlineEmail className=' me-2 ' />
                    <span className='font-main text-sm'>Tin tức</span>
                </div>
                <div className='flex items-center text-xl hover:text-red-600 cursor-pointer'>
                    <CiHeadphones className=' me-2 ' />
                    <span className='font-main text-sm'>Tư vấn mua hàng</span>
                </div>
            </div>
        </nav>
    )
}

export default memo(Navigation)
