import React, { useEffect, useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { Link } from 'react-router-dom';
import path from '../ultils/path'
import { apiGet5ProductByTypeId } from '../apis';
import CardProduct from './CardProduct';


const CardProductType = ({ categoriesId, title }) => {
    const [product4, setProduct4] = useState([])
    const [remainingProduct, setRemainingProduct] = useState()
    const fetchProducts = async () => {
        const productlimit5 = await apiGet5ProductByTypeId(categoriesId)
        if (productlimit5.error) {
            return
        } else {
            setProduct4(productlimit5.data.products)
            setRemainingProduct(productlimit5.data.pageInfo.count)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div>
            {
                product4.length !== 0 && (
                    <section class="bg-white py-1 text-gray-700 sm:py-16 lg:py-2 mt-5 border-b">
                        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                            <div class="mx-auto max-w-md text-center bg-gradient-to-r from-red-400 to-pink-600 rounded-md">
                                <h2 class="font-serif text-lg font-main sm:text-xl text-gray-50 py-2 font-extrabold">{title}</h2>
                            </div>
                            <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-2 ">
                                {product4.map((product) => (
                                    <Link to={`/${path.PRODUCT_DETAIL}/${product.id}/title`}>
                                        <CardProduct imgURL={product.productGalleries[0].imageUrl} regularPrice={product.regularPrice} discountPrice={product.discountPrice} name={product.name} />
                                    </Link>
                                ))}
                            </div>
                            <div class="mx-auto max-w-md text-center border border-red-500 rounded-md h-10 my-3">
                                <span class=" text-sm font-main sm:text-xl text-red-500 py-2 font-b flex justify-center">Xem thêm {remainingProduct} sản phẩm <SlArrowDown className='flex justify-center mx-2 mt-1' /></span>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    )
}

export default CardProductType
