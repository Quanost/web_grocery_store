import React from 'react';
import { Header, Navigation, Sidebar, Banner } from '../../components';
import CardProduct from '../../components/CardProductType';
import CardProductType from '../../components/CardProductType';

const Home = () => {
  return (
    <div className='w-main flex'>
      {/* <div className='flex flex-col gap-5 w-[25%] flex-auto border'>
        <Sidebar />
        <span>Hello</span>
      </div> */}
      <div className='flex flex-col px-1 gap-5 w-[100%] flex-auto '>
        <Banner />
        <CardProductType title="Sản Phẩm Khuyến Mãi"/>
        <CardProductType title="Rau Củ Quả"/>
      </div>
    </div>
  )
}

export default Home