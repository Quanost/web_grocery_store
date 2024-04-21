import React, { useState, useEffect } from 'react'
import { apiGetUsers, apiUpdateUser, apiDeleteUser, apiUploadSingleImage } from '../../apis'
import { Pagination, InputForm, Button, Select, EditAvatar } from '../../components';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import icons from '../../ultils/icons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { userRoles, userStatus } from '../../ultils/contants';


const ManageCategories = () => {
  const { handleSubmit, register, setValue, formState: { errors }, reset } = useForm({
    name: '',
    description: '',
    slug: '',
    parentId: '',
  });
  const { LiaUserEditSolid, MdCancelPresentation, MdOutlineDelete } = icons
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState('');
  const [errorGetAPI, setErrorGetAPI] = useState(null);
  const [pageInfo, setPageInfo] = useState({});
  const [params] = useSearchParams();
  const [editUser, setEditUser] = useState(null);
  const [image, setImage] = useState(null);



  const getUsers = async (queries) => {
    const response = await apiGetUsers(queries = { ...queries, limit: 5, page: queries.page ? queries.page : 1 });
    if (response?.status === 200) {
      setUsers(response?.data.users);
      setPageInfo(response?.data.pageInfo);
    }
  }
  const handleSeach = (e) => {
    e.preventDefault();
    setQueries(e.target.value);

    if (e.target.value.trim() === '') {
      const queries = Object.fromEntries([...params]);
      setErrorGetAPI(null);
      getUsers(queries);
    }
  }
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (!queries.page) queries.page = 1;
    getUsers(queries)
  }, [params])

  const searchUsers = async (event) => {
    event.preventDefault();
    const params = {}
    if (queries?.length > 0) params.name = queries;
    if (!params.page) params.page = 1;
    const response = await apiGetUsers(params);
    if (response?.status === 200) {
      setUsers(response?.data.users);
    } else if (response?.status === 404) {
      setErrorGetAPI('Không tìm thấy người dùng');
    }
  }

  function dataURLtoFile(dataurl, filename) {
    if (!dataurl) {
      return null;
    }
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleUploadImage = async (base64Image) => {
    const file = dataURLtoFile(base64Image, 'avatar.png');
    const formData = new FormData();
    formData.append('image', file);
    const reponse = await apiUploadSingleImage(formData);
    if (reponse?.status === 200) {
      toast.success('Cập nhật ảnh đại diện thành công');
      return reponse?.data;
    } else {
      toast.error('Cập nhật ảnh đại diện thất bại');
      return null;
    }
  };
  useEffect(() => {
    if (editUser) {
      reset({ ...editUser, isBlocked: editUser.isBlocked.toString() })
    }
  }, [editUser])

  const handleUpdateUser = async (data) => {
    if (image) {
      const imageurl = await handleUploadImage(image);
      if (imageurl)
        data.avatar = imageurl;
    }

    data.isBlocked = data.isBlocked === 'true';
    const response = await apiUpdateUser({ ...data, id: editUser.id });
    if (response?.status === 200) {
      setEditUser(null);
      const queries = Object.fromEntries([...params]);
      getUsers(queries);
      toast.success('Cập nhật người dùng thành công')
    } else if (response?.status === "error") {
      toast.error(response?.message)
    }
  }
  const handleDeleteUser = (event, id) => {
    event.preventDefault();
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(id);
        if (response?.status === 200) {
          const queries = Object.fromEntries([...params]);
          getUsers(queries);
          toast.success(response?.message)
        } else if (response?.status === "error") {
          toast.error('Xoá người dùng thất bại')
        }
      }
    })
  }
  const handleUserEdit = (event, user) => {
    event.preventDefault();
    setEditUser(user);
  }

  const handleUpLoadImage = (image) => {
    setImage(image)
  }
  return (
    <div>
      <h1 className='h-[75px] flex justify-between items-center text-2xl font-medium font-main px-4 border-b'>
        Quản lý loại sản phẩm
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4'>
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
            <button onClick={searchUsers} type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span class="sr-only">Tìm kiếm</span>
            </button>
          </form>

        </div>
        <form onSubmit={handleSubmit(handleUpdateUser)} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          {editUser && <Button childen='Cập nhật' type='submit'>Cập nhật</Button>}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    #
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white ">
                    Tên loại sản phẩm
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
                    {users?.map((user, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {key + 1}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                          {editUser?.id === user.id ? (
                            <div className='flex gap-2'>
                              <EditAvatar avartardefault={editUser?.avatar} handleUpLoadImage={handleUpLoadImage} />
                            </div>
                          ) : (
                            <img src={user.avatar} alt='Avatar' className='flex w-14 h-14 object-cover' />
                          )}

                          <h5 className="font-medium text-black dark:text-white">
                            {editUser?.id === user.id ?
                              <div className=' mt-2 flex gap-2 w-60'>
                                <InputForm id={'firstName'} register={register} errors={errors} defaultValue={editUser?.firstName}
                                  validate={{
                                    required: 'Họ không được để trống',
                                  }}
                                />
                                <InputForm id={'lastName'} register={register} errors={errors} defaultValue={editUser?.lastName}
                                  validate={{
                                    required: 'Tên không được để trống',
                                  }}
                                />
                              </div>
                              :
                              user.firstName + " " + user.lastName
                            }
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          {editUser?.id === user.id ?
                            <div className='mt-16'>
                              <InputForm id={'email'} register={register} errors={errors} defaultValue={editUser?.email}
                                validate={{
                                  required: 'Email không được để trống',
                                  pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email không hợp lệ"
                                  }
                                }} />
                            </div>
                            :
                            <p className="text-black dark:text-white">
                              {user.email}
                            </p>
                          }

                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          {editUser?.id === user.id ?
                            <div className='mt-16'>
                              <InputForm id={'phone'} register={register} errors={errors} defaultValue={editUser?.phone}
                                validate={{
                                  required: 'Số điện thoại không được để trống',
                                  pattern: {
                                    value: /^[62 | 0 ]+\d{9}/gi,
                                    message: "Số điện thoại không hợp lệ"
                                  }
                                }} />
                            </div>
                            :
                            <p className="text-black dark:text-white">
                              {user.phone}
                            </p>
                          }

                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          {editUser?.id === user.id ?
                            <div className='mt-16'>
                              <Select id={'role'} register={register} errors={errors} defaultValue={user?.role} options={userRoles}
                                validate={{
                                  required: 'Vai trò không được để trống',
                                }} />
                            </div>
                            :
                            <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-md font-medium bg-warning text-warning `}>
                              {userRoles.find(el => el.value === user.role)?.label}
                            </p>
                          }
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          {editUser?.id === user.id ?
                            <div className='mt-16'>
                              <Select id={'isBlocked'} register={register} errors={errors} defaultValue={editUser?.isBlocked} options={userStatus}
                                validate={{
                                  required: 'Trạng thái không được để trống',
                                }} />
                            </div>
                            :
                            <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                               ${!user.isBlocked ?
                                'bg-success text-success'
                                :
                                'bg-danger text-danger'
                              }`}>
                              {user.isBlocked ? 'Đã khoá' : 'Hoat động'}
                            </p>
                          }

                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            {editUser?.id === user.id ?
                              <span className="hover:text-primary" onClick={(e) => handleUserEdit(e, null)}>
                                <MdCancelPresentation size={22} />
                              </span>
                              :
                              <span className="hover:text-primary" onClick={(e) => handleUserEdit(e, user)}>
                                <LiaUserEditSolid size={22} />
                              </span>
                            }

                            <button className="hover:text-primary" onClick={(e) => handleDeleteUser(e, user?.id)}>
                              <MdOutlineDelete size={22} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                }
              </tbody>
            </table>
            <div className='flex justify-end mt-5 bg-red-300 gap-5'>
              <Pagination page={pageInfo?.page} currentPage={pageInfo?.currentPage} />
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default ManageCategories