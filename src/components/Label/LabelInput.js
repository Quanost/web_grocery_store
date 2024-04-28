import React from 'react'

const LabelInput = ({label,required}) => {
    return (
        <label className="mb-3 font-main text-base block text-black dark:text-white" required>
            {label}
            {required ? <span className="text-red-500 text-xl">*</span> : ''}
        </label>
    )
}

export default LabelInput
