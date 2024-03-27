import React, { useState } from 'react';
import BannerProductDetail from '../../components/BannerProductDetail';
import { SlArrowDown } from "react-icons/sl";
import BannerSameProduct from '../../components/BannerSameProduct';
import { SlArrowLeft } from "react-icons/sl";
import EvaluateProduct from '../../components/EvaluateProduct';
import { FaStar } from "react-icons/fa";
import Star from '../../components/Star';
import BannerProductType from '../../components/BannerProductType';


const ProductDetail = () => {
  const [readMore, setReadMore] = useState(false)

  const paragraphStyles = {

    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box'
  }
  return (
    <div className='w-main inline-block bg-slate-100'>
      <div className='flex items-center bg-white  mt-2  '>
        <div className='flex items-center border-r px-5'>
          <SlArrowLeft size={15} />
        </div>
        <nav className=" font-main rounded-md relative flex w-full flex-wrap items-center justify-between  py-3 mt-2  text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start">
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
      </div>
      <div className='flex'>
        <div className='flex flex-col gap-5 w-[60%] flex-auto bg-white mt-3'>
          <div className='m-3'>
            <BannerProductDetail />
          </div>
          <div className='m-3 inline-block'>
            <h1 className='font-main font-medium text-xl'>Thông tin sản phẩm</h1>
            <div style={readMore ? null : paragraphStyles}>
              <p >
                Nước giải khát Zero Coca Cola không đường lon 330ml được sản xuất từ những nguyên liệu cao cấp, chọn lọc. Sản phẩm được sản xuất trên dây chuyền công nghệ hiện đại, khép kín của Mỹ. Các công đoạn sản xuất đều được thực hiện dưới sự giám sát chặt chẽ của các chuyên gia, đảm bảo tạo ra sản phẩm an toàn và có chất lượng cao nhất.

                Thông tin sản phẩm
                Thương hiệu: Coca Cola (Mỹ)
                Sản xuất tại: Việt Nam
                Thành phần: Nước bão hòa CO2, màu thực phẩm, chất điều chỉnh độ axit, chất tạo ngọt tổng hợp, chất bảo quản, hương cola tự nhiên và caffein.
                Thể tích: 390ml
                Loại: Không đường.
                Nước giải khát Zero Coca Cola không đường lon 330ml được sản xuất dạng chai nhỏ gọn, tiện dụng, dễ mang bên theo bên mình mọi lúc, mọi nơi. Sản phẩm phù hợp cho nhu cầu giải khát, các buổi gặp mặt bạn bè, buổi tiệc, đi liên hoan, du lịch, picnic...

                Hướng dẫn sử dụng và bảo quản
                Mở nắp, uống trực tiếp.
                Ngon hơn khi uống lạnh.
                Bảo quản nơi khô ráo, thoáng mát, tránh ánh sáng mặt trời.
              </p>

              {/* Table */}
              <div className="flex flex-col mt-5">
                <div className="overflow-hidden border border-gray-300 rounded-lg">
                  <div className="grid grid-cols-4 border-b font-main text-base">
                    <div className="pl-4 py-2 bg-gray-100 border-r border-gray-300 col-span-1">Loại mì:</div>
                    <div className="py-2 border-gray-300 pl-4 text-left col-span-3">Mì nước</div>
                  </div>
                  <div className="grid grid-cols-4 border-b font-main text-base">
                    <div className="pl-4 py-2 bg-gray-100 border-r border-gray-300 col-span-1">Vị mì:</div>
                    <div className="py-2 border-gray-300 pl-4 text-left col-span-3">Tôm chua cay</div>
                  </div>
                </div>
              </div>

              {/* Bài viết sản phẩm */}
              <div className='mt-5'>
                <h1 className='font-main font-medium text-base'>Bài viết sản phẩm</h1>
                <p>
                  Đôi nét về thương hiệu Tiger<br></br>
                  Tiger là thương hiệu bia không những nổi tiếng tại Việt Nam mà còn được mệnh danh là nhãn hiệu bia số 1 châu Á. Được giới thiệu lần đầu từ năm 1932 tại Singapore, hiện nay Tiger thuộc tập đoàn Heineken - ông lớn lừng danh trên thị trường bia thế giới.

                  <br></br> Với hình ảnh quen thuộc là chú cọp dũng mãnh, bia Tiger mang tinh thần mạnh mẽ, khí chất, cho bạn cảm giá hào hứng và sảng khoái khi nhắc về sản phẩm và sử dụng bia của Tiger

                  <br></br>Dòng sản phẩm bia Tiger Crystal hay còn gọi là Tiger bạc, được nhà Tiger giới thiệu năm 2009, với công thức truyền thống đặc trưng, thiết kế sang trọng, hiện đại hơn, thêm phần đẳng cấp và hương vị cũng dịu nhẹ, dễ uống và không gây cảm giác nhức đầu, phù hợp cho nhiều đối tượng sử dụng
                </p>
              </div>
            </div>
            <div class="font-main font-medium mx-auto max-w-sm text-center rounded-md h-10 my-3" onClick={() => setReadMore(!readMore)}>
              <span class=" text-sm font-main sm:text-base text-red-500 py-2 font-b flex justify-center">{readMore ? 'Thu gọn' : 'Xem thêm'}<SlArrowDown className='flex justify-center mx-2 mt-1' /></span>
            </div>
          </div>
          <div className='m-3'>
            <h1 className='font-main font-medium text-xl my-5'>Sản phẩm liên quan</h1>
            <BannerSameProduct />
          </div>

          Đánh giá sản phẩm
          <div className='m-3 border rounded-xl'>
            <div className='pl-5'>
              <h1 className='font-main font-medium text-2xl my-5'>Đánh giá</h1>
              <EvaluateProduct />
            </div>
          </div>
        </div>

        {/* Lề phải -- phân loại sản phẩm */}
        <div className='flex flex-col gap-5 w-[40%] flex-auto m-3 bg-white'>
          <div className='mx-3 my-3'>
            <h1 className='font-main text-xl font-medium'>Tên sản phẩm</h1>
            <div className='flex items-center justify-start'>
              <p className='text-xl font-main text-orange-400 mx-2'>4.8</p>
              <FaStar color='orange' size={15} />
              <p className='font-main text-base mx-5 text-blue-600'>Xem 15 đánh giá</p>
            </div>
            <div className='my-3'>
              <BannerProductType />
            </div>
            <button className='font-main text-xl font-medium bg-red-500 text-white h-10 w-full mt-5'>Mua</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetail