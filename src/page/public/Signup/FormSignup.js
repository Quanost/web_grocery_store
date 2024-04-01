import React, { useState } from 'react';
import './FormSignup.css';
import { Link } from 'react-router-dom';
import path from '../../../ultils/path';

const FormSignup = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: ''
    })
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        setShowSuccess(true);
        console.log(values)
    }
    return (
        <div className='form-container'>
            <span className='close-btn'>×</span>
            <div className='form-content-left'>
                <img className='form-img' src='./icon_register.svg' alt='spaceship' />
            </div>

            <div className='form-content-right'>
                {/* Thông báo đăng ký thành công */}
                <div className={`form-success ${showSuccess ? 'grid' : 'hidden'}`}>
                    <h1>Đăng ký thành công, vui lòng vào email để xác nhận</h1>
                    <div className="grid grid-cols-4 gap-4 text-black">
                        <input type="text" className="form-input" placeholder="Mã xác nhận" />
                        <input type="text" className="form-input" placeholder="Mã xác nhận" />
                        <input type="text" className="form-input" placeholder="Mã xác nhận" />
                        <input type="text" className="form-input" placeholder="Mã xác nhận" />
                    </div>
                    <img className='form-img-2' src='./success.svg' alt='success-image' />
                </div>

                <form className={`form ${showSuccess ? 'hidden' : 'show'}`} onSubmit={handleSubmit}>
                    <h1>Đăng ký</h1>
                    <div className='form-inputs'>
                        <div className='flex justify-between'>
                            <div className='form-input-wrapper'>
                                <label htmlFor='firstName' className='form-label'>
                                    Họ
                                </label>
                                <input
                                    id='firstName'
                                    type='text'
                                    placeholder='Họ'
                                    name='firstName'
                                    className='form-input'
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-input-wrapper'>
                                <label htmlFor='lastName' className='form-label'>
                                    Tên
                                </label>
                                <input
                                    id='lastName'
                                    type='text'
                                    placeholder='Tên'
                                    name='lastName'
                                    className='form-input'
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* <p>aa</p> */}
                    </div>
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
                    <div className='form-inputs'>
                        <label
                            htmlFor='repeatPassword'
                            className='form-label'>
                            Nhập lại mật khẩu
                        </label>
                        <input
                            id='repeatPassword'
                            type='password'
                            placeholder='Nhập lại mật khẩu'
                            name='repeatPassword'
                            className='form-input'
                            value={values.repeatPassword}
                            onChange={handleChange} />
                    </div>
                    <div className='form-inputs'>
                        <label
                            htmlFor='phone'
                            className='form-label'>
                            Số điện thoại
                        </label>
                        <input
                            id='phone'
                            type='text'
                            placeholder='Số điện thoại'
                            name='phone'
                            className='form-input'
                            value={values.phone}
                            onChange={handleChange} />

                    </div>
                    <button className='form-input-btn' type='submit'>
                        Đăng ký
                    </button>
                    <span className='form-input-login'>Bạn đã có tài khoản?
                        <Link to={`/${path.LOGIN}`}>
                            Đăng nhập ngay
                        </Link>
                    </span>
                </form>
            </div>
        </div>


    )
}

export default FormSignup
