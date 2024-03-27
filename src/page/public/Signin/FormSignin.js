import React, { useState } from 'react';
import './FormSignin.css'

const FormSignin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

    }
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
                    <span className='form-input-login'>Bạn chưa có tài khoản? <a href='#'>Đăng ký ngay</a></span>
                </form>
            </div>
        </div>


    )
}

export default FormSignin;
