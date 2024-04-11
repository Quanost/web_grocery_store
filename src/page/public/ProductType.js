import React, { useCallback, useEffect, useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { Filter, BreadCrumbs, Pagination } from '../../components';
import CardProductType from '../../components/CardProductType';
import { apiGetAllProduct } from '../../apis';
import { useParams, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { sorts } from '../../ultils/contants';

const dataProductType = {
  id: 1,
  nameType: 'Rau củ quả',
  subType: ['Rau', 'củ', 'Quả'],
  trakemarks: ['https://cdn-crownx.winmart.vn/images/prod/logo-wineco-1.png', 'https://cdn-crownx.winmart.vn/images/prod/logo-wineco-1.png']
}
const ProductType = () => {
  const navigate = useNavigate();
  const [closeProductType, setCloseProductType] = useState(false);
  const [closeTradeMarks, setCloseTradeMarks] = useState(false);
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const { namecategory, categoryId } = useParams();
  const [sort, setSort] = useState(''); // sort by newest, price asc, price desc

  const [params] = useSearchParams();




  const getProducts = async (queries) => {
    const product = await apiGetAllProduct(queries);
    if (product.status === 200) {
      setProducts(product.data.products);
      setPageInfo(product.data.pageInfo);
    }
  }
  
  //set default page = 1 when user click to category
  useEffect(() => {
    const queries = {}
    for (let i of params) queries[i[0]] = i[1]
    if (!queries.page) queries.page = 1;
    if (!queries.category_id) queries.category_id = categoryId
    navigate({
      pathname: `/${namecategory}/${categoryId}`,
      search: createSearchParams(queries).toString()
    })
  }, [categoryId, namecategory, navigate, params]);
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for (let i of params) queries[i[0]] = i[1]
    getProducts(queries)
  }, [params])


  const handleToggleMenu = () => {
    setCloseProductType(!closeProductType);
  };
  const handleToggleTrakemarks = () => {
    setCloseTradeMarks(!closeTradeMarks);
  };

  const changeValueSort = useCallback((value) => {
    setSort(value)
  }, [])

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for (let i of params) queries[i[0]] = i[1]
    if (sort) {
      queries.sort = sort;
      queries.page = 1;
      navigate({
        pathname: `/${namecategory}/${categoryId}`,
        search: createSearchParams(queries).toString()
      })
    }
  }, [sort, categoryId, namecategory, navigate, params])

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
        <BreadCrumbs type={namecategory} />
        <Filter changeValueSort={changeValueSort} value={sort} options={sorts} />
        <CardProductType title="Sản Phẩm Khuyến Mãi" product={products} />
        {/* <CardProductType title={namecategory} product={products} /> */}
        <div className='bg-red-500 w-full m-auto my-4 flex justify-end'>
          <Pagination page={pageInfo?.page} currentPage={pageInfo?.currentPage} />
        </div>
      </div>
    </div>
  )
}

export default ProductType