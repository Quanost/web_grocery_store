import React, { useState, useEffect, useRef } from 'react';
import icons from '../../ultils/icons';
import { apiGetProductById } from '../../apis';
import { BannerProductDetail, BannerSameProduct, EvaluateProduct, SelectGroup,BreadCrumbs, Star } from '../../components';
import { useParams } from 'react-router-dom';
import { formatterMonney } from '../../ultils/helper'

const ProductDetail = () => {
  const [readMore, setReadMore] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  const { SlArrowDown, SlArrowLeft, FaStar } = icons
  const { category, title,pid } = useParams()
  const [product, setProduct] = useState(null);
  const [loadingProductSame, setloadingProductSame] = useState(true);

  const ref = useRef(null);
  const paragraphStyles = {
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box'
  }
  const fetchProduct = async () => {
    const response = await apiGetProductById(pid)
    if (response?.status === 200)
      setProduct(response?.data);
      setloadingProductSame(false);
  }
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  useEffect(() => {
    if (pid)
      fetchProduct()
    window.scrollTo(0, 0)
  }, [pid])

  useEffect(() => {
    const handleResize = () => {
      setShowReadMore(ref.current.scrollHeight > ref.current.clientHeight);
    };
    // chờ mô tả được render xong mới tiến hành kiểm tra chiều cao
    if (ref.current) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);
  
  return (
    <div className='w-main inline-block bg-slate-100'>
      <BreadCrumbs type={category} name={title} />
      <div className='flex'>
        <div className='flex flex-col gap-5 w-[60%] flex-auto bg-white mt-3'>
          <div className='m-3'>
            <BannerProductDetail images={product?.productGalleries} />
          </div>
          <div className='m-3 inline-block'>
            <h1 className='font-main font-medium text-xl'>Thông tin sản phẩm</h1>
            <div >

              <div style={readMore ? null : paragraphStyles} ref={ref}>
                <p>{product?.description}</p>
                {/* Table */}
                <div className="flex flex-col mt-5">
                  <div className="overflow-hidden border border-gray-300 rounded-lg">
                    {product?.attributes?.map((attributes) => (
                      <div className="grid grid-cols-4 border-b font-main text-base">
                        <div className="pl-4 py-2 bg-gray-100 border-r border-gray-300 col-span-1">{attributes.name}:</div>
                        <div className="py-2 border-gray-300 pl-4 text-left col-span-3">{attributes.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {showReadMore && (
              <div className="font-main font-medium mx-auto max-w-sm text-center rounded-md h-5 my-3" onClick={toggleReadMore}>
                <span className="text-sm font-main sm:text-base text-red-500 py-2 font-b flex justify-center">
                  {readMore ? 'Thu gọn' : 'Xem thêm'}
                  <SlArrowDown className='flex justify-center mx-2 mt-1' />
                </span>
              </div>
            )}
          </div>

          {!loadingProductSame && (
            <div className='m-3'>
              <h1 className='font-main font-medium text-xl my-5'>Sản phẩm liên quan</h1>
              <BannerSameProduct categoryId={product?.categories[0].id} />
            </div>
          )}

          {/* Đánh giá sản phẩm
          <div className='m-3 border rounded-xl'>
            <div className='pl-5'>
              <h1 className='font-main font-medium text-2xl my-5'>Đánh giá</h1>
              <EvaluateProduct />
            </div>
          </div> */}
        </div>

        {/* Lề phải -- phân loại sản phẩm */}
        <div className='flex flex-col gap-5 w-[40%] flex-auto mt-3 ml-3 bg-white'>
          <div className='ml-3 my-3'>
            <h1 className='font-main text-xl font-medium'>{product?.name}</h1>
            {/* <div className='flex items-center justify-start'>
              <p className='text-xl font-main text-orange-400 mx-2'>4.8</p>
              <FaStar color='orange' size={15} />
              <p className='font-main text-base mx-5 text-blue-600'>Xem 15 đánh giá</p>
            </div> */}
            {product && product?.variants && product?.variants?.length > 0 ? (
                <div className='my-3'>
                  <h1 className='font-main font-medium text-base my-5'>Chọn sản phẩm mua</h1>
                  <SelectGroup variantdefault='' variant={product?.variants} />
                </div>
              ) : (
                  <div className='text-2xl my-3 font-main text-red-800'>
                    {formatterMonney.format(product?.discountPrice)}
                  </div>
                )
            }

            <button className='font-main text-xl font-medium bg-red-500 text-white h-10 w-full mt-5'>Mua</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetail