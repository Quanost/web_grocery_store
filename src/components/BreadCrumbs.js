import React from 'react';
import icons from '../ultils/icons';

const BreadCrumbs = ({ type, name }) => {
    const { SlArrowLeft } = icons
    return (
        <div className='flex items-center bg-white  mt-2  '>
            <div className='flex items-center border-r px-5'>
                <SlArrowLeft size={15} />
            </div>
            <nav className=" font-main rounded-md relative flex w-full flex-wrap items-center justify-between  py-3 mt-2  text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <nav
                        className="bg-grey-light w-full rounded-md"
                        aria-label="breadcrumb"
                    >
                        <ol className="list-reset flex">
                            <li>
                                <a
                                    href="/"
                                    className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                >{type}</a>
                            </li>
                            {name && (
                                
                                    <li className='flex items-center'>
                                        <span className="mx-2 text-neutral-500 dark:text-neutral-400"><SlArrowLeft size={10} /></span>
                                        <span className="mx-1 text-neutral-500 dark:text-neutral-400">{name}</span>
                                    </li>
                                    
                               
                            )}
                        </ol>
                    </nav>
                </div>
            </nav>
        </div>
    )
}

export default BreadCrumbs