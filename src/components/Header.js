import React, { memo, useState, useEffect } from 'react';
import Logo from '../assets/image/Logo.png';
import SeachForm from './SeachForm';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
import { logout } from '../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const { CgProfile, FaCartPlus, FaRegUserCircle, FiLogOut, FaRegUser } = icons
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch()
    const localStorageData = window.localStorage.getItem('persist:/shop/user');

    useEffect(() => {
        if (localStorageData) {
            const userData = JSON.parse(JSON.parse(localStorageData).current);
            const isLogin = JSON.parse(JSON.parse(localStorageData).isLoggedIn);
            setUser(userData);
            setIsLoggedIn(isLogin);
        }
    }, [localStorageData]); // Sử dụng localStorageData trong mảng dependency của useEffect để trigger reload khi có thay đổi

    const handleLogout = async() => {
        dispatch(logout());
        navigate(`/${path.LOGIN}`);
    };

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
                <div className='flex text-[13px]'>
                    <div className='flex items-center border-r px-6 justify-center gap-2'>
                        <FaCartPlus size={35} color='white' opacity={10} />
                        <span className='font-main text-base text-white'>Giỏ hàng (0)</span>
                    </div>
                    <div className='flex items-center  px-4 justify-center relative'>

                        {isLoggedIn ? (
                            <button className='text-white group'>
                                <div className='flex items-center gap-2'>
                                    <FaRegUserCircle size={35} color='white' />
                                    <span className='text-white font-main text-base'>{user.lastName}</span>
                                </div>
                                <div className='z-10 hidden absolute rounded-lg  bg-white shadow w-32 group-focus:block top-full right-0'>
                                    <ul className='py-2 text-sm text-gray-800'>
                                        <li className='mb-2 rounded hover:shadow hover:bg-blue-100 py-2'>
                                            <a href='' className='px-3'>
                                                <FaRegUser className='inline-block w-4 h-4 mr-3 -mt-2' />
                                                Tài khoản
                                            </a>
                                        </li>
                                        <li className='mb-2 rounded hover:shadow hover:bg-blue-100 py-2' >
                                            <span href='' className='px-3' onClick={handleLogout}>
                                                <FiLogOut className='inline-block w-4 h-4 mr-3 -mt-2' />
                                                Đăng xuất
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </button>
                        ) : (
                            <div className='flex gap-5'>
                                <Link to={`/${path.LOGIN}`}>
                                    <div className='flex items-center gap-2'>
                                        <FaRegUserCircle size={35} color='white' />
                                        <span className='text-white font-main text-base'>Đăng nhập</span>
                                    </div>
                                </Link>
                            </div>

                        )}

                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)