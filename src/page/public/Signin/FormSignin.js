import React, { useCallback, useState } from 'react';
import './FormSignin.css';
import { Link } from 'react-router-dom';
import path from '../../../ultils/path';
import Swal from 'sweetalert2'
import { apiLogin } from '../../../apis/user';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../store/user/userSlice'
import { UseDispatch, useDispatch } from 'react-redux';

const FormSignin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const rs = await apiLogin(values);
        if (rs.data) {
            dispatch(login({isLoggedIn: true, token: rs.data.accessToken, current: rs.data.user}))
            navigate(`/${path.HOME}`)
        }
        else {
            console.log('Thất bại', rs.error)
            Swal.fire('Thất bại', rs.error, 'error')
        }
            
        // Swal.fire(rs.data? 'Đăng nhập thành công': rs.error,rs.data,rs.data? 'success':'error')

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
                        <p>aa</p>
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
                    </div>

                    <button className='form-input-btn' type='submit'>
                        Đăng nhập
                    </button>
                    <span className='form-input-login'>Bạn chưa có tài khoản?
                        <Link to={`/${path.REGISTER}`}>
                            Đăng ký ngay
                        </Link>
                    </span>
                </form>
            </div>
        </div>


    )
}

export default FormSignin;
