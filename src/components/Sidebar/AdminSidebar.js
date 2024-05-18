import React, { memo, useState } from 'react'
import icons from '../../ultils/icons';
import { AdminSidebarMenus } from '../../ultils/contants';
import { NavLink, useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/user/userSlice'

const AdminSidebar = () => {
    const { SlArrowRight, FaUserCircle, FaChevronDown, CiLogout, FaRegUser, IoHomeOutline } = icons
    const [isOpen, setIsOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { current } = useSelector(state => state.user)

    const handleLogout = async () => {
        navigate(`/${path.LOGIN}`);
        dispatch(logout());
    };
    return (
        <div className={`bg-dark-purple h-full p-5 pt-8 relative
        ${isOpen ? 'w-72' : 'w-20'} duration-300 `}>
            <SlArrowRight className={`bg-white text-dark-purple text-3xl asbolute z-10
           rounded-full absolute -right-3 top-9 border
           border-dark-purple cursor-pointer ${!isOpen && 'rotate-180'}`}
                onClick={() => setIsOpen(!isOpen)} />
            <div className='inline-flex'>
                <FaUserCircle className={` bg-amber-300 text-4xl rounded 
                cursor-pointer block float-left mr-2 duration-500 ${isOpen && 'rotate-[360deg]'}`} />
                <h1 className={`text-white origin-left font-medium text-2xl ${!isOpen && 'scale-0'}`}>{current?.role}</h1>
            </div>
            <ul className='pt- flex flex-col justify-between h-[95%] text-gray'>
                <div>
                    {AdminSidebarMenus.map((menu, index) => (
                        <>
                            <NavLink to={menu.path} >
                                <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md
                    ${menu.spacing ? 'mt-9' : 'mt-2'}`}>
                                    <span className='text-2xl block float-left'>
                                        {menu.icon ? menu.icon : '👋'}
                                    </span>
                                    <span className={`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`}>
                                        {menu.title}
                                    </span>
                                    {menu.submenu && isOpen && (
                                        <FaChevronDown className={` ${submenuOpen && 'rotate-180'}`} onClick={() => setSubmenuOpen(!submenuOpen)} />
                                    )}
                                </li>
                            </NavLink>
                            {menu.submenu && submenuOpen && isOpen && (
                                <ul>
                                    {menu.submenuItems.map((submenu, index) => (
                                        <NavLink to={submenu.path}>
                                            <li key={index} className='text-gray-300 text-sm flex ml-12 items-center gap-x-4 cursor-pointer p-2 px-5  hover:bg-light-white rounded-md'>
                                                {submenu.title}
                                            </li>
                                        </NavLink>
                                    ))}
                                </ul>
                            )}
                        </>
                    ))}
                </div>
                <div>
                    <NavLink to={`/${path.HOME}`}>
                        <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}>
                            <span className='text-2xl block float-left'>
                                <IoHomeOutline />
                            </span>
                            <span className={`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`}>
                                Trang chủ
                            </span>
                        </li>
                    </NavLink>
                    <NavLink to={`/${path.ADMIN}/${path.PERSONAL}`}>
                        <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}>
                            <span className='text-2xl block float-left'>
                                <FaRegUser />
                            </span>
                            <span className={`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`}>
                                Tài khoản
                            </span>
                        </li>
                    </NavLink>
                    <li onClick={handleLogout} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}>
                        <span className='text-2xl block float-left'>
                            <CiLogout />
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`}>
                            Đăng xuất
                        </span>
                    </li>

                </div>
            </ul>
        </div>
    )
}

export default memo(AdminSidebar)
