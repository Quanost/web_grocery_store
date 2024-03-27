import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Banner = () => {
    const slides = [
        {
            url: 'https://hcm.fstorage.vn/images/2024/03/main-banner_ariel-20240304100934.jpg',
        },
        {
            url: 'https://hcm.fstorage.vn/images/2024/02/pc1new-20240229142755.jpg',
        },
        {
            url: 'https://hcm.fstorage.vn/images/2024/03/ariel_pc-a1-2-20240304070836.jpg',
        },

        {
            url: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_1058x135/https://cdn.tgdd.vn/bachhoaxanh/banners/5599/thung-da-pepsi-13032024104459.jpg',
        },
        {
            url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
        setSelectedIndex(slideIndex);
    };

    return (
        // <div className='w-full'>
        //     <img
        //         src='https://hcm.fstorage.vn/images/2024/03/main-banner_ariel-20240304100934.jpg'
        //         alt='banner'
        //         className='w-full object-contain'
        //     />
        // </div>
        <div className='max-w-[1400px] h-[300px] m-auto py-1 w-full group'>
            <img
                src={slides[currentIndex].url}
                alt="Banner"
                className='h-full w-full rounded-2xl object-contain'
            />
            <div className='relative'>
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute -mt-[12%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute -mt-[12%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
            </div>
            <div className='flex top-4 justify-center py-2'>
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-2xl cursor-pointer ${slideIndex === selectedIndex ? 'text-red-500' : ''}`}
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>

        </div>

    )
}

export default Banner
