import axios from "axios";
import { store } from './store/redux';
import { logout, login, updateToken, clearUser } from './store/user/userSlice';
import { toast } from 'react-toastify';


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
  let localStorageData = window.localStorage.getItem('persist:/shop/user')
  if (localStorageData && typeof localStorageData === 'string' && !config.noAuth) {
    localStorageData = JSON.parse(localStorageData)
    const accessToken = JSON.parse(localStorageData?.token)
    config.headers = { authorization: `Bearer ${accessToken?.token}` };
    return config
  } else
    return config;
}, function (error) {
  return Promise.reject(error);
});

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
  return response.data;
}, async function (error) {

  const originalRequest = error.config;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const state = store.getState();
      let localStorageData = window.localStorage.getItem('persist:/shop/user');
      localStorageData = JSON.parse(localStorageData);
      const refreshToken = JSON.parse(localStorageData?.refreshToken);

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Thực hiện request refresh token
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        userId: state.user.current?.id,
        refreshToken: refreshToken.token,
      });

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        store.dispatch(updateToken(accessToken));

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.token}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken.token}`;

        const res = await axios(originalRequest);
        return res.data;
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error === 'jwt expired') {
        store.dispatch(logout());
        return toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
      }
      return Promise.reject(err);
    }
  } else if (error.response.status === 500 && error.response.data) {
    toast.error(error.response.data.error);
    return Promise.reject(error.response.data);
  }


  return Promise.reject(error);
});

export default instance