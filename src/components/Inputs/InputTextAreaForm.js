import clsx from 'clsx'
import React from 'react'

const InputTextAreaForm = ({ label, disabled, register, errors, id, validate, type = 'textarea', placeholder, fullWidth, defaultValue, rows = 5 }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm text-indigo-500">{label}</label>
            <textarea
                id={id}
                rows={rows}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('form-textarea  bg-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary', fullWidth && 'w-full')}
                defaultValue={defaultValue}
            />
            {errors[id] && <small className="text-base font-main text-red-500">{errors[id]?.message}</small>}
        </div>
    )
}

export default InputTextAreaForm