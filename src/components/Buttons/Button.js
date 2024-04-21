import React from 'react'

const Button = ({ childen, handleOnClick, style, fw, type = 'button' }) => {
    return (
        <button
            type={type}
            className={style ? style : ` px-4 py-2 rounded-md text-white bg-red-500 text-semibold my-2 ${fw ? 'w-full' : 'w-fit'}`}
            onClick={() => { handleOnClick && handleOnClick() }}>
            {childen}
        </button>
    )
}

export default Button