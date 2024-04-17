import './App.css';
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Public, Login, Register, Home, ProductType, ProductDetail } from './page/public';
import { AdminLayout, ManageOrders, CreateProduct, Dashboard, ManageProducts, ManageUser } from './page/admin';
import { MemberLayout, Personal, PurchaseHistory } from './page/member';
import path from './ultils/path';


function App() {
  return (
    <div className="min-h-screen overflow-y-auto font-main ">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCT_TYPE} element={<ProductType />} />
          <Route path={path.PRODUCT_DETAIL__CNAME__PID__TITLE} element={<ProductDetail />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrders/>} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProducts/>} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.PURCHASE_HISTORY} element={<PurchaseHistory />} />
        </Route>

        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
