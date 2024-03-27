import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import Footer from '../../components/Footer';


const Public = () => {
    return (
        <div className='w-full flex flex-col items-center bg-slate-50'>
            <Header />
            <Navigation />
            <div className='w-main bg-white'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Public
