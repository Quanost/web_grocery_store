import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { apiGetProductSame } from '../apis';
import { formatterMonney } from '../ultils/helper';
import { Link } from 'react-router-dom';

const BannerSameProduct = ({ categoryId }) => {
    const [productSame, setProductSame] = useState();
    const [startIndex, setStartIndex] = useState(0);
    const numVisibleProducts = 4;
    const maxIndex = productSame?.length - numVisibleProducts;
    const isAtStart = startIndex === 0;
    const isAtEnd = startIndex === maxIndex;

    const showPrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };
    const showNext = () => {
        if (startIndex < maxIndex) {
            setStartIndex(startIndex + 1);
        }
    };
    const fetchProductSame = async () => {
        const response = await apiGetProductSame(categoryId)
        if (response.status === 200)
            setProductSame(response.data.products)
    }

    const nameProductStyles = {
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        display: '-webkit-box'
    }
    useEffect(() => {
        if (categoryId)
            fetchProductSame()
    }, [categoryId])
    return (
        <div className=' w-full overflow-hidden flex flex-col justify-between lg:flex-row gap-16 lg:items-center group'>
            <div className='flex flex-col gap-6 lg:w-full'>
                <div className='flex transition-transform duration-300 ease-in-out gap-2' style={{ transform: `translateX(-${startIndex * 25}%)` }}>
                    {productSame?.map((product) => (

                        <article class="relative flex flex-col overflow-hidden rounded-lg border flex-shrink-0 w-1/4 p-4 h-50">
                            <Link to={`/${product.categories[0].name}/${product.categories[0].id}/${product.slug}/${product.id}`}>
                                <div class="aspect-square overflow-hidden">
                                    <img class="h-full w-full object-cover transition-all duration-300" src={product.productGalleries[0].imageUrl} alt="" />
                                </div>
                                <div class="absolute top-0 m-2 rounded-full bg-white">
                                    <p class="rounded-full bg-red-400 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
                                </div>
                                <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between font-main">
                                    <div style={nameProductStyles}>
                                        <h3 class="mb-2 text-base text-gray-400">{product.name}</h3>
                                    </div>
                                    <div class="mb-2 flex">
                                        <p class="mr-3 text-lg font-semibold">{formatterMonney.format(product.discountPrice)}</p>
                                        <del class="text-lg text-gray-400"> {formatterMonney.format(product.regularPrice)} </del>
                                    </div>
                                </div>
                                <button class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 border border-red-300 hover:bg-red-300 hover:text-white">
                                    <div class="flex w-full items-center justify-center border-r-4 border-red-200 text-lg font-medium font-main uppercase transition ">Mua</div>
                                    <div class="flex items-center justify-center  px-5 transition ">+</div>
                                </button>
                            </Link>
                        </article>
                    ))}
                </div>

                <div className='relative'>
                    {/* Left Arrow */}
                    <div disabled={isAtStart} style={{ visibility: isAtStart ? 'hidden' : 'visible' }} className='hidden group-hover:block absolute -mt-[40%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <BsChevronCompactLeft onClick={showPrev} size={30} />
                    </div>
                    {/* Right Arrow */}
                    <div disabled={isAtEnd} style={{ visibility: isAtEnd ? 'hidden' : 'visible' }} className='hidden group-hover:block absolute -mt-[40%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <BsChevronCompactRight onClick={showNext} size={30} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BannerSameProduct
