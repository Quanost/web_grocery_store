import React from 'react';
import clsx from 'clsx'

const Select = ({ label, options = [], register, errors, id, validate, style, fullWidth, defaultValue }) => {
  return (
    <div className='flex flex-col gap-2 h-[45px]'>
      <div className='border rounded-sm flex flex-col'>
        {label && <label htmlFor={id}>{label}</label>}
        <select defaultValue={defaultValue} className={clsx('form-select border h-[43px]', fullWidth && 'w-full', style)} id={id} {...register(id, validate)}>
          <option value=""> --- Chọn ----</option>
          {options?.map((el) => (
            <option value={el.value}>{el.label}</option>
          ))}
        </select>
      
      </div>
      {errors[id] && <small className='text-xs text-red-500 my-auto'>{errors[id]?.message}</small>}
    </div>
  )
}

export default Select
