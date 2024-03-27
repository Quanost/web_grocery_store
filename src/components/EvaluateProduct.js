import React, { useState } from 'react'
import Star from './Star';
import { FaStar } from "react-icons/fa";

const EvaluateProduct = () => {
    const [evaluate, setEvaluate] = useState(
        {
            "productId": "abc123",
            "productName": "Product Name",
            "ratings": {
                "1": 10,
                "2": 20,
                "3": 30,
                "4": 40,
                "5": 50
            }
        }
    )

    const totalReviews = 150;
    const ratings = 50;
    console.log(evaluate.ratings[1])
    return (
        <div className=''>
            <div className='flex items-center justify-start'>
                <p className='text-2xl font-main text-orange-400 mx-2'>4.8</p>
                <Star stars={4.8} reviews={5} size={20} />
            </div>
            <div class="col-span-12 xl:col-span-4 flex items-center w-[70%]">
                <div class="box flex flex-col gap-y-0.5 w-full max-xl:max-w-3xl mx-auto">
                    {Object.entries(evaluate.ratings).map(([star, count], index) => (
                        <div className="flex items-center w-full" key={index}>
                            <p className="font-medium text-lg py-[1px] text-black mr-[2px]">{star}</p>
                            <FaStar color='orange' size={20} />
                            <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
                                <span className={`h-full w-[${Math.floor((count / 150) * 100)}%] rounded-[30px] bg-indigo-500 flex`}></span>
                            </p>
                            <p className="font-medium text-lg py-[1px] text-black mr-[2px]">{Math.floor((count / 150) * 100)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='inline'>
                <div className='mt-10 border-b w-full px-2'>
                    <h1 className='font-main text-base font-medium'>Nguyễn Long</h1>
                    <div className='my-1'>
                        <Star stars={4.8} size={15} />
                    </div>
                    <p>Hàng sữ dựng tốt</p>
                </div>
                <div className='mt-10 border-b w-full px-2'>
                    <h1 className='font-main text-base font-medium'>Nguyễn Long</h1>
                    <div className='my-1'>
                        <Star stars={4.8} size={15} />
                    </div>
                    <p>Hàng sữ dựng tốt</p>
                </div>

                {/* Số trang */}
                <nav aria-label="" className='flex justify-center my-3 text-base'>
                    <ul className="list-style-none flex">
                        <li>
                            <a
                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                                aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">1</a>
                        </li>
                        <li aria-current="page">
                            <a
                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">2</a>
                        </li>
                        <li>
                            <a
                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">3</a>
                        </li>
                        <li>
                            <a
                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                                aria-label="Next"><span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className='flex mt-5 w-[100%] bg-red-500 justify-center h-[40px] '>
                    <button className=' font-main text-xl font-bold  text-white'>Viết đánh giá</button>
                </div>
            </div>
        </div>
    )
}

export default EvaluateProduct