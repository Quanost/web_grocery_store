import React, { useEffect, useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { Link } from 'react-router-dom';
import path from '../ultils/path'
import CardProduct from './CardProduct';


const CardProductType = ({ title, product, seeMore }) => {
    return (
        <section class="bg-white py-1 text-gray-700 sm:py-16 lg:py-2 mt-5 border-b">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

                <div>
                    <div class="mx-auto max-w-md text-center bg-gradient-to-r from-red-400 to-pink-600 rounded-md">
                        <h2 class="font-serif text-lg font-main sm:text-xl text-gray-50 py-2 font-extrabold">{title}</h2>
                    </div>
                    <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-2 ">
                        {product?.map((value) => (

                            <CardProduct key={value.id} imgURL={value.productGalleries[0].imageUrl} regularPrice={value.regularPrice} discountPrice={value.discountPrice} name={value.name}
                                link={`/${value.categories[0].name}/${value.categories[0].id}/${value.slug}/${value.id}`} />

                        ))}
                    </div>
                    {seeMore && (
                        <div class="mx-auto max-w-md text-center border border-red-500 rounded-md h-10 my-3">
                            <span class=" text-sm font-main sm:text-xl text-red-500 py-2 font-b flex justify-center">Xem thêm 20 sản phẩm <SlArrowDown className='flex justify-center mx-2 mt-1' /></span>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}

export default CardProductType
