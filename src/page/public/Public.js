import React, { useEffect,useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import Footer from '../../components/Footer';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../store/asyncAction';
import { useSelector } from 'react-redux';

const Public = () => {
    const dispatch = useDispatch();
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const categoriesStore = useSelector(state => state.appReducer);

    useEffect(() => {
        dispatch(getCategories());
      }, [dispatch]);
    
      useEffect(() => {
        if (categoriesStore.categories !== null) {
          setCategoriesLoaded(true);
        }
      }, [categoriesStore]);
    return (
        <div className='w-full flex flex-col items-center bg-slate-50'>
            <Header />
            {categoriesLoaded && <Navigation />}
            <div className='w-main bg-white'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Public
