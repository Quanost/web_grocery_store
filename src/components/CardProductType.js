import React from 'react';
import { SlArrowDown } from "react-icons/sl";
import { Link } from 'react-router-dom';
import path from '../ultils/path'

const dataTypeProduct = [
    {
        id: 1,
        name: "Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70,
        giaMoi: 2000000
    },
    {
        id: 2,
        name: "Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70.00,
        giaMoi: 99.00
    },
    {
        id: 3,
        name: "Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70.00,
        giaMoi: 99.00
    },
    {
        id: 4,
        name: "Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70.00,
        giaMoi: 99.00
    },

]
const CardProductType = ({ title }) => {

    const formatMoney = (amount) => {
        if (amount > 100)
            return (amount / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        else
            return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    }
    return (
        <section class="bg-white py-1 text-gray-700 sm:py-16 lg:py-2 mt-5 border-b">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-md text-center bg-gradient-to-r from-red-400 to-pink-600 rounded-md">
                    <h2 class="font-serif text-lg font-main sm:text-xl text-gray-50 py-2 font-extrabold">{title}</h2>
                </div>
                <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-2 ">
                    {dataTypeProduct.map((product) => (
                        <Link to={`/${path.PRODUCT_DETAIL}/productId/title`}>
                            <article class="relative flex flex-col overflow-hidden rounded-lg border">
                                <div class="aspect-square overflow-hidden">
                                    <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src="https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png" alt="" />
                                </div>
                                <div class="absolute top-0 m-2 rounded-full bg-white">
                                    <p class="rounded-full bg-red-400 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
                                </div>
                                <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between font-main">
                                    <h3 class="mb-2 text-base text-gray-400">{product.name}</h3>
                                    <div class="mb-2 flex">
                                        <p class="mr-3 text-lg font-semibold">{formatMoney(product.giaMoi)}</p>
                                        <del class="text-lg text-gray-400"> {formatMoney(product.giaCu)} </del>
                                    </div>
                                </div>
                                <button class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 border border-red-300">
                                    <div class="flex w-full items-center justify-center border-r-4 border-red-200 text-lg font-medium font-main uppercase transition group-hover:bg-red-300 group-hover:text-white">Mua</div>
                                    <div class="flex items-center justify-center  px-5 transition group-hover:bg-red-200 group-hover:text-white">+</div>
                                </button>
                            </article>
                        </Link>
                    ))}
                </div>
                <div class="mx-auto max-w-md text-center border border-red-500 rounded-md h-10 my-3">
                    <span class=" text-sm font-main sm:text-xl text-red-500 py-2 font-b flex justify-center">Xem thêm 30 sản phẩm <SlArrowDown className='flex justify-center mx-2 mt-1' /></span>
                </div>
            </div>
        </section>

    )
}

export default CardProductType
