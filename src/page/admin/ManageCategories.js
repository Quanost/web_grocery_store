import React, { useState, useEffect } from 'react'
import { apiGetAllCategory, apiUpdateCategory, apiDeleteCategory } from '../../apis'
import { InputTable, Button, DialogForm, DialogTableCategory } from '../../components';
import { useSearchParams } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import icons from '../../ultils/icons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formatDate } from '../../ultils/helper';


const ManageCategories = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    name: '',
    description: '',
    slug: '',
    parentId: '',
  });
  const { LiaUserEditSolid, MdCancelPresentation, MdOutlineDelete } = icons

  const [queries, setQueries] = useState('');
  const [errorGetAPI, setErrorGetAPI] = useState(null);
  const [params] = useSearchParams();
  const [editCategory, setEditCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState(null)


  const getAllCategories = async (queries) => {
    const response = await apiGetAllCategory(queries);
    if (response?.status === 200) {
      setCategories(response?.data);

      const options = response?.data.map(category => ({
        value: category.id,
        label: category.name
      }))
      setCategoriesOptions(options)

    }
  }
  const handleSeach = (e) => {
    e.preventDefault();
    setQueries(e.target.value);

    if (e.target.value.trim() === '') {
      const queries = Object.fromEntries([...params]);
      setErrorGetAPI(null);
      getAllCategories(queries);
    }
  }


  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    getAllCategories(queries)
  }, [params])

  const searchCategories = async (event) => {
    event.preventDefault();
    const params = {}
    if (queries?.length > 0) params.name = queries;
    const response = await getAllCategories(params);
    if (response?.status === 200) {
      setCategories(response?.data);
    } else if (response?.status === 404) {
      setErrorGetAPI('Không tìm thấy Loại sản phẩm');
    }
  }


  useEffect(() => {
    if (editCategory) {
      reset(editCategory)
    }
  }, [editCategory])

  const handleUpdateCategory = async (data) => {
    const { parentId, ...otherData } = data;
    if (editCategory) {
      const newData = parentId ? { ...otherData, id: editCategory.id, parentId } : { ...otherData, id: editCategory.id };
      const response = await apiUpdateCategory(newData);
      if (response?.status === 200) {
        setEditCategory(null);
        const queries = Object.fromEntries([...params]);
        getAllCategories(queries);
        toast.success('Cập nhật loại sản phẩm thành công')
      } else if (response?.status === 500) {
        toast.error(response?.error)
      }
    }
  }
  const handleDeleteCategory = (event, id) => {
    event.preventDefault();
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteCategory(id);
        if (response?.status === 200) {
          const queries = Object.fromEntries([...params]);
          getAllCategories(queries);
          toast.success(response?.message)
        } else if (response?.status === 500) {
          toast.error('Xoá Loại sản phẩm thất bại')
        }
      }
    })
  }
  const handleCategoryEdit = (event, category) => {
    event.preventDefault();
    setEditCategory(category);
  }

  return (
    <div className='dark:bg-strokedark dark:text-white'>
      <div className='w-full p-4'>
        <h1 className='h-[75px] flex justify-between items-center text-2xl font-medium font-main  border-b'>
          Quản lý loại sản phẩm
        </h1>
        <div className='flex justify-between py-4'>
          {categoriesOptions && <DialogForm optionsCategories={categoriesOptions} getAllCategories={getAllCategories} />}
          <form class="flex justify-end items-center w-96 ">
            <label htmlFor="simple-search" class="sr-only">Tìm kiếm</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                </svg>
              </div>
              <input type="text" onChange={handleSeach} id="simple-search" class="bg-gray-50 font-main  border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500" placeholder="Tìm theo tên hoặc email ..." required />
            </div>
            <button onClick={searchCategories} type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span class="sr-only">Tìm kiếm</span>
            </button>
          </form>
        </div>
      </div>
      <div className='w-full p-4'>
        <form onSubmit={handleSubmit(handleUpdateCategory)} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          {editCategory && <Button childen='Cập nhật' type='submit'>Cập nhật</Button>}
          <div className=" overflow-x">
            <table className="table-auto overflow-scroll w-full">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    #
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white ">
                    Tên danh mục sản phẩm
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white ">
                    Mô tả
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Slug
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Loại
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Ngày tạo
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {errorGetAPI ?
                  <div className='flex justify-center items-center font-main text-lg '>
                    {errorGetAPI}
                  </div>
                  :
                  <>
                    {categories?.map((category, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {key + 1}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            {editCategory?.id === category.id ?
                              <div className=' mt-2 flex gap-2 w-60'>
                                <InputTable id={'name'} register={register} errors={errors} defaultValue={editCategory?.name}
                                  validate={{
                                    required: 'Tên loại không được để trống',
                                  }}
                                />
                              </div>
                              :
                              category.name
                            }
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          {editCategory?.id === category.id ?
                            <div className=''>
                              <InputTable id={'description'} register={register} errors={errors} defaultValue={editCategory?.description}
                                validate={{
                                  required: 'Mô tả không được để trống',
                                }} />
                            </div>
                            :
                            <p className="text-black dark:text-white">
                              {category.description}
                            </p>
                          }

                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                          <p className="text-black dark:text-white">
                            {category.slug}
                          </p>


                        </td>
                        <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                          <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                               ${category.parentId ?
                              'bg-success text-success'
                              :
                              'bg-warning text-warning'
                            }`}>
                            {category.parentId === null ? 'Parent' : 'Subparent'}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                          <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                               ${!category.createdAt ?
                              'bg-success text-success'
                              :
                              'bg-danger text-danger'
                            }`}>
                            {formatDate(category.createdAt)}
                          </p>


                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5 dark:text-red-200">
                            {editCategory?.id === category.id ?
                              <span className="hover:text-primary" onClick={(e) => handleCategoryEdit(e, null)}>
                                <MdCancelPresentation size={22} />
                              </span>
                              :
                              <span className="hover:text-primary" onClick={(e) => handleCategoryEdit(e, category)}>
                                <LiaUserEditSolid size={22} />
                              </span>
                            }

                            <button className="hover:text-primary" onClick={(e) => handleDeleteCategory(e, category?.id)}>
                              <MdOutlineDelete size={22} />
                            </button>
                            {categoriesOptions && <DialogTableCategory nameParent={category.name} idParent={category.id} optionsCategories={categoriesOptions} subCategories={category?.subCategories} getAllCategories={getAllCategories} />}
                            {/* <DialogTableCategory nameParent = {category.name} idParent = {category.id} subCategories={category?.subCategories} getAllCategories={getAllCategories} /> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                }
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>

  )
}

export default ManageCategories