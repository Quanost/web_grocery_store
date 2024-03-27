import React from 'react';
import { CiFilter } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import DropdownSelect from './DropdownSelect';


const DataSapXep = [
  {
    id: 1,
    title: 'Khuyến mãi',
    link: '#'
  },
  {
    id: 2,
    title: 'Giá từ cao đến thấp',
    link: '#'
  },
  {
    id: 3,
    title: 'Giá từ thấp đến cao',
    link: '#'
  },
  {
    id: 4,
    title: 'Bán chạy',
    link: '#'
  },
]

const Filter = () => {
  return (
    <div className='w-full bg-white rounded-md py-1 shadow-lg'>
      <div className='flex justify-between w-[580px] '>
        <div>
          <button class="border font-main text-base hover:bg-gray-200 text-gray-800  py-2 px-4 rounded-md inline-flex items-center gap-1">
            <CiFilter color='red' size={20} />
            <span>Bộ lọc</span>
          </button>
        </div>
        <div className='relative'>
          <button class="border font-main text-base hover:bg-gray-200 text-gray-800  py-2 px-4 rounded-md inline-flex items-center gap-1 group">
            <span>Sắp xếp theo</span>
            <IoMdArrowDropdown color='red' size={20} />
            {/* Show dropdown menu */}
            <div className='z-10 hidden absolute rounded-lg  bg-white shadow w-auto group-focus:block top-full left-0 mt-2'>
              <ul className='py-2 text-sm font-main text-gray-800'>
                {DataSapXep.map((data) => (
                  <li className='mb-2 rounded hover:shadow hover:bg-gray-100 py-2 flex justify-start px-3 border-b'>
                    <a href={data.link} className=''>
                      {data.title}
                    </a>
                  </li>
                ))}

              </ul>
            </div>
          </button>

        </div>
        <DropdownSelect />
        {/* <div className='relative'>
          <button class="border font-main text-base hover:bg-gray-200 text-gray-800  py-2 px-4 rounded-md inline-flex items-center gap-1 group">
            <span>Loại</span>
            <IoMdArrowDropdown color='red' size={20} />
          
            <div className='z-10 hidden absolute rounded-lg  bg-white shadow  group-focus:block top-full left-0 mt-2'>
              <DropdownSelect />
            </div>
          </button>
        </div> */}
        <div>
          <button class="border font-main text-base hover:bg-gray-200 text-gray-800  py-2 px-4 rounded-md inline-flex items-center gap-1">
            <span>Nhóm trái cây</span>
            <IoMdArrowDropdown color='red' size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter
