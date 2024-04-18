import React, { memo, useState, useRef, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheckSquare } from "react-icons/fa";
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';


// const items = ['Cam', 'Bưởi', 'Xoài'];
const items = ['Rượu soju', 'Rượu vodka'];
const DropdownSelect = ({n, name, value }) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { namecategory, categoryId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); // biến tạm thời của selectedItems
    const [tempSelectedItem, setTempSelectedItem] = useState([]);
    const dropdownRef = useRef(null);

    const handleItemClick = (item) => {
        setSelectedItems(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };
    const handleTempItemClick = (item) => { // xử lý khi click vào button xem kết quả
        setTempSelectedItem(selectedItems);
        setIsOpen(false);
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
        let param = [];
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of params) queries[i[0]] = i[1]
        if (selectedItems.length > 0) {
            queries[`attr_name_${n}`] = name;
            queries[`attr_value_${n}`] = tempSelectedItem.join(',');
            queries.page = 1;
        } else {
            delete queries[`attr_name_${n}`];
            delete queries[`attr_name_${n}`];
        }
        navigate({
            pathname: `/${namecategory}/${categoryId}`,
            search: createSearchParams(
                queries
            ).toString()
        })

    }, [tempSelectedItem, categoryId, namecategory, navigate, params, selectedItems.length])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                className="items-center gap-1 font-main text-base inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{name}</span>
                <IoMdArrowDropdown color='red' size={20} />
            </button>

            {isOpen && (
                <div className="z-10 origin-top-right absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                        className="p-2 grid grid-cols-2 gap-2"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {Object.entries(value).map((item ,index) => (
                            <button 
                                key={index}
                                className={`border font-main h-full w-full rounded-md relative flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-900 ${selectedItems.includes(item[1]) ? 'bg-red-100' : ''}`}
                                onClick={() => handleItemClick(item[1])}
                            >
                                <div className="flex items-center justify-center w-full">
                                    <span>{item[1]}</span>
                                </div>
                                {selectedItems.includes(item[1]) && <FaCheckSquare color='red' className="absolute top-0 right-0" />}
                            </button>
                        ))}
                        
                    </div>
                    <div className='flex gap-3 border-t '>
                        <button
                            type="button"
                            className="font-main w-1/2 my-2 ml-2 h-10  rounded-md  border px-4 py-2 text-sm border-red-200 shadow-sm bg-white text-red-700 "
                            onClick={() => {
                                setSelectedItems([]);
                            }}
                        >
                            Bỏ chọn tất cả
                        </button>
                        <button
                            type="button"
                            className="font-main w-1/2 my-2 h-10 mr-2 rounded-md  border  text-sm border-red-200 shadow-sm bg-red-600   text-white "
                            onClick={handleTempItemClick}
                        >
                            Xem kết quả
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(DropdownSelect)