import React from 'react';
import clsx from 'clsx'

const InputForm = ({ label, disabled, register, errors, id, validate, type = 'text', placehoder, fullWidth, defaultValue }) => {
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placehoder}
                defaultValue={defaultValue}
                className="w-full  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
             {errors[id] && <small className='text-base text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputForm
