import React, { useState } from 'react';
import './FormSignup.css'

const FormSignup = () => {
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
                <img className='form-img' src='./icon_register.svg' alt='spaceship' />
            </div>

            <div className='form-content-right'>
                {/* <h1 className='form-success'>Đăng ký thành công, vui lòng vào email để xác nhận</h1>
                <img className='form-img-2' src='./success.svg' alt='success-image' /> */}
                <form className='form' onSubmit={handleSubmit}>
                    <h1>Đăng ký</h1>
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
                    <button className='form-input-btn' type='submit'>
                        Đăng ký
                    </button>
                    <span className='form-input-login'>Bạn đã có tài khoản? <a href='#'>Đăng nhập ngay</a></span>
                </form>
            </div>
        </div>


    )
}

export default FormSignup
