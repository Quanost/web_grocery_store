import React, { useState, useEffect, useRef } from 'react';
import icons from '../../ultils/icons';
import { apiGetProductById, apiUpdateCart } from '../../apis';
import { BannerProductDetail, BannerSameProduct, EvaluateProduct, SelectGroup, BreadCrumbs, Star, DialogVariantsProduct } from '../../components';
import { useParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { formatterMonney } from '../../ultils/helper'
import { useDispatch, useSelector } from 'react-redux';
import path from '../../ultils/path';
import { toast } from 'react-toastify'
import Swal from "sweetalert2";
import { getUserCurrent } from "../../store/user/asynActionUser";
import { updateCart } from '../../store/user/userSlice';


const ProductDetail = () => {
  const [readMore, setReadMore] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showReadMore, setShowReadMore] = useState(false)
  const { SlArrowDown, SlArrowLeft, FaStar } = icons
  const { category, title, pid } = useParams()
  const [product, setProduct] = useState(null);
  const [loadingProductSame, setloadingProductSame] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = useState(false);

  const { current, currentCart } = useSelector(state => state.user)

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

  const handleVariantChange = (variantSelected) => { // onChange selected variant product
    setSelectedVariant(variantSelected);
  }


  useEffect(() => {
    const cartItemToUpdate = currentCart?.cartItem?.find(item => item.productId === product?.id && item.variantId === null);
    if (cartItemToUpdate) {
      dispatch(updateCart({ cartItemsId: cartItemToUpdate.id, variantId: cartItemToUpdate.variantId, quantity: quantity }));
    }
  }, [quantity]);
  useEffect(() => {
    const cartItem = currentCart?.cartItem?.find(item => item.productId === product?.id && item.variantId === null);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [currentCart, product]);

  const handleAddToCart = async () => {
    if (product?.variants?.length === 0) {
      if (!current) {
        return Swal.fire({
          title: 'Bạn chưa đăng nhập',
          text: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng',
          icon: 'info',
          cancelButtonText: 'Hủy',
          showCancelButton: true,
          confirmButtonText: 'Đăng nhập',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({ redirect: location.pathname }).toString(),
            })
          }
        })
      } else {
        const response = await apiUpdateCart({ id: current?.cartId, cartItem: [{ productId: product?.id, quantity: 1 }] })
        if (response?.status === 200) {
          toast.success('Thêm sản phẩm vào giỏ hàng thành công')
          dispatch(getUserCurrent(current?.id))
        } else {
          toast.error(response?.error)
        }
      }

    } else {
      setVisible(true)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 50) {
      setQuantity(quantity + 1);
    }
    const quantityLimit = product?.variants?.length === 0 ? product?.quantity : null;
    if (quantityLimit && quantity >= quantityLimit) {
      setQuantity(quantityLimit);
      Swal.fire({
        icon: 'info',
        title: 'Số lượng sản phẩm đã đạt giới hạn',
        text: `Số lượng sản phẩm tối đa bạn có thể mua là ${quantityLimit}`,
      })
    }
  };
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
                <h1 className='font-main font-medium text-base my-5'>Các biến thể của sản phẩm</h1>
                <SelectGroup variantdefault='' variant={product?.variants} handleSelected={handleVariantChange} disabel />
              </div>
            ) : (
              <div className='text-2xl my-3 font-main text-red-800'>
                {formatterMonney.format(product?.discountPrice)}
              </div>
            )
            }
            {currentCart?.cartItem?.some((item) => item.productId === product?.id && item.variant === null) ?
              (
                <div className="relative mx-auto my-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 border border-red-300">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    className="bg-red-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-red-100  p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700  "
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="quantity-input"
                    className="bg-gray-50 border-x-0 border-gray-300  text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="999"
                    value={quantity}
                    required
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="bg-red-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-red-100  p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 "
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              ) :
              (
                <button onClick={handleAddToCart} className='font-main text-xl font-medium bg-red-500 text-white h-10 w-full mt-5'>Mua</button>
              )
            }
            <DialogVariantsProduct productId={product?.id} dispatch={dispatch} visible={visible} current={current} currentCart={currentCart} setVisible={setVisible} name={product?.name} variants={product?.variants ? product?.variants : []} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetail