import React, { useState } from 'react';
import { navigation } from '../ultils/contants';
import { NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { CiHeadphones } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";

// import Dropdownmenu from './Dropdownmenu';
import DropdownMenu from './Menu/DropdownMenu';

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <nav className='border px-4 py-3 flex justify-between w-main bg-white'>
            <div className='flex items-center text-xl'>
                {/* <FaBars className=' me-4 ' onClick={() => setShowMenu((prev) => !prev)} />
                <span className=' font-semibold font-main'>Danh mục sản phẩm</span>
                {!showMenu ? (
                    <span>aa</span>) :
                    (
                          <CiHeadphones className=' h-8 ' />
                       
                    )} */}
                   {/* <Dropdownmenu/> */}
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

export default Navigation
