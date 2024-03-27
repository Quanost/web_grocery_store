import React, { useState, useRef, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const DropdownSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const dropdownRef = useRef(null);

    const handleItemClick = (item) => {
        const index = selectedItems.indexOf(item);
        if (index === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const updatedItems = [...selectedItems];
            updatedItems.splice(index, 1);
            setSelectedItems(updatedItems);
        }
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
    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                className="items-center gap-1 font-main text-base inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>Loại trái cây</span>
                <IoMdArrowDropdown color='red' size={20} />
            </button>

            {isOpen && (
                <div className="z-10 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                onChange={() => handleItemClick('Rau ăn sống')}
                            />
                            <span className="ml-2">Cam</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                onChange={() => handleItemClick('Rau gia vị')}
                            />
                            <span className="ml-2">Bưởi</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                onChange={() => handleItemClick('Khác')}
                            />
                            <span className="ml-2">Xoài</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropdownSelect