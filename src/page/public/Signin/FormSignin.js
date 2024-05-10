import React, { useCallback, useState } from 'react';
import './FormSignin.css';
import { Link, useSearchParams } from 'react-router-dom';
import path from '../../../ultils/path';
import Swal from 'sweetalert2'
import { apiLogin } from '../../../apis/user';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../store/user/userSlice'
import { useDispatch } from 'react-redux';
import { persistor } from '../../../store/redux';
import { current } from '@reduxjs/toolkit';

const FormSignin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [seachParams] = useSearchParams();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!values.email.trim()) {
            errors.email = 'Email không được để trống';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email không hợp lệ';
            isValid = false;
        }

        if (!values.password.trim()) {
            errors.password = 'Mật khẩu không được để trống';
            isValid = false;
        } else if (values.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        const rs = await apiLogin(values);
        if (rs?.data) {
            const actionResult = dispatch(login({ isLoggedIn: true, token: rs.data.accessToken, current: rs.data.user, currentCart: rs.data.user.cart, userAddress: rs.data.user.address}));
            console.log('t', actionResult)
            if (actionResult.type === login.type) {
                await persistor.flush();
                seachParams.get('redirect') ? navigate(seachParams.get('redirect')): navigate(`/${path.HOME}`);
            } else {
                Swal.fire('Đăng nhập thất bại', 'Có lỗi xảy ra khi xử lý đăng nhập', 'error');
            }
        }
        else {
            Swal.fire('Đăng nhập thất bại', rs?.error, 'error')
        }
    })
    return (
        <div className='form-container'>
            <span className='close-btn'>×</span>
            <div className='form-content-left'>
                <img className='form-img' src='./icon_login.svg' alt='spaceship' />
            </div>

            <div className='form-content-right'>
                <form className='form' onSubmit={handleSubmit}>
                    <h1>Đăng nhập</h1>
                    <div className='form-inputs'>
                        <label
                            htmlFor='email'
                            className='form-label'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='text'
                            placeholder='Email'
                            name='email'
                            className='form-input'
                            value={values.email}
                            onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className='form-inputs'>
                        <label
                            htmlFor='password'
                            className='form-label'>
                            Mật khẩu
                        </label>
                        <input
                            id='password'
                            type='password'
                            placeholder='Mật khẩu'
                            name='password'
                            className='form-input'
                            value={values.password}
                            onChange={handleChange} />

                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <button className='form-input-btn' type='submit'>
                        Đăng nhập
                    </button>
                    <div className='flex w-[80%] justify-between'>
                        <div className='flex w-full gap-2'>
                            <span className='form-input-login'>Bạn chưa có tài khoản ?<br/>
                                <Link to={`/${path.REGISTER}`}>
                                    Đăng ký ngay
                                </Link>
                            </span>
                            <span className='form-input-login'>Bạn muốn về trang chủ ?<br></br>
                                <Link to={`/${path.HOME}`}>
                                    Về trang chủ
                                </Link>
                            </span>
                        </div>

                
                    </div>
                </form>
            </div>
        </div>


    )
}

export default FormSignin;
