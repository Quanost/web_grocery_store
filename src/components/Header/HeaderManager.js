import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMessage from '../Dropdown/DropdownMessage';
import DropdownNotification from '../Dropdown/DropdownNotification';
// import DropdownUser from '../Dropdown/DropdownUser';
import Logo from '../../assets/image/Logo.png';
import DarkModeSwitcher from './DarkModeSwitcher';

const HeaderManager = (props) => {
    return (
        <header className="sticky top-0 z-0 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <DarkModeSwitcher />
                        <DropdownNotification />
                        <DropdownMessage />
                    </ul>

                    {/* <DropdownUser /> */}
                </div>
            </div>
        </header>
    );
};

export default HeaderManager