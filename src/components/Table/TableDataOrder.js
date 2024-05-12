import React, { useState, useEffect } from 'react';
import { formatDateAndTime, formatterMonney } from '../../ultils/helper'
import { orderStatus, paymentStatus } from '../../ultils/contants'


const TableDataOrder = ({ actions, dataTable }) => {
    const [errorGetAPI, setErrorGetAPI] = useState(null);
    return (
        <div >
            <form className="rounded-sm border border-stroke bg-white w-full  pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className=" overflow-x-auto  ">
                    <table className="w-full table-auto overflow-scroll ">
                        <thead>
                            <tr className="bg-gray-200 text-base font-main font-medium text-left dark:bg-meta-4">
                                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">
                                    #
                                </th>
                                <th className="min-w-[190px] py-4 px-4 font-medium text-black dark:text-white ">
                                    Tên người đặt
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white ">
                                    Ngày đặt
                                </th>
                                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white ">
                                    Sản phẩm
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Tổng tiền
                                </th>
                                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                                    Trạng thái
                                </th>
                                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                                    Thanh toán
                                </th>
                                <th className="min-w-[190px] py-4 px-4 font-medium text-black dark:text-white">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {errorGetAPI ?
                                <tr className='w-full text-center text-lg font-main'>
                                    <td className='w-full' colSpan='100%'>
                                        {errorGetAPI}
                                    </td>
                                </tr>
                                :
                                <>
                                    {dataTable?.map((item, index) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                <p className="text-black dark:text-white">
                                                    {index + 1}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 ">
                                                <span className="text-black dark:text-white flex ">
                                                    {item.user?.firstName + ' ' + item.user?.lastName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-black dark:text-white">
                                                    {formatDateAndTime(item?.createdAt)}
                                                </p>
                                            </td>
                                            <td className="flex flex-col gap-2  items-start justify-start  w-full px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                {item?.orderItem?.map((orderItem, index) => (
                                                    <div className='flex gap-1 border-b w-full py-1' key={index}>
                                                        <img className="w-10 h-10 rounded-full" src={orderItem?.variantId ? orderItem?.variant?.thumbnail : orderItem?.product?.productGalleries?.[0].imageUrl}
                                                            alt="Ảnh sản phẩm" />
                                                        <div className="ps-3 w-full flex-nowrap flex flex-col justify-start items-start">
                                                            <p className="text-base font-semibold flex-wrap w-1/2">{orderItem.product?.name}</p>
                                                            <p className="font-normal text-gray-500">{orderItem?.variantId ? orderItem?.variant.unitPack : ''}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </td>

                                            <td className="px-6 py-4">
                                                <p className="text-black dark:text-white">
                                                    {formatterMonney.format(item.total)}
                                                </p>
                                            </td>
                                            <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-2 text-sm font-medium justify-center items-center
                                        ${false === false ?
                                                        'bg-success text-success'
                                                        :
                                                        'bg-warning text-warning'
                                                    }`}>
                                                   {orderStatus.find(el => el.value === item?.status)?.label}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-black dark:bg-green-200 bg-gray-200 rounded-full px-2 text-sm font-medium py-1 items-center">
                                                    {paymentStatus.find(el => el.value === item.paymentDetail?.status)?.label}
                                                </p>
                                            </td>

                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <div className="flex flex-col justify-start items-start  dark:text-red-200">
                                                    {actions?.map((actionitem, index) => (
                                                        <span key={index} className="hover:text-primary flex gap-2 items-start justify-start" onClick={(e) => actionitem.handleClick(e, item.id, item.status)} >
                                                            <p>{actionitem.icons}</p>
                                                            <p>{actionitem.action}</p>
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </>
                            }
                        </tbody>
                    </table>

                </div>
            </form>
        </div>
    )
}

export default TableDataOrder