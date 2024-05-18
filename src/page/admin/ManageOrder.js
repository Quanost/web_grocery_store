import React, { useState, useEffect } from 'react'
import { apiGetAllProduct, apiDeleteProduct, apiGetOrders } from '../../apis'
import { Pagination, DropdownCategories, Tabview } from '../../components';
import { useSearchParams, useNavigate, useParams, createSearchParams, useLocation } from 'react-router-dom';
import icons from '../../ultils/icons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formatDate, formatterMonney } from '../../ultils/helper';
import UpdateProduct from './UpdateProduct';


const ManageOrder = () => {

  const [errorGetAPI, setErrorGetAPI] = useState(null);
  const [orders, setOrders] = useState([]);
  const [params] = useSearchParams();
  const [queries, setQueries] = useState('');


  const navigate = useNavigate();
  const location = useLocation();

  const getOrders = async (queries) => {
    setErrorGetAPI(null);
    const response = await apiGetOrders(queries);
    if (response?.status === 200) {
      setOrders(response?.data);
    } else if (response?.status === 404) {
      setErrorGetAPI('Không tìm thấy đơn hàng nào');
    }
  }


  const handleSeach = (e) => {
    e.preventDefault();
    setErrorGetAPI(null);
    setQueries(e.target.value);

    if (e.target.value.trim() === '') {
      const queries = Object.fromEntries([...params]);
      setErrorGetAPI(null);
      getOrders(queries);
    }
  }

  const searchProducts = async (event) => {
    event.preventDefault();
    const params = {}
    if (queries?.length > 0) params.username = queries;
    getOrders(params);
  }


  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    getOrders(queries)
  }, [params])

  return (
    <div className='dark:bg-strokedark dark:text-white min-h-screen'>
      <h1 className='h-[75px] flex justify-between items-center text-2xl font-medium font-main px-4 border-b'>
        Quản lý đơn hàng
      </h1>
      <div className='w-full p-4 dark:bg-strokedark dark:text-white'>
        <div className='flex justify-end py-4'>
          <form className="flex justify-end items-center w-96  ">
            <label htmlFor="simple-search" className="sr-only">Tìm kiếm</label>
            <div className="relative w-full">
              <div className="absolute z-0 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                </svg>
              </div>
              <input type="text" onChange={handleSeach} id="simple-search" className="bg-gray-50 font-main  border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
             dark:focus:border-blue-500" placeholder="Tìm theo tên khách hàng ..." required />
            </div>
            <button onClick={searchProducts} type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Tìm kiếm</span>
            </button>
          </form>
        </div>
        <Tabview dataTable={orders && orders} errorGetAPI={errorGetAPI} navigate={navigate} getOrders={getOrders} />
      </div>
    </div>
  )
}

export default ManageOrder