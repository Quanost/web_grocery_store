import React from "react";
import { Controller } from "react-hook-form";
import { InputNumber } from 'primereact/inputnumber';


function InputNumbers({  control, name, placeholder, messageError = "Giá trị không được trống", min, max}) {
    return (
        <div className="flex-auto">
            <Controller
                name={name}
                control={control}
                defaultValue={0}
                rules={{ 
                    required: messageError,
                    validate: value => value >= min && value <= max || `Giá trị phải từ ${min} đến ${max}`
                 }}
                render={({ field: { onChange, value, ...field } }) => (
                    <InputNumber
                        {...field}
                        value={value}
                        onChange={(e) => onChange(e.value)}
                        placeholder={placeholder}
                        showButtons
                        min={0}
                        
                        className="w-full rounded-lg h-12 text-base border-[1.5px] border-stroke bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                )}
            />
        </div>
    );
}

export default InputNumbers
