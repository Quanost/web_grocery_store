import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import Footer from '../../components/Footer';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../store/app/asyncAction';
import { get4ProductParentCategories } from '../../store/product/asynActionProduct';
import { useSelector } from 'react-redux';

const Public = () => {
  const dispatch = useDispatch();
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [productLoaded, setProductLoaded] = useState(false);
  const categoriesStore = useSelector(state => state.appReducer);
  const productStore = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(get4ProductParentCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoriesStore.categories !== null) {
      setCategoriesLoaded(true);
    }
  }, [categoriesStore]);

  useEffect(() => {
    if (productStore.products !== null) {
      setProductLoaded(true);
    }
  }, [categoriesStore]);

  return (
    <div className='w-full flex flex-col items-center bg-slate-50'>
      <Header />
      {categoriesLoaded && <Navigation />}
      <div className='w-main bg-white'>
        {productLoaded && <Outlet /> }
      </div>
      <Footer />  
    </div>
  )
}

export default Public
