import React from 'react';
import icon from '../../ultils/icons'

const PurchaseHistory = () => {
  const { SlArrowRight } = icon
  return (
    <div className='bg-slate-50'>
      <h2 className="title font-main font-medium text-2xl leading-3 mb-8 text-center border bg-white h-14 pt-5">
        Đơn hàng từng mua
      </h2>
      <div className='mx-40 bg-white px-10 rounded-lg shadow-2 mb-5'>
        <div className='flex justify-between pt-3'>
          <p className='font-main text-lg'>Ngày đặt: <span className='font-main text-md font-bold ml-2'>Ngày đặt</span></p>
          <p className='font-main text-lg '>Trạng thái: <span className='font-main text-md ml-2'>Trạng thái của đơn</span></p>
        </div>
        <div className='flex justify-between pt-2'>
          <p className='font-main text-lg'>Mã đơn: <span className='font-main text-sm text-gray-500 ml-2'>8f02b37b-1a1b-42e3-8f35-e3cbfb59d084t</span></p>
          <p className='font-main text-lg '>Tổng tiền: <span className='font-main text-md ml-2'>44.000 đ</span></p>
        </div>

        <div className='flex flex-grow items-center px-6 py-4 text-gray-900  dark:text-white'>
          <img className='w-25 h-25 object-cover' src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_173x173/https://cdn.tgdd.vn/Products/Images/2443/262237/bhx/6-lon-nuoc-ngot-pepsi-cola-sleek-245ml-202402011350006420_300x300.png" />
          <div className="w-full max-w-sm pl-2 top-0">
            <h5 className="font-main font-normal text-lg leading-5 text-black max-[550px]:text-center">
              Tên sản phẩm
            </h5>
            <p className="font-main font-normal text-base  my-2 min-[550px]:my-3 max-[550px]:text-center">
              Tên biến thể
            </p>
          </div>
        </div>
        <div className='flex flex-grow items-center px-6 py-4 text-gray-900  dark:text-white'>
          <img className='w-25 h-25 object-cover' src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_173x173/https://cdn.tgdd.vn/Products/Images/2443/262237/bhx/6-lon-nuoc-ngot-pepsi-cola-sleek-245ml-202402011350006420_300x300.png" />
          <div className="w-full max-w-sm pl-2 top-0">
            <h5 className="font-main font-normal text-lg leading-5 text-black max-[550px]:text-center">
              Tên sản phẩm
            </h5>
            <p className="font-main font-normal text-base  my-2 min-[550px]:my-3 max-[550px]:text-center">
              Tên biến thể
            </p>
          </div>
        </div>
        <span className='font-main text-lg text-red-500 my-2 flex justify-end items-center gap-1 cursor-pointer'>Xem chi tiết <SlArrowRight size={13}/></span>
        <div className='flex justify-between'>
          <button type="button" className="w-80 h-12 font-main text-md text-red-600 bg-white border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Đánh giá
          </button>
          <button type="button" className="w-80 h-12 font-main text-md text-red-600 bg-white border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Mua lại đơn hàng
          </button>
        </div>
      </div>
    </div>
  )
}

export default PurchaseHistory