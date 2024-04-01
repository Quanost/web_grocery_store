import React, { useState } from 'react';
import './FormSignup.css';
import { Link } from 'react-router-dom';
import path from '../../../ultils/path';
import { VerifyRegister } from '../../../components'
import {validateRegister} from '../../../ultils/validateData'
import { apiRegister,apiVerifyCode } from '../../../apis';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const FormSignup = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
        avatar: "https://cdn.dribbble.com/users/574618/screenshots/1952857/media/7af7a78fc601705e36a9294cd448ea2f.jpg"
    })
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [codeVerify, setCodeVerify] = useState();

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateRegister(values,setErrors)) {
            return;
        }
        console.log('t', values)
        const rs = await apiRegister(values);
        if (rs.data) {
            setShowSuccess(true);
            console.log('t', rs)
        }
        else {
            Swal.fire('Đăng ký thất bại', rs.error, 'error')
        }
    }
    const handleVerify = async (e) => {
        e.preventDefault();
        if(codeVerify.length !== 6){
            Swal.fire('Xác thực thất bại ', 'OTP phải có 6 số', 'error')
            return
        }
        const response = await apiVerifyCode({
            code: codeVerify,
            email: values.email
        });
        if (response.status === 200) {
            Swal.fire('Xác thực thành công ', 'Hãy đăng nhập vào tài khoản của bạn', 'success')
            navigate(`/${path.LOGIN}`);
        }
        else {
            console.log('xác thực,', response)
            Swal.fire('Xác thực thất bại ', response.error, 'error')
        }
    }
    const handleOtp = (otp) => {
        setCodeVerify(otp)
    }

    return (
        <div className='form-container'>
            <span className='close-btn'>×</span>
            <div className='form-content-left'>
                <img className='form-img' src='./icon_register.svg' alt='spaceship' />
            </div>

            <div className='form-content-right'>
                {/* Thông báo đăng ký thành công */}
                <div className={`form-success ${showSuccess ? 'show' : 'hidden'}`}>
                    <div className='gap-3 w-auto'>
                        <h3 className='text-base px-5'>Đăng ký thành công, vui lòng nhập mã xác thực được gửi đến email: {values.email}</h3>
                        {/* <img className='form-img-2' src='./success.svg' alt='success-image' /> */}
                        <VerifyRegister onVerifyOTP={handleOtp}/>
                        <button className='form-input-btn' type='submit' onClick={handleVerify}>
                            Xác thực
                        </button>
                    </div>
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
                                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
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
                                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
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
                        {errors.email && <p className="error-message">{errors.email}</p>}
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
                        {errors.password && <p className="error-message">{errors.password}</p>}
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
                        {errors.repeatPassword && <p className="error-message">{errors.repeatPassword}</p>}
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
                        {errors.phone && <p className="error-message">{errors.phone}</p>}
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
