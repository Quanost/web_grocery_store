import React, {memo} from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Logo from '../assets/image/Logo.png'

const Footer = () => {
    const Year = new Date().getFullYear();
    return (
      <footer class="bg-black w-full mt-auto ">
      <div class="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-10 w-main font-main">
        <div class="max-w-sm ">
          <div class="mb-6 flex h-12 items-center space-x-2 bg-white">
            <img src={Logo} alt="Logo" className="flex object-cover" />
          </div>
          <div class="text-white">Nơi mang đến trải nghiệm mua sắm thuận tiện và đa dạng</div>
        </div>
        <div class="text-white">
          <h3 class="mt-4 mb-2 font-medium xl:mb-4 font-main text-lg">Về chúng tôi</h3>
          <nav aria-label="Footer Navigation" class="text-gray-500">
            <ul class="space-y-3 text-white ml-2">
              <li><a class="hover:text-red-600 " href="#">Giới thiệu</a></li>
              <li><a class="hover:text-red-600 " href="#">Điều khoản và điều kiện giao dịch</a></li>
              <li><a class="hover:text-red-600 " href="#">Chính sách bảo mật</a></li>
            </ul>
          </nav>
        </div>
        <div class="text-white">
          <div class="mt-4 mb-2 font-medium xl:mb-4 font-main text-lg">Chăm sóc khách hàng</div>
          <nav aria-label="Footer Navigation" class="text-gray-500">
            <ul class="space-y-3 text-white ml-2">
              <li><a class="hover:text-red-600 " href="#">Chính sách thanh toán</a></li>
              <li><a class="hover:text-red-600 " href="#">Chính sách đổi trả</a></li>
              <li><a class="hover:text-red-600 " href="#">Chính sách giao hàng</a></li>
            </ul>
          </nav>
        </div>
        <div class=" text-white">
          <div class="mt-4 mb-2 font-medium xl:mb-4 font-main text-lg">Hỗ trợ khách hàng</div>
          <nav aria-label="Footer Navigation" class="text-gray-500">
            <ul class="space-y-3 text-white ml-2">
              <li><a class="hover:text-red-600 " href="#">Phone: +84 38521456</a></li>
              <li><a class="hover:text-red-600 " href="#">Email: mm@cskh@gmail.com</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>    
    );
};

export default memo(Footer);