import React from 'react';
import { formatterMonney } from '../ultils/helper'
import { Link } from 'react-router-dom';

const CardProduct = ({ imgURL, regularPrice, discountPrice, name, link }) => {

    const nameProductStyles = {
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        display: '-webkit-box'
    }
    return (
        <article class="relative flex flex-col overflow-hidden rounded-lg border">
            <Link to={link}>
                <div class="aspect-square overflow-hidden">
                    <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src={imgURL} alt="" />
                </div>
                {discountPrice < regularPrice && (
                    <div class="absolute top-0 m-2 rounded-full bg-white">
                        <p class="rounded-full bg-red-400 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
                    </div>
                )}
                <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between font-main">
                    <div style={nameProductStyles}>
                        <h3 class="mx-2 text-base text-gray-400 h-20">{name}</h3>
                    </div>
                    <div class="mb-2 flex">
                        <p class="mr-3 text-lg font-semibold">{formatterMonney.format(discountPrice)}</p>
                        {discountPrice < regularPrice && (
                            <del class="text-lg text-gray-400"> {formatterMonney.format(regularPrice)} </del>
                        )}
                    </div>
                </div>
            </Link>
            <button class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 border border-red-300">
                <div class="flex w-full items-center justify-center border-r-4 border-red-200 text-lg font-medium font-main uppercase transition group-hover:bg-red-300 group-hover:text-white">Mua</div>
                <div class="flex items-center justify-center  px-5 transition group-hover:bg-red-200 group-hover:text-white">+</div>
            </button>
        </article>
    )
}

export default CardProduct
