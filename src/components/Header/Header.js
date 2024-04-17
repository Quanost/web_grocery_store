import React, { memo, useState, useEffect } from 'react';
import Logo from '../../assets/image/Logo.png';
import SeachForm from '../Common/SeachForm';
import icons from '../../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';
import { logout } from '../../store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const { FaCartPlus, FaRegUserCircle, FiLogOut, FaRegUser, MdOutlineCardTravel } = icons
    // const [user, setUser] = useState(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const localStorageData = window.localStorage.getItem('persist:/shop/user');
    const dispatch = useDispatch()
    const { isLoggedIn, current } = useSelector(state => state.user);
    // useEffect(() => {
    //     if (localStorageData) {
    //         const userData = JSON.parse(JSON.parse(localStorageData).current);
    //         const isLogin = JSON.parse(JSON.parse(localStorageData).isLoggedIn);
    //         setUser(userData);
    //         // setIsLoggedIn(isLogin);
    //     }
    // }, [localStorageData]); // Sử dụng localStorageData trong mảng dependency của useEffect để trigger reload khi có thay đổi

    const handleLogout = async () => {
        dispatch(logout());
        navigate(`/${path.LOGIN}`);
    };

    const handlePage = (role) => {
        if (role === 'MANAGER')
            navigate(`/${path.ADMIN}/${path.DASHBOARD}`);
        else if (role === 'STAFF')
            navigate(`/${path.MEMBER}/${path.PERSONAL}`);
    }
    const handlePageHistoryOrder = () => {
        navigate(`/${path.MEMBER}/${path.PURCHASE_HISTORY}`);
    }
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

                        {isLoggedIn && current ? (
                            <button className='text-white group'>
                                <div className='flex items-center gap-2'>
                                    <FaRegUserCircle size={35} color='white' />
                                    <span className='text-white font-main text-base'>{current?.lastName}</span>
                                </div>
                                <div className='z-10 hidden absolute rounded-lg  bg-white shadow w-44 group-focus:block top-full right-0'>
                                    <ul className='py-2 text-sm font-main text-gray-800 flex flex-col items-start'>
                                        <li className='mb-2 flex items-start w-full rounded hover:shadow hover:bg-blue-100 py-2'>
                                            <span href='' className='px-3' onClick={() => handlePage(current?.role)}>
                                                <FaRegUser className='inline-block w-4 h-4 mr-3 -mt-2' />
                                                Tài khoản
                                            </span>
                                        </li>
                                        <li className='mb-2 flex items-start rounded hover:shadow hover:bg-blue-100 py-2'>
                                            <span href='' className='px-3' onClick={() => handlePageHistoryOrder()}>
                                                <MdOutlineCardTravel className='inline-block w-4 h-4 mr-3 -mt-2' />
                                                Đơn hàng từng mua
                                            </span>
                                        </li>
                                        <li className='mb-2  flex items-start w-full rounded hover:shadow hover:bg-blue-100 py-2' >
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