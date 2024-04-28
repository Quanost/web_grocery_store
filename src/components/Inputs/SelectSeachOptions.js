
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Controller } from 'react-hook-form';

export default function SelectSeachOptions({ control, name,placeholder, options, messageError = "Giá trị không được trống"}) {
   
    return (
        <div className="">
            <div className="flex justify-content-center">
            <Controller
                    name={name} 
                    control={control} 
                    rules={{ required: messageError }}
                    render={({ field }) => (
                        <Dropdown
                            value={field.value} 
                            onChange={(e) => field.onChange(e.value)} 
                            options={options} 
                            optionLabel="name" 
                            showClear placeholder={placeholder} 
                            filter
                            className="flex justify-center w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            pt={{
                                header: 'bg-gray-200 h-[3rem] flex justify-center items-center',
                                filterContainer: 'h-[2rem] w-full mx-5 flex justify-center items-center',
                                filterInput: 'h-full pl-5 w-full justify-center items-center placeholder',
                                filterIcon: '-mt-2',
                                panel: 'bg-white border-[1.5px] border-stroke rounded-lg',
                                wrapper: 'text-black dark:text-white rounded-md m-5 flex flex-col gap-5',
                                clearIcon: 'mx-5 -mt-2',
                            }}
                        />
                    )}
                />
                {/* <Dropdown
                    value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={options} optionLabel="name"
                    showClear placeholder={placeholder}
                    className="flex justify-center w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary 
                    disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    filter
                    pt={{
                        header: 'bg-gray-200 h-[3rem] flex justify-center items-center',
                        filterContainer: 'h-[2rem] w-full mx-5 flex justify-center items-center',
                        filterInput: 'h-full pl-5 w-full justify-center items-center placeholder',
                        filterIcon: '-mt-2',
                        panel: 'bg-white border-[1.5px] border-stroke rounded-lg',
                        wrapper: 'rounded-md m-5 flex flex-col gap-5',
                        clearIcon: 'mx-5 -mt-2',

                    }}
                /> */}
            </div>
        </div>
    )
}
