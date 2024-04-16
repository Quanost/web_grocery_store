import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './user/userSlice';
import productSlice from './product/productSlice';
import attributeSlice from './attribute/attributeSlice'; 

const commonConfig = {
  key: '/shop/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whilelist: ['isLoggedIn', 'token']
}

export const store = configureStore({
  reducer: {
    appReducer: appSlice,
    products: productSlice,
    attributes: attributeSlice,
    user: persistReducer(userConfig, userSlice)
  },
})

export const persistor = persistStore(store)

