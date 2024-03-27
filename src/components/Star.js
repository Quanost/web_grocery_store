import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Star = ({ stars, reviews,size }) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return <span key={index}>
            {stars >= index + 1
                ? <FaStar color='Orange' size={size}/>
                : stars >= number
                    ? <FaStarHalfAlt color='Orange' size={size}/> :
                    <FaRegStar color='Orange' size={size}/>}
        </span>
    })

    return (
        <div className='flex items-center justify-start'>
           
            {ratingStar}
            {reviews && <p className='text-base font-main ml-3 text-blue-600'>{reviews} đánh giá</p>}
        </div>
    )
}

export default Star
