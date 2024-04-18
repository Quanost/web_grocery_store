import React from 'react';
import { clsx } from 'clsx'

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFieds, style, fullWidth, placehoder, isHideLabel}) => {
  return (
    <div className={clsx('flex flex-col relative mb-2', fullWidth && 'w-full')}>
        {!isHideLabel && <label className='text-[10px] anime-slide-top-sm absolute top-0 left-[12px] block' htmlFor={nameKey}>{nameKey}</label>}
        <input
            type={type || 'text'}
            value={value}
            onChange={(e) => setValue(prev =>({...prev, [nameKey]: e.target.value}))}
            onFocus={() => setInvalidFieds(prev => ({...prev, [nameKey]: false}))}
            className={clsx('p-4 rounded-xl border border-gray-300', invalidFields[nameKey] && 'border-red-500', style)}
            placeholder={placehoder}/>
       {invalidFields?.some(el => el.name === nameKey) && <small className='text-red-500 italic' >{invalidFields.find(el => el.name === nameKey).message}</small>}
    </div>
  )
}

export default InputField