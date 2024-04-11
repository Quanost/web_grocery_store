import React from 'react';
import icons from '../ultils/icons';
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ type, name }) => {
    const routes = [
        { path: '/', breadcrumb: 'Trang chủ' },
        { path: '/:namecategory/:categoryId/:title/:pid', breadcrumb: name },
        { path: '/:namecategory/:categoryId', breadcrumb: type },

    ]

    const breadcrumbs = useBreadcrumbs(routes);
    const { SlArrowLeft } = icons
    return (
        <div className='flex items-center bg-white  mt-2 py-3 px-3 text-base font-main '>
            {breadcrumbs?.filter(el => !el.match.route === false).map(({ breadcrumb, match }, index, self) => (
                <Link className={`flex items-center gap-1 pr-2 ${index !== self.length - 1 ? 'hover:text-red-400' : ''}`}
                    key={match.pathname}
                    to={match.pathname}>
                    <span>{breadcrumb}</span>
                    {index !== self.length - 1 && <SlArrowLeft size={12} />}
                </Link>
            ))}
        </div>
    )
}

export default BreadCrumbs