import './App.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Public, Login, Register, Home, ProductType, ProductDetail, SeachProducts } from './page/public';
import { AdminLayout, ManageOrders, CreateProduct, Dashboard, ManageProducts, ManageUser, ManageCategories, AdminOrderDetail, AdminPersonal } from './page/admin';
import { MemberLayout, Personal, PurchaseHistory, Checkout, CartUser, OrderDetail, DeliveryAddress } from './page/member';
import path from './ultils/path';


function App() {
  return (
    <div className="min-h-screen overflow-y-auto font-main ">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCT_TYPE} element={<ProductType />} />
          <Route path={path.PRODUCT_DETAIL__CNAME__PID__TITLE} element={<ProductDetail />} />
          <Route path={path.SEARCHPRODUCT} element={<SeachProducts />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrders />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_CATEGORY} element={<ManageCategories />} />
          <Route path={path.ORDER_DETAIL__ID} element={<AdminOrderDetail />} />
          <Route path={path.PERSONAL} element={<AdminPersonal />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.PURCHASE_HISTORY} element={<PurchaseHistory />} />
          <Route path={path.CART} element={<CartUser />} />
          <Route path={path.CHECKOUT} element={<Checkout />} />
          <Route path={path.ORDER_DETAIL__ID} element={<OrderDetail />} />
          <Route path={path.DELIVERY_ADDRESS} element={<DeliveryAddress />} />
        </Route>

        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
