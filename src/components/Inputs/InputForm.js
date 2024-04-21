import clsx from 'clsx'
import React from 'react'


const InputForm = ({ label, disabled, register, errors, id, validate, type = 'text', placehoder, fullWidth, defaultValue }) => {
  return (
    <div className=' flex flex-col gap-2 h-[45px]'>
      <div className=' border-2 border-indigo-500/100 rounded-sm '>
        {label && <label htmlFor={id}>{label}</label>}
        <input type={type}
          id={id}
          {...register(id, validate)}
          disabled={disabled}
          placeholder={placehoder}
          className={clsx('form-input', fullWidth && 'w-full')}
          defaultValue={defaultValue}
           />

      </div>
      {errors[id] && <small className='text-base text-red-500'>{errors[id]?.message}</small>}
    </div>

  )
}

export default InputForm