import React, { useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import Filter from '../../components/Filter';
import CardProductType from '../../components/CardProductType'

const dataProductType = {
  id: 1,
  nameType: 'Rau củ quả',
  subType: ['Rau', 'củ', 'Quả'],
  trakemarks: ['https://cdn-crownx.winmart.vn/images/prod/logo-wineco-1.png', 'https://cdn-crownx.winmart.vn/images/prod/logo-wineco-1.png']
}
const ProductType = () => {
  const [closeProductType, setCloseProductType] = useState(false);
  const [closeTradeMarks, setCloseTradeMarks] = useState(false)

  const handleToggleMenu = () => {
    setCloseProductType(!closeProductType);
  };
  const handleToggleTrakemarks = () => {
    setCloseTradeMarks(!closeTradeMarks);
  };
  return (
    <div className='w-main flex'>
      <div className='flex flex-col gap-5 w-[25%] flex-auto border'>
        <div className='my-3 mx-3 font-main'>
          <div className='flex justify-between items-center ' onClick={handleToggleMenu}>
            <h1 className='text-lg font-medium'>{dataProductType.nameType}</h1>
            {!closeProductType ? <SlArrowDown /> : <SlArrowRight />}
          </div>
          {!closeProductType && (
            <ul className=' shadow-md py-2 px-4 rounded-md mt-1'>
              {dataProductType.subType.map((subtype, index) => (
                <li key={index} className='bg-gray-200 border my-2 mx-2 p-2 rounded-sm hover:bg-red-100 border-b py-1'>{subtype}</li>
              ))}
            </ul>
          )}
        </div>
        <div className='font-main m-3'>
          <div className='flex justify-between items-center ' onClick={handleToggleTrakemarks}>
            <h1 className='text-lg font-medium'>Thương hiệu</h1>
            {!closeTradeMarks ? <SlArrowDown /> : <SlArrowRight />}
          </div>
          {!closeTradeMarks && (
            <div className='grid grid-cols-2 gap-4 rounded-md mt-1'>
              {dataProductType.trakemarks.map((trakemark, index) => (
                <div key={index}>
                  <img src={trakemark} alt='Logo' className='max-w-full h-auto' />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col px-1 gap-5 w-[75%] flex-auto border bg-slate-100'>
        <nav className=" font-main rounded-md relative flex w-full flex-wrap items-center justify-between bg-white py-3 mt-2  text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <nav
              className="bg-grey-light w-full rounded-md"
              aria-label="breadcrumb"
            >
              <ol className="list-reset flex">
                <li>
                  <a
                    href="/"
                    className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >Trang chủ</a>
                </li>
                <li>
                  <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                </li>
                <li className="text-neutral-500 dark:text-neutral-400">Rau củ quả</li>
              </ol>
            </nav>
          </div>
        </nav>
        <Filter/>
        <CardProductType title="Sản Phẩm Khuyến Mãi"/>
        <CardProductType title="Rau củ quả"/>
      </div>
    </div>
  )
}

export default ProductType