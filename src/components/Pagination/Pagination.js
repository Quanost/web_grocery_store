import React from 'react'
import { usePagination } from '../../hooks/usePagination'
import PaginationItem from './PaginationItem'


const Pagination = ({page, currentPage}) => {
  const pagination = usePagination(page, currentPage)
  return (
    <div className='flex items-center'>
      {pagination?.map((el) => (
        <PaginationItem key={el}>
          {el}
        </PaginationItem>
      ))}
    </div>
  )
}

export default Pagination