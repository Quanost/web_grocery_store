import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../ultils/dataMenu";
import { FaBars } from "react-icons/fa6";
import { apiGetCategories } from "../apis/app";

const Dropdownmenu = () => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [categories, setCategories] = useState([]);

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
    console.log("status", categories)
    return (
        <>
            {/* {links.map((link) => (
                <div>
                    <div className="px-3 text-left md:cursor-pointer group">
                        <div
                            className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
                            onClick={() => {
                                heading !== link.name ? setHeading(link.name) : setHeading("");
                                setSubHeading("");
                            }}>
                            <FaBars className=' me-4 ' />
                            <span className='font-main'>{link.name}</span>
                        </div>
                        {link.submenu && (
                            <div>
                                <div className="absolute top-40 hidden group-hover:md:block hover:md:block z-10">
                                    <div className="py-3">
                                        <div
                                            className="w-4 h-4 left-3 absolute mt-1 bg-gray-100 rotate-45"
                                        ></div>
                                    </div>
                                    <div className="bg-gray-100 p-5 grid grid-cols-5 ">
                                        {link.sublinks.map((mysublinks) => (
                                            <div className="mx-2 my-2">
                                                <h1 className="text-sm font-main text-black hover:text-red-400">
                                                    {mysublinks.Head}
                                                </h1>
                                                {mysublinks.sublink.map((slink) => (
                                                    <li className="text-[13px] text-gray-600 my-2 ml-3.5 list-none">
                                                        <Link
                                                            to={slink.link}
                                                            className="hover:text-red-400"
                                                        >
                                                            {slink.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> 
                </div>
            ))} */}

            <div>
                <div className="px-3 text-left md:cursor-pointer group">
                    <div
                        className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
                        onClick={() => {
                            heading !== "Danh mục sản phẩm" ? setHeading("Danh mục sản phẩm") : setHeading("");
                            setSubHeading("");
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
                                {categories.map((categoriesParent) => (
                                    <div className="mx-2 my-2">
                                        <h1 className="text-sm font-main text-black hover:text-red-400">
                                            {categoriesParent.name}
                                        </h1>
                                        {categoriesParent.sub.length > 0 && (
                                            <ul>
                                                {categoriesParent.sub.map((subMenu) =>(
                                                    <li className="text-[13px] text-gray-600 my-2 ml-3.5 list-none">
                                                    <Link

                                                        className="hover:text-red-400"
                                                    >
                                                        {subMenu.name}
                                                    </Link>
                                                </li>
                                                ))}
                                                
                                            </ul>
                                        )}

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Dropdownmenu;