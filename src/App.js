import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Public, Login,Register, Home, ProductType,ProductDetail } from './page/public';
import path from './ultils/path';

// import FormSignin from './page/public/Signin/FormSignin';
// import FormSignup from './page/public/Signup/FormSignup';

function App() {
  return (
    <div className="min-h-screen font-main">
      {/* <FormSignup />
      <FormSignin /> */}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.LOGIN} element={<Login/>} />
          <Route path={path.REGISTER} element={<Register/>} />
          <Route path={path.PRODUCT_TYPE} element={<ProductType/>} />
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail/>} />
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
