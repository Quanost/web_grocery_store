'use client'
import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { apiSeachProduct } from '../../apis'
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import path from '../../ultils/path';

const SeachForm = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    if (value === '') {
      setProducts([]);
      return;
    }
    try {
      const response = await apiSeachProduct(value)
      if (response?.status === 200) {
        setProducts(response?.data?.products ? response?.data?.products : response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const debouncedSearch = _.debounce(handleSearch, 1000);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);
  const handleLinkClick = () => {
    setQuery('');
    setProducts([]);
  }

  return (
    <form className='w-[440px] relative'>
      <div className='relative'>
        <input
          type='search'
          placeholder='Tìm kiếm sản phẩm...'
          className='w-full p-4 rounded-full bg-white'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-white rounded-full'>
          <FaSearch />
        </button>
      </div>

      {products?.length > 0 && (
        <div className='absolute z-20 top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2'>
          {
            products.map(product => (
              <Link key={product.id} to={`/${product.categories[0].name}/${product.categories[0].id}/${product.slug}/${product.id}`} onClick={handleLinkClick}>
                <span key={product.id}>{product.name}</span>
              </Link>

            ))
          }
        </div>
      )}
    </form>
  )
}

export default SeachForm
