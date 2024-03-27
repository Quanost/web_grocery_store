import React, { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { apiGetCategories } from "../../apis/app";

const DropdownMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState({});
    const [categories, setCategories] = useState([]);
    const dropdownRef = useRef(null);

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

    const fetchCategories = async () => {
        try {
            const response = await apiGetCategories();
            if (response.status === 200) {
                const data = transformCategories(response.data);
                setCategories(data);
            } else {
                console.error('Error sever in fetching categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(() => {
        fetchCategories();
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



            {/* <div>
                <div className="px-3 text-left md:cursor-pointer group">
                    <div
                        className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
                        onClick={() => {
                            heading !== "Danh mục sản phẩm" ? setHeading("Danh mục sản phẩm") : setHeading("");
                           
                        }}>
                        <FaBars className=' me-4 ' />
                        <span className='font-main'>Danh mục sản phẩm</span>
                    </div>
                    <div>
                        <div className="absolute top-40 hidden group-hover:md:block hover:md:block z-10">
                            <div className="py-3">
                                <div
                                    className="w-4 h-4 left-3 absolute mt-1 bg-gray-100 rotate-45"
                                ></div>
                            </div>
                            <div className="bg-gray-100 p-5 grid grid-cols-5 ">
                               
                                    <div className="mx-2 my-2">
                                        <h1 className="text-sm font-main text-black hover:text-red-400">
                                            Head
                                        </h1>
                                       
                                            <ul>
                                                
                                                    <li className="text-[13px] text-gray-600 my-2 ml-3.5 list-none">
                                                    <Link

                                                        className="hover:text-red-400"
                                                    >
                                                        Name
                                                    </Link>
                                                </li>
                                              
                                                
                                            </ul>
                                        

                                    </div>
                               

                            </div>
                        </div>
                    </div>

                </div>
            </div> */}
        </>
    )
}

export default DropdownMenu
