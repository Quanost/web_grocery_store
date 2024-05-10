import React from 'react';
import { SelectSeachOptions } from '../../components';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from 'react-hook-form';

const InputFloatLabel = ({ control, label, register, errors, disabled, option, id, validate, type = 'text', defaultValue, required, selectSeach, messageError }) => {

    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
    return (
        <div>
            <div className="relative">
                {selectSeach ?
                    <SelectSeachOptions
                        name={id}
                        control={control}
                        placeholder={label}
                        options={option}
                        messageError={messageError}
                        disabled={disabled}
                    />
                    :
                    <div>
                        <input type={type} id={id} {...register(id, validate)} disabled={disabled} defaultValue={defaultValue}
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-blue-300 focus:border-2 peer" placeholder=" " />
                        {label &&
                            <label htmlFor={id} className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                {label} {required && <span className="text-red-500">*</span>}
                            </label>}
                    </div>

                }
            </div>
            {errors[id] && <small className='text-base text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputFloatLabel