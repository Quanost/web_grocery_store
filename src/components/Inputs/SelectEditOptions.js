import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Controller } from 'react-hook-form';

export default function SelectEditOptions({ control, name, options, placeholder }) {
  return (
    <div className="flex justify-center">
      <Controller
        name={name}
        control={control}
        rules={{ required: 'Giá trị không được trống' }}
        render={({ field }) => (
          <Dropdown 
            {...field}
            options={options} 
            optionLabel="name" 
            showClear 
            emptyMessage="Không có dữ liệu gợi ý"
            editable 
            placeholder={placeholder}
            className="flex text-sm justify-center w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            pt={{
              header: 'bg-gray-200 h-[3rem] flex justify-center items-center',
              filterContainer: 'h-[2rem] w-full mx-5 flex justify-center items-center',
              filterInput: 'h-full pl-5 w-full justify-center items-center placeholder',
              filterIcon: '-mt-2',
              panel: 'bg-white border-[1.5px] border-stroke rounded-lg',
              wrapper: 'text-black dark:text-white rounded-md m-5 flex flex-col gap-5',
              clearIcon: '-mt-1.5',
              trigger: 'pl-5'
            }}
          />
        )}
      />
      {/* <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" showClear emptyMessage="Không có dữ liệu gợi ý"
        editable placeholder="Nhập giá trị thuộc tính" className="flex text-sm justify-center w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        pt={{
          header: 'bg-gray-200 h-[3rem] flex justify-center items-center',
          filterContainer: 'h-[2rem] w-full mx-5 flex justify-center items-center',
          filterInput: 'h-full pl-5 w-full justify-center items-center placeholder',
          filterIcon: '-mt-2',
          panel: 'bg-white border-[1.5px] border-stroke rounded-lg',
          wrapper: 'text-black dark:text-white rounded-md m-5 flex flex-col gap-5',
          clearIcon: '-mt-1.5',
          trigger: 'pl-5'
        }}
      /> */}
    </div>
  )
}
