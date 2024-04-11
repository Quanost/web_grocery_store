import React from 'react';
import { useSearchParams, useNavigate, useParams, createSearchParams } from 'react-router-dom';

const PaginationItem = ({ children }) => {
    const { namecategory, categoryId } = useParams();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const handlePatination = () => {
        let param = [];
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of params) queries[i[0]] = i[1]
        if (Number(children)) queries.page = Number(children)
        navigate({
            pathname: `/${namecategory}/${categoryId}`,
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