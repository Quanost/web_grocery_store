import './App.css';
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Public, Login, Register, Home, ProductType, ProductDetail } from './page/public';
import path from './ultils/path';




function App() {
  return (
    <div className="min-h-screen overflow-y-auto font-main ">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCT_TYPE} element={<ProductType />} />
          <Route path={path.PRODUCT_DETAIL__CNAME__PID__TITLE} element={<ProductDetail />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
