import React, { memo, useState, useRef, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheckSquare } from "react-icons/fa";
import { createSearchParams, useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../store/app/asyncAction';
import icon from '../../ultils/icons'

const DropdownCategories = ({ getProducts }) => {
    const { SlArrowRight } = icon
    const [isOpen, setIsOpen] = useState(false);
    const [categorySub, setCategorySub] = useState(null);
    const [categorySelected, setCategorySelected] = useState(null);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const location = useLocation();
    const { categories } = useSelector(state => state.appReducer);

    useEffect(() => {
        if (!categories)
            dispatch(getCategories());
    }, [dispatch]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setCategorySub(null);
    };

    const handleMenuClick = (index) => {
        setCategorySub(index);
    };
    const handleItemClick = (items) => {
        setIsOpen(!isOpen);
        setCategorySelected(items);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (categorySelected) {
            const queries = Object.fromEntries([...params])
            if (categorySelected) queries.category_id = categorySelected
            navigate({
                pathname: location.pathname,
                search: createSearchParams(queries).toString()
            })
        }
    }, [categorySelected, params, navigate, location.pathname])

    return (
        <div className="relative shadow-default dark:border-strokedark dark:bg-boxdark" ref={dropdownRef}>
            <button
                type="button"
                className="items-center gap-1 font-main text-base inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={toggleDropdown}
            >
                <span>Loại sản phẩm</span>
                <IoMdArrowDropdown color='red' size={20} />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 z-10 bg-white shadow-lg rounded-md font-main text-base dark:border-strokedark dark:bg-boxdark">
                    <ul className="py-2">
                        {categories?.map((category, index) => (
                            <li key={index} className="relative">
                                <button onClick={() => handleMenuClick(index)} className={`flex justify-between px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-500 ${categorySub === index ? 'bg-gray-100 dark:bg-gray-500' : ''}`}>
                                    {category.name} <span className='pl-2'><SlArrowRight /></span>
                                </button>
                                {categorySub === index && (
                                    <ul className="absolute top-0 left-full ml-2 mt-0 w-55 bg-white shadow-lg rounded-md  dark:border-strokedark dark:bg-boxdark">
                                        {category?.sub?.map((item, subIndex) => (
                                            <li key={subIndex}>
                                                <button onClick={() => handleItemClick(item.id)} className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-500">{item.name}</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownCategories