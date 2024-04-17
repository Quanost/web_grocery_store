import React, { useEffect, useState } from "react";
import { Banner, CardProductType } from '../../components';
import { useSelector } from 'react-redux';

const Home = () => {
  const [products, setProducts] = useState([]);
  const productStore = useSelector(state => state.products);

  useEffect(() => {
    setProducts(productStore.products);
  }, [productStore]);


  return (
    <div className='w-main flex'>
      <div className='flex flex-col px-1 gap-5 w-[100%] flex-auto '>
        <Banner />
        {products.length > 0 && (
          <div>
            {products.map((products) => (
              <div key={products.key}>
                {products.value.length > 0 && (
                  <CardProductType title = {products.key} product={products.value} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home