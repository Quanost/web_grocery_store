import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const BannerProductDetail = ({ images }) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    const handlePrevImage = () => {
        const prevIndex = (activeImgIndex - 1 + (images ? images.length : 0)) % (images ? images.length : 1);
        setActiveImgIndex(prevIndex);
    };

    const handleNextImage = () => {
        const nextIndex = (activeImgIndex + 1) % (images ? images.length : 1);
        setActiveImgIndex(nextIndex);
    };

    return (
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center group'>
            <div className='flex flex-col gap-6 lg:w-full'>
                {images && images.length > 0 && (
                    <>
                        <img src={images[activeImgIndex].imageUrl} alt="" className='w-full h-[580px] aspect-square object-cover rounded-xl' />
                        <div className='relative'>
                            <div className='hidden group-hover:block absolute -mt-[45%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                                <BsChevronCompactLeft onClick={handlePrevImage} size={30} />
                            </div>
                            <div className='hidden group-hover:block absolute -mt-[45%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                                <BsChevronCompactRight onClick={handleNextImage} size={30} />
                            </div>
                        </div>
                        <div className='flex flex-row justify-center gap-5 h-24'>
                            {images.map((image, index) => (
                                <img
                                    key={image.id}
                                    src={image.thumbnail}
                                    alt={`Image ${index + 1}`}
                                    className={`w-24 h-24 rounded-md cursor-pointer p-1 flex object-cover ${index === activeImgIndex ? 'bg-red-200' : ''}`}
                                    onClick={() => setActiveImgIndex(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BannerProductDetail;