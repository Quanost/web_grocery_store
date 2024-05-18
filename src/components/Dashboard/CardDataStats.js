import React from 'react';

const CardDataStats = ({
    title,
    total,
    children,
}) => {
    return (
        <div className="flex justify-between items-center rounded-sm border border-stroke bg-white py-1 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {total}
                    </h4>
                    <span className="text-md font-medium dark:text-white">{title}</span>
                </div>
            </div>
            <div className="flex h-15 w-15 items-center justify-center rounded-lg bg-meta-2 dark:bg-meta-4">
                {children}
            </div>
        </div>
    );
};

export default CardDataStats;