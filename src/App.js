import './App.css';
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Public, Login, Register, Home, ProductType, ProductDetail } from './page/public';
import path from './ultils/path';
import { useDispatch } from 'react-redux';
import { getCategories } from './store/asyncAction';

// import FormSignin from './page/public/Signin/FormSignin';
// import FormSignup from './page/public/Signup/FormSignup';

function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="min-h-screen font-main">
      {/* <FormSignup />
      <FormSignin /> */}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCT_TYPE} element={<ProductType />} />
          <Route path={path.PRODUCT_DETAIL__PID__TITLE} element={<ProductDetail />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
