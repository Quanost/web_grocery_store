import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import storage from 'redux-persist/lib/storage'
import userSlice from './user/userSlice';
import productSlice from './product/productSlice';
import attributeSlice from './attribute/attributeSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const commonConfig = {
  key: '/shop/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whilelist: ['isLoggedIn', 'token', 'current']
}

export const store = configureStore({
  reducer: {
    appReducer: appSlice,
    products: productSlice,
    attributes: attributeSlice,
    user: persistReducer(userConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)


