
import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { InputForm, Button, Select } from '../index';
import { useForm } from 'react-hook-form';
import icon from '../../ultils/icons';
import { apiDeleteCategory, apiUpdateCategory } from '../../apis';
import { toast } from 'react-toastify';
import { formatDate } from '../../ultils/helper';

export default function DialogTableCategory({ nameParent, optionsCategories, subCategories, getAllCategories }) {
    const { RiParentLine, LiaUserEditSolid, MdCancelPresentation, MdOutlineDelete } = icon
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        name: '',
        description: '',
        parentId: null,
        attributes: [],
        active: true
    });
    const [visible, setVisible] = useState(false);
    const [editSubCategory, seteditSubCategory] = useState(null);


    const handleUpdateSubCategory = async (data) => {
        console.log('newData', data)
        const response = await apiUpdateCategory(data);
        if (response?.status === 200) {
            seteditSubCategory(null);
            getAllCategories();
            toast.success('Cập nhật loại sản phẩm thành công')
        } else if (response?.status === 500) {
            toast.error(response?.error)
        }

    }
    const handleCategoryEdit = (event, category) => {
        event.preventDefault();
        seteditSubCategory(category);
    }

    const handleDeleteCategory = async (event, id) => {
        event.preventDefault();
        const confirmation = window.confirm('Bạn có chắc chắn muốn xóa? Bạn sẽ không thể hoàn tác hành động này!');
        if (confirmation) {
            const response = await apiDeleteCategory(id);
            if (response?.status === 200) {
                getAllCategories();
                toast.success('Xoá loại sản phẩm thành công')
            } else if (response?.status === "error") {
                toast.error('Xoá Loại sản phẩm thất bại')
            }
        }
    }

    useEffect(() => {
        if (editSubCategory) {
            reset(editSubCategory)
        }
    }, [editSubCategory])
    console.log('editSubCategory con', editSubCategory)
    return (
        <div className="card flex justify-center">
            <RiParentLine size={22} onClick={() => setVisible(true)} />
            <Dialog header="Loại sản phẩm" visible={visible} maximizable style={{ width: '80vw' }} onHide={() => setVisible(false)}>
                <form onSubmit={handleSubmit(handleUpdateSubCategory)} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    {editSubCategory && <Button childen='Cập nhật' type='submit'>Cập nhật</Button>}
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        #
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white ">
                                        Danh mục sản phẩm
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
                                {subCategories?.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-5 dark:border-strokedark">
                                            <p className="text-black dark:text-white">Không có loại sản phẩm</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {subCategories?.map((category, key) => (
                                            <tr key={key}>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">
                                                        {key + 1}
                                                    </p>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {editSubCategory?.id === category.id ?
                                                            <div className='w-40'>
                                                                <Select id={'parentId'} register={register} errors={errors} options={optionsCategories} defaultValue=''
                                                                    validate={{

                                                                    }} />
                                                            </div>
                                                            :
                                                            nameParent
                                                        }
                                                    </h5>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {editSubCategory?.id === category.id ?
                                                            <div className=' mt-2 flex gap-2 w-60'>
                                                                <InputForm id={'name'} register={register} errors={errors} defaultValue={editSubCategory?.name}
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
                                                    {editSubCategory?.id === category.id ?
                                                        <div className=' mt-2 flex gap-2 w-60'>
                                                            <InputForm id={'description'} register={register} errors={errors} defaultValue={editSubCategory?.description}
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
                                                    <div className="flex items-center space-x-3.5">
                                                        {editSubCategory?.id === category.id ?
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

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}


                            </tbody>
                        </table>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}
