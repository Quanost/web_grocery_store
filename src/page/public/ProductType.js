import React, { useCallback, useEffect, useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { Filter, BreadCrumbs, Pagination } from '../../components';
import CardProductType from '../../components/CardProductType';
import { apiGetAllProduct, apiGetSubCategory } from '../../apis';
import { useParams, useSearchParams, useNavigate, createSearchParams, Link } from 'react-router-dom';
import { sorts } from '../../ultils/contants';
import { NavLink } from "react-router-dom";

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
  const [errorGetAPI, setErrorGetAPI] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const [params] = useSearchParams();

  const getProducts = async (queries) => {
    const product = await apiGetAllProduct(queries = { ...queries, limit: 12, category_id: categoryId, page: queries.page? queries.page : 1});
    if (product?.status === 200) {
      setProducts(product?.data.products);
      setPageInfo(product?.data.pageInfo);
      setErrorGetAPI(null);
    } else if (product?.status === 404) {
      setErrorGetAPI('Không tìm thấy sản phẩm');
    }
  }
  const getSubCategory = async () => {
    const subCategory = await apiGetSubCategory(categoryId);
    if (subCategory?.status === 200) {
      setSubCategory(subCategory?.data.subCategories.parentCategory);
    }
  }

  useEffect(() => {
    getSubCategory();
  }, [categoryId])

  //set default page = 1 when user click to category
  useEffect(() => {
    const queries = {}
    for (let i of params) queries[i[0]] = i[1]
    if (!queries.page) queries.page = 1;
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
  }, [params, categoryId])


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
      navigate({
        pathname: `/${namecategory}/${categoryId}`,
        search: createSearchParams(queries).toString()
      })
    }
  }, [sort, categoryId, namecategory, navigate, params])

  console.log('categoriesID', categoryId)
  return (
    <div className='w-main flex'>
      <div className='flex flex-col gap-5 w-[25%] flex-auto border'>
        <div className='my-3 mx-3 font-main'>
          <div className='flex justify-between items-center ' onClick={handleToggleMenu}>
            <h1 className='text-lg  font-main'>{subCategory?.name}</h1>
            {!closeProductType ? <SlArrowDown /> : <SlArrowRight />}
          </div>
          {!closeProductType && (
            <div>
              <ul className='shadow-md py-2 px-4 rounded-md mt-1'>
                {subCategory && subCategory.subCategories && subCategory.subCategories.map((subtype, index) => (
                  <Link to={`/${subtype.name}/${subtype.id}?page=1`} className="hover:text-red-400">
                  <li key={index} className={`font-main border my-2 mx-2 p-2 rounded-md hover:bg-red-100 border-b py-1 
                 ${subtype.name === namecategory ? 'bg-red-100' : 'bg-gray-50'}`}>
                    {subtype.name}
                  </li>
                   </Link>
                ))}
              </ul>
            </div>

          )}
        </div>
        {/* <div className='font-main m-3'>
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
        </div> */}
      </div>
      <div className='flex flex-col px-1 gap-5 w-[75%] flex-auto border bg-slate-100'>
        <BreadCrumbs type={namecategory} />
        <Filter changeValueSort={changeValueSort} value={sort} options={sorts} />

        {errorGetAPI ?
          <div className='flex justify-center font-main text-lg'>
            {errorGetAPI}
          </div>
          :
          <div>
            <CardProductType title={namecategory} product={products} />
            <div className='bg-red-500 w-full m-auto my-4 flex justify-end'>
              <Pagination page={pageInfo?.page} currentPage={pageInfo?.currentPage} />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductType