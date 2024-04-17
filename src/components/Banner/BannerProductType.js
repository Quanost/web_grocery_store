import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const dataSameProduct = [
    {
        id: 1,
        name: " 1 Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70,
        giaMoi: 2000000
    },
    {
        id: 2,
        name: "2 Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70.00,
        giaMoi: 99.00
    },
    {
        id: 3,
        name: "3 Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70.00,
        giaMoi: 99.00
    },
    {
        id: 4,
        name: "4 Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70.00,
        giaMoi: 99.00
    },
    {
        id: 5,
        name: "5 Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70.00,
        giaMoi: 99.00
    },
    {
        id: 6,
        name: "6 Nước xả đậm đặc làm mềm vải một lần xả Comfort hương ban mai túi 3.2L",
        image: "https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png",
        giaCu: 70.00,
        giaMoi: 99.00
    },

]

const BannerProductType = () => {
    const [startIndex, setStartIndex] = useState(0);
    const numVisibleProducts = 4;
    const maxIndex = dataSameProduct.length - numVisibleProducts;
    const isAtStart = startIndex === 0;
    const isAtEnd = startIndex === maxIndex;

    const formatMoney = (amount) => {
        if (amount > 100)
            return (amount / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        else
            return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    }

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

    return (
        <div className=' w-full overflow-hidden flex flex-col justify-between lg:flex-row gap-16 lg:items-center group'>
            <div className='flex flex-col gap-6 lg:w-full'>
                <div className='flex transition-transform duration-300 ease-in-out gap-2' style={{ transform: `translateX(-${startIndex * 30}%)` }}>
                    {dataSameProduct.map((product) => (
                        <article class="relative flex flex-col overflow-hidden rounded-lg border flex-shrink-0 w-1/3 ">
                            <div class="aspect-square overflow-hidden">
                                <img class="h-full w-full object-cover transition-all duration-300" src="https://componentland.com/images/neZnfwBHi0f-4TivjA6BS.png" alt="" />
                            </div>
                           <div className='text-sm font-main  text-gray-50 py-2 font-bold bg-red-300 p-1'>
                            Title
                           </div>
                            <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between font-main">
                                
                                <div class="mb-2 flex">
                                    <p class="mr-3 text-lg font-semibold">{formatMoney(product.giaMoi)}</p>
                                    <del class="text-lg text-gray-400"> {formatMoney(product.giaCu)} </del>
                                </div>
                            </div>
                           
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

export default BannerProductType