import clsx from 'clsx'
import React from 'react'

const InputTextAreaForm = ({ label, disabled, register, errors, id, validate, type = 'textarea', placeholder, fullWidth, defaultValue }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm text-indigo-500">{label}</label>
            <textarea
                id={id}
                rows="5"
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('form-textarea  border-2 border-indigo-500/100 rounded-sm focus:outline-none focus:border-indigo-500', fullWidth && 'w-full')}
                defaultValue={defaultValue}
            />
            {errors[id] && <small className="text-base font-main text-red-500">{errors[id]?.message}</small>}
        </div>
    )
}

export default InputTextAreaForm