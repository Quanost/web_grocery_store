import React, { useState, useEffect } from 'react'
import { apiGetAllProduct, apiDeleteProduct } from '../../apis'
import { Pagination, InputTable, Button, Select, EditAvatar, DropdownCategories } from '../../components';
import { useSearchParams, useNavigate, useParams, createSearchParams, useLocation } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import icons from '../../ultils/icons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { userRoles, userStatus } from '../../ultils/contants';
import { formatDate, formatterMonney } from '../../ultils/helper';
import { Dropdown } from 'primereact/dropdown';
import UpdateProduct from './UpdateProduct';


const ManageProducts = () => {
  const { LiaUserEditSolid, MdCancelPresentation, MdOutlineDelete } = icons
  const [errorGetAPI, setErrorGetAPI] = useState(null);
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [params] = useSearchParams();
  const [queries, setQueries] = useState('');
  const [editProduct, setEditProduct] = useState(null);


  const [goToPage, setGoToPage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const getProducts = async (queries) => {
    setErrorGetAPI(null);
    const response = await apiGetAllProduct(queries = { ...queries, limit: 20, page: queries.page ? queries.page : 1 });
    if (response?.status === 200) {
      setProducts(response?.data.products);
      setPageInfo(response?.data.pageInfo);
    } else if (response?.status === 404) {
      setErrorGetAPI('Không tìm thấy sản phẩm');
    }
  }
  const renderGetProducts = () => {
    const queries = Object.fromEntries([...params]);
      setErrorGetAPI(null);
      getProducts(queries);
  }
  const handleGoToPage = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newPage = Number(goToPage);
      if (newPage >= 1 && newPage <= pageInfo?.page) {
        const queries = Object.fromEntries([...params])
        if (Number(newPage)) queries.page = Number(newPage)
        navigate({
          pathname: location.pathname,
          search: createSearchParams(queries).toString()
        })
      }
      setGoToPage('');
    }
  };
  const handleClickGoToPage = (event) => {
    event.preventDefault();
    const newPage = Number(goToPage);
    if (newPage >= 1 && newPage <= pageInfo?.page) {
      const queries = Object.fromEntries([...params])
      if (Number(newPage)) queries.page = Number(newPage)
      navigate({
        pathname: location.pathname,
        search: createSearchParams(queries).toString()
      })
    }
    setGoToPage('');
  }
  const handleSeach = (e) => {
    e.preventDefault();
    setErrorGetAPI(null);
    setQueries(e.target.value);

    if (e.target.value.trim() === '') {
      const queries = Object.fromEntries([...params]);
      setErrorGetAPI(null);
      getProducts(queries);
    }
  }

  const searchProducts = async (event) => {
    event.preventDefault();
    const params = {}
    if (queries?.length > 0) params.name = queries;
    if (!params.page) params.page = 1;
    getProducts(params);
  }


  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (!queries.page) queries.page = 1;
    setErrorGetAPI(null);
    getProducts(queries)
  }, [params])

  const handleDeleteProduct = (event, id) => {
    event.preventDefault();
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(id);
        if (response?.status === 200) {
          const queries = Object.fromEntries([...params]);
          getProducts(queries);
          toast.success('Xoá người dùng thành công')
        } else if (response?.status === "error") {
          toast.error('Xoá người dùng thất bại')
        }
      }
    })
  }

  return (
    <div className='dark:bg-strokedark dark:text-white min-h-screen'>
      {editProduct &&
        <div className='absolute z-20  bg-white  h-screen w-full overflow-auto'>
          <UpdateProduct editProduct={editProduct} setEditProduct={setEditProduct} renderGetProducts= {renderGetProducts}/>
        </div>
      }
      <h1 className='h-[75px] flex justify-between items-center text-2xl font-medium font-main px-4 border-b'>
        Quản lý sản phẩm
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-between py-4'>
          <div>
            <DropdownCategories getProducts={getProducts} />
          </div>
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
             dark:focus:border-blue-500" placeholder="Tìm theo tên ..." required />
            </div>
            <button onClick={searchProducts} type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Tìm kiếm</span>
            </button>
          </form>
        </div>
        <form className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-base font-main font-medium text-left dark:bg-meta-4">
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    #
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white ">
                    Hình ảnh
                  </th>
                  <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white ">
                    Tên sản phẩm
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white ">
                    Loại sản phẩm
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Giá sản phẩm
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Số lượng
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Trạng thái
                  </th>
                  <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
                    Đóng gói
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Ngày chỉnh sửa
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
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
                    {products?.map((product, key) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                          <p className="text-black dark:text-white">
                            {key + 1}
                          </p>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <img className="w-30 h-30 rounded-full object-cover" src={product.productGalleries[0]?.thumbnail} alt="Ảnh sản phẩm" />
                        </th>
                        <td className="px-6 py-4">
                          <p className="text-black dark:text-white">
                            {product.name}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-black dark:text-white">
                            {product.categories?.map((category, key) => (
                              <span key={key} className='text-sm'>{category.name}</span>
                            ))}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-black dark:text-white">
                            {formatterMonney.format(product.discountPrice)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-black dark:text-white">
                            {product.quantity}
                          </p>
                        </td>
                        <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                          <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                               ${product.hidden === false ?
                              'bg-success text-success'
                              :
                              'bg-warning text-warning'
                            }`}>
                            {product.hidden === false ? 'Đang bán' : 'Đã khoá'}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-black dark:text-white">
                            {product.variants?.length > 0 ?
                              product.variants.map((variant, key) => (
                                <span key={key}>
                                  <span className="inline-block bg-blue-500 rounded-full h-2 w-2 mr-2"></span>
                                  {variant.unitPack}<br />
                                </span>
                              )) :
                              product.unitPack
                            }
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-black dark:text-white bg-orange-200 rounded-full text-center ">
                            {formatDate(product.updatedAt)}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5 dark:text-red-200">
                            <span onClick={() => setEditProduct(product)} className="hover:text-primary">
                              <LiaUserEditSolid size={22} />
                            </span>

                            <span className="hover:text-primary" onClick={(e) => handleDeleteProduct(e, product?.id)} >
                              <MdOutlineDelete size={22} />
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
          {!errorGetAPI && (
            <div className='flex w-full justify-end mt-5 bg-red-300 gap-5 dark:bg-strokedark dark:text-white'>
              <Pagination page={pageInfo?.page} currentPage={pageInfo?.currentPage} />
              <input
                type='number'
                min='1'
                max={pageInfo?.page}
                value={goToPage}
                onChange={(e) => setGoToPage(e.target.value)}
                onKeyPress={handleGoToPage}
                className=' hide-number-arrows my-1 border-2 text-center'
              />
              <span className='border-2 border-red-300 bg-white rounded-lg my-1 -ml-2 px-2 hover:bg-red-50'
                onClick={handleClickGoToPage}
              >Go</span>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}

export default ManageProducts