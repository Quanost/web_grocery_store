import React, {memo} from 'react';
import Logo from '../assets/image/Logo.png';
import SeachForm from './SeachForm';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const Header = () => {
    const { CgProfile, FaCartPlus, FaRegUserCircle, FiLogOut, FaRegUser } = icons
    return (
        <header className='bg-red-500 w-full'>
            <div className='mx-auto  w-main flex justify-between h-[110px] py-[35px]'>
                <div className='flex  items-center'>
                    <Link to={`/${path.HOME}`}>
                        <img src={Logo} alt='Logo' className='w-[300px] object-contain' />
                    </Link>
                </div>
                <div className='flex justify-center h-[100px]'>
                    <SeachForm />
                </div>
                <div className='flex text-[13px] '>
                    <div className='flex items-center border-r px-6 justify-center gap-2'>
                        <FaCartPlus size={35} color='white' opacity={10} />
                        <span className='font-main'>Giỏ hàng (0)</span>
                    </div>
                    <div className='flex items-center  px-4 justify-center relative'>
                        <Link to={`/${path.LOGIN}`}>
                        <button className='text-white group'>
                            <FaRegUserCircle size={35} color='white' />
                            {/* <div className='z-10 hidden absolute rounded-lg  bg-white shadow w-32 group-focus:block top-full right-0'>
                                <ul className='py-2 text-sm text-gray-800'>
                                    <li className='mb-2 rounded hover:shadow hover:bg-blue-100 py-2'>
                                        <a href='' className='px-3'>
                                            <FaRegUser className='inline-block w-4 h-4 mr-3 -mt-2' />
                                            Tài khoản
                                        </a>
                                    </li>
                                    <li className='mb-2 rounded hover:shadow hover:bg-blue-100 py-2'>
                                        <a href='' className='px-3'>
                                            <FiLogOut className='inline-block w-4 h-4 mr-3 -mt-2' />
                                            Đăng xuất
                                        </a>
                                    </li>

                                </ul>
                            </div> */}
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)