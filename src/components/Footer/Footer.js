import React, {memo} from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Logo from '../../assets/image/Logo.png'

const Footer = () => {
    const Year = new Date().getFullYear();
    return (
      <footer className="bg-black w-full mt-auto ">
      <div className="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-10 w-main font-main">
        <div className="max-w-sm ">
          <div className="mb-6 flex h-12 items-center space-x-2 bg-white">
            <img src={Logo} alt="Logo" className="flex object-cover" />
          </div>
          <div className="text-white">Nơi mang đến trải nghiệm mua sắm thuận tiện và đa dạng</div>
        </div>
        <div className="text-white">
          <h3 className="mt-4 mb-2 font-medium xl:mb-4 font-main text-lg">Về chúng tôi</h3>
          <nav aria-label="Footer Navigation" className="text-gray-500">
            <ul className="space-y-3 text-white ml-2">
              <li><a className="hover:text-red-600 " href="#">Giới thiệu</a></li>
              <li><a className="hover:text-red-600 " href="#">Điều khoản và điều kiện giao dịch</a></li>
              <li><a className="hover:text-red-600 " href="#">Chính sách bảo mật</a></li>
            </ul>
          </nav>
        </div>
        <div className="text-white">
          <div className="mt-4 mb-2 font-medium xl:mb-4 font-main text-lg">Chăm sóc khách hàng</div>
          <nav aria-label="Footer Navigation" className="text-gray-500">
            <ul className="space-y-3 text-white ml-2">
              <li><a className="hover:text-red-600 " href="#">Chính sách thanh toán</a></li>
              <li><a className="hover:text-red-600 " href="#">Chính sách đổi trả</a></li>
              <li><a className="hover:text-red-600 " href="#">Chính sách giao hàng</a></li>
            </ul>
          </nav>
        </div>
        <div className=" text-white">
          <div className="mt-4 mb-2 font-medium xl:mb-4 font-main text-lg">Hỗ trợ khách hàng</div>
          <nav aria-label="Footer Navigation" className="text-gray-500">
            <ul className="space-y-3 text-white ml-2">
              <li><a className="hover:text-red-600 " href="#">Phone: +84 38521456</a></li>
              <li><a className="hover:text-red-600 " href="#">Email: mm@cskh@gmail.com</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>    
    );
};

export default memo(Footer);