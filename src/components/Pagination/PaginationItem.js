import React from 'react';
import { useSearchParams, useNavigate, useParams, createSearchParams, useLocation } from 'react-router-dom';

const PaginationItem = ({ children }) => {
   
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const location = useLocation();

    const handlePatination = () => {
        const queries = Object.fromEntries([...params])
        if (Number(children)) queries.page = Number(children)
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString()
        })
    }

    return (
        <button className={`w-10 h-10 cursor-pointer flex items-center justify-center hover:rounded-full hover:bg-gray-300 
        ${+params.get('page') === +children && 'rounded-full bg-gray-300'}
        ${!+params.get('page') && +children === 1 && 'rounded-full bg-gray-300'}`}

            type='button'
            disabled={!Number(children)} onClick={handlePatination}>
            {children}
        </button>
    )
}

export default PaginationItem