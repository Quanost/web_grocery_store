import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const BannerProductDetail = () => {
    const [images, setImages] = useState({
        img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    
    })

    const [activeImg, setActiveImage] = useState(images.img1)



    const handlePrevImage = () => {
        const currentIndex = Object.values(images).indexOf(activeImg);
        const prevIndex = currentIndex === 0 ? Object.values(images).length - 1 : currentIndex - 1;
        setActiveImage(Object.values(images)[prevIndex]);
      };

      const handleNextImage = () => {
        const currentIndex = Object.values(images).indexOf(activeImg);
        const nextIndex = currentIndex === Object.values(images).length - 1 ? 0 : currentIndex + 1;
        setActiveImage(Object.values(images)[nextIndex]);
      };
    

    return (
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center group'>
            <div className='flex flex-col gap-6 lg:w-full'>
                <img src={activeImg} alt="" className='w-full h-[580px] aspect-square object-cover rounded-xl' />
                <div className='relative'>
                    {/* Left Arrow */}
                    <div className='hidden group-hover:block absolute -mt-[45%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <BsChevronCompactLeft onClick={handlePrevImage} size={30} />
                    </div>
                    {/* Right Arrow */}
                    <div className='hidden group-hover:block absolute -mt-[45%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <BsChevronCompactRight onClick={handleNextImage} size={30} />
                    </div>
                </div>
                <div className='flex flex-row justify-center gap-5 h-24'>
                    {Object.keys(images).map((key) => (
                        <img key={key} src={images[key]} alt={`Image ${key}`} className={`w-24 h-24 rounded-md cursor-pointer p-1 ${images[key] === activeImg ? 'bg-red-200' : ''}`}  onClick={() => setActiveImage(images[key])} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BannerProductDetail
