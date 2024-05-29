import React, { useState, useEffect } from 'react'
import icon from '../../ultils/icons'
import { apiReportRevenue } from '../../apis'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatDate, formatterMonney } from '../../ultils/helper';
import { orderStatus, paymentType } from '../../ultils/contants'
import path from '../../ultils/path'

const ReportRevenue = () => {
  const [errorGetAPI, setErrorGetAPI] = useState(null);
  const { FaRegEye } = icon
  const [revenue, setRevenue] = useState(null);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [statisticType, setStatisticType] = useState('month');

  const getRevenue = async (queries) => {
    const response = await apiReportRevenue(queries);
    if (response?.status === 200) {
      setRevenue(response?.data);
    } else if (response?.status === 404) {
      setErrorGetAPI('Không tìm thấy đơn hàng nào');
    }
  }

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (!queries.year) queries.year = 2024;
    setErrorGetAPI(null);
    getRevenue(queries)
  }, [params])

  const handelPageOrderDetail = (e, id) => {
    e.preventDefault()
    navigate(`/${path.ADMIN}/${path.ORDER_DETAIL}/${id}`)
  }

  const handleStatisticTypeChange = (e) => {
    setStatisticType(e.target.value);
    setParams(new URLSearchParams()); // Reset params when changing statistic type
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newParams = new URLSearchParams(params);
    newParams.set(name, value);
    setParams(newParams);
  };
  console.log('abc', revenue)
  return (
    <div className='dark:bg-strokedark dark:text-white min-h-screen'>
      <h1 className='h-[75px] flex justify-between items-center text-2xl font-medium font-main px-4 border-b'>
        Thống kê doanh thu
      </h1>
      <div className="flex justify-center my-4">
        <select value={statisticType} onChange={handleStatisticTypeChange} className="mr-4 p-2 border rounded">
          <option value="month">Thống kê theo tháng</option>
          <option value="year">Thống kê theo năm</option>
        </select>
        {statisticType === 'month' && (
          <>
            <select name="month" onChange={handleDateChange} className="mr-4 p-2 border rounded">
              <option value="">Chọn tháng</option>
              {[...Array(12).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select name="year" onChange={handleDateChange} className="p-2 border rounded">
              <option value="">Chọn năm</option>
              {[...Array(13).keys()].map(i => (
                <option key={2012 + i} value={2012 + i}>{2012 + i}</option>
              ))}
            </select>
          </>
        )}
        {statisticType === 'year' && (
          <select name="year" onChange={handleDateChange} className="p-2 border rounded">
            <option value="">Chọn năm</option>
            {[...Array(13).keys()].map(i => (
              <option key={2012 + i} value={2012 + i}>{2012 + i}</option>
            ))}
          </select>
        )}
      </div>
      <form className="w-[90%] mx-auto rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" overflow-x-auto  ">
          <table className="w-full table-auto overflow-scroll ">
            <thead>
              <tr className="bg-gray-200 text-base font-main font-medium text-left dark:bg-meta-4">
                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">
                  #
                </th>
                <th className="min-w-[190px] py-4 px-4 font-medium text-black dark:text-white ">
                  Tên người nhận
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white ">
                  Ngày đặt
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Ngày cập nhật
                </th>
                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                  Trạng thái
                </th>
                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                  Thanh toán
                </th>
                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                  Tổng tiền
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
                  {revenue?.revenue?.map((item, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                        <p className="text-black dark:text-white">
                          {index + 1}
                        </p>
                      </td>
                      <td className="px-6 py-4 ">
                        <span className="text-black dark:text-white flex ">
                          {item.address?.customerName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-black dark:text-white">
                          {formatDate(item.createdAt)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-black dark:text-white">
                          {formatDate(item.updatedAt)}
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
                        <p className="text-black dark:bg-green-200 bg-gray-200 rounded-full px-2 text-sm font-medium py-1 items-center text-center">
                          {paymentType.find(el => el.value === item?.paymentDetail?.paymentType)?.label}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-black dark:text-white">
                          {formatterMonney.format(item.total)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div onClick={(e) => handelPageOrderDetail(e, item?.id)} className="flex flex-col justify-start items-start  dark:text-red-200">
                          <span className="hover:text-primary flex gap-2 items-start justify-start">
                            <p><FaRegEye size={22} /></p>
                            <p>Xem chi tiết</p>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              }
            </tbody>
          </table>
        </div>
        <div className='my-5 flex gap-3'>
          <span className='font-main text-xl font-medium'>Tổng doanh thu: </span>
          <span className='font-main text-xl text-red-500'>{formatterMonney.format(revenue?.totalRevenue)} </span>
        </div>
      </form>
    </div>
  )
}

export default ReportRevenue