import React, { useEffect, useState} from "react";
import { Header, Navigation, Sidebar, Banner } from '../../components';
import CardProduct from '../../components/CardProductType';
import CardProductType from '../../components/CardProductType';
import { useSelector } from 'react-redux';

const Home = () => {
  const [categories, setCategories] = useState([]); 
  const categoriesStore = useSelector(state => state.appReducer)

  useEffect(() => {
    setCategories(categoriesStore.categories);
}, [categoriesStore]);

console.log("categories",categories)
  return (
    <div className='w-main flex'>
      <div className='flex flex-col px-1 gap-5 w-[100%] flex-auto '>
        <Banner />
        {categories?.map((categories) =>(
          <CardProductType categoriesId={categories.id} title={categories.name}/>
        ))}
        
      </div>
    </div>
  )
}

export default Home