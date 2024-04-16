import React, { useState } from 'react';
import { CiFilter } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import DropdownSelect from './DropdownSelect';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Filter = ({ value, changeValueSort, options }) => {
  const [isListVisible, setListVisible] = useState(true);
  const { namecategory } = useParams();
  const attributeStore = useSelector(state => state.attributes);

  return (
    <div className='w-full bg-white rounded-md py-1 shadow-lg'>
      <div className='flex gap-3 w-auto '>
        <div>
          <button class="border font-main text-base hover:bg-gray-200 text-gray-800  py-2 px-4 rounded-md inline-flex items-center gap-1">
            <CiFilter color='red' size={20} />
            <span>Bộ lọc</span>
          </button>
        </div>
        <div className='relative'>
          <button onClick={() => setListVisible(!isListVisible)} class="border font-main text-base hover:bg-gray-200 text-gray-800  py-2 px-4 rounded-md inline-flex items-center gap-1 group">
            <span>Sắp xếp theo</span>
            <IoMdArrowDropdown color='red' size={20} />
            {/* Show dropdown menu */}
            {isListVisible && (
              <div className='z-10 hidden absolute rounded-lg  bg-white shadow w-auto group-focus:block top-full left-0 mt-2'>
                <ul className='py-2 text-sm font-main text-gray-800' value={value} >
                  {options?.map(el => (
                    <li
                      key={el.id}
                      onClick={() => {
                        changeValueSort(el.value);
                        setListVisible(false);
                      }}
                      className='mb-2 rounded hover:shadow hover:bg-gray-100 py-2 flex justify-start px-3 border-b'
                    >
                      {el.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>

        </div>

        {/* <DropdownSelect name='Loại trái cây' /> */}
        {attributeStore?.attributes.attributes.map((attribute, index) => (
          <div key={index}>
            {Object.entries(attribute.value).map(([key, values]) => (
              <div key={key}>
                {key === namecategory &&
                  (
                    <div className='flex gap-1'>
                      {Object.entries(values).map((value, index) => (
                        <div key={index}>
                          {value[0].includes('Loại') && <DropdownSelect  n = {1}  name={value[0]} value={value[1]} />}
                          {value[0].includes('Thương hiệu') && <DropdownSelect  n = {2} name={value[0]} value={value[1].slice(0,12)} />}
                        </div>
                      ))}
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        ))}
        {/* {handleProductFilter()} */}


        {/* <div className='relative'>
          <button class="border font-main text-base hover:bg-gray-200 text-gray-800  py-2 px-4 rounded-md inline-flex items-center gap-1 group">
            <span>Loại</span>
            <IoMdArrowDropdown color='red' size={20} />
          
            <div className='z-10 hidden absolute rounded-lg  bg-white shadow  group-focus:block top-full left-0 mt-2'>
              <DropdownSelect />
            </div>
          </button>
        </div> */}
        {/* <div className='relative'>
          <button class="border font-main text-base hover:bg-gray-200 text-gray-800  py-2 px-4 rounded-md inline-flex items-center gap-1 group:">
            <span>Nhóm trái cây</span>
            <IoMdArrowDropdown color='red' size={20} />

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
        </div> */}
      </div>
    </div >
  )
}

export default Filter
