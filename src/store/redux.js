import { configureStore } from '@reduxjs/toolkit';
import  appSlice  from './appSlice';
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist';
import userSlice from './user/userSlice';

const commonConfig = {
  key: '/shop/user',
  storage
}

const userConfig = {
 ...commonConfig,
 whilelist:['isLoggedIn', 'token']
}

export const store = configureStore({
  reducer: {
    appReducer: appSlice,
    user: persistReducer(userConfig,userSlice)
  },
})

export const persistor = persistStore(store)
