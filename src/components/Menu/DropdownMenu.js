import React, { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { apiGetCategories } from "../../apis/app";
import {useSelector} from 'react-redux';

const DropdownMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState({});
    const [categories, setCategories] = useState([]);
    const dropdownRef = useRef(null);
    const categoriesStore = useSelector(state =>state.appReducer)

  
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSubMenu = (categoryId) => {
        setSubMenuOpen({
            ...subMenuOpen,
            [categoryId]: !subMenuOpen[categoryId]
        });
    };

    const transformCategories = (data) => {
        return data.reduce((acc, item) => {
            if (!item.parentId) {
                // Nếu không có parentId, đây là một mục gốc
                acc.push({
                    id: item.id,
                    parentId: item.parentId,
                    name: item.name,
                    sub: []
                });
            } else {
                // Nếu có parentId, thêm vào mục con của mục có parentId tương ứng
                const parent = acc.find(parentItem => parentItem.id === item.parentId);
                if (parent) {
                    parent.sub.push({
                        id: item.id,
                        name: item.name
                    });
                }
            }
            return acc;
        }, []);
    };

    const TransFormCategories = async () => {
        try {
            if (categoriesStore.categories !== null) {
                const data = transformCategories(categoriesStore.categories);
                setCategories(data);
            } else {
                console.error('Error sever in fetching categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(() => {
        TransFormCategories();
    }, []);

    //onClose menu khi onclick khỏi menu
    useEffect(() => {
        const closeMenu = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", closeMenu);

        return () => {
            document.removeEventListener("mousedown", closeMenu);
        };
    }, []);

    return (
        <>
            <div className="relative " ref={dropdownRef}>
                <div className="flex justify-between items-center md:pr-0 pr-5 group" onClick={toggleMenu}>
                    <FaBars className='me-4' />
                    <span className='font-main'>Danh mục sản phẩm</span>
                </div>
                {menuOpen && (
                    <div className="z-30 absolute top-7 left-0 shadow-md rounded-md  w-[350px] group">
                        <div className="py-3">
                            <div
                                className="w-6 h-6 left-2 absolute mt-1 bg-gray-50 rotate-45"
                            ></div>
                        </div>
                        {categories.map((categoriesParent) => (
                            <div key={categoriesParent.id} className="bg-gray-50 p-3">
                                <div className='flex justify-between items-center ' onClick={() => toggleSubMenu(categoriesParent.id)}>
                                    <h1 className='text-base font-medium hover:text-red-400'>{categoriesParent.name}</h1>
                                    {!subMenuOpen[categoriesParent.id] ? <SlArrowDown /> : <SlArrowRight />}
                                </div>
                                {subMenuOpen[categoriesParent.id] && categoriesParent.sub.length > 0 && (
                                    <ul className='px-4 rounded-md mt-1'>
                                        {categoriesParent.sub.map((subMenu) => (
                                            <li key={subMenu.id} className="text-[15px] text-gray-600 mt-2 ml-3.5 list-none">
                                                <Link to="#" className="hover:text-red-400">
                                                    {subMenu.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default DropdownMenu
