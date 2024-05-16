import React, { useEffect, useState } from 'react'
import { EditAvatar } from '../../components';
import icon from '../../ultils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../ultils/helper';
import { apiUploadSingleImage, apiUpdateUser } from '../../apis';
import { toast } from 'react-toastify';

const AdminPersonal = () => {
    const { handleSubmit, register, setValue, formState: { errors, isDirty }, reset } = useForm();
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();
    const { current, token } = useSelector(state => state.user);
    useEffect(() => {
        if (current) {
            reset({
                id: current?.id,
                firstName: current?.firstName,
                lastName: current?.lastName,
                phone: current?.phone,
                email: current?.email,
                isBlocked: current?.isBlocked,
                avatar: current?.avatar,
            })
            console.log(current)
        }
    }, [current])

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
    const handleImage = (image) => {
        setImage(image)
    }
    const handleUpdateUser = async (data) => {
        if (image) {
            const imageurl = await handleUploadImage(image);
            if (imageurl)
                data.avatar = imageurl;
        }
        const response = await apiUpdateUser(data);
        if (response?.status === 200) {
            dispatch({ type: 'user/login', payload: { isLoggedIn: true, token, current: response?.data } })
            toast.success('Cập nhật thông tin thành công')
        } else if (response?.status === "error") {
            toast.error(response?.message)
        }
    }

    return (
        <div className='dark:bg-strokedark dark:text-white min-h-screen'>
            <h1 className='h-[75px] flex justify-between items-center text-2xl font-medium font-main px-4 border-b'>
                Thông tin cá nhân
            </h1>
            <div className="flex items-center justify-center my-5 py-5 bg-white w-[70%] mx-auto px-20 border-2 rounded-xl ">
                <div className="mx-auto w-full max-w-[550px] pb-5">
                    <form onSubmit={handleSubmit(handleUpdateUser)}>
                        <div className=''>
                            <EditAvatar avartardefault={current?.avatar} handleUpLoadImage={handleImage} size={'200px'} />
                        </div>

                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="firstName" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Họ
                                    </label>
                                    <input type="text" name="firstName" id="firstName" placeholder="Nhập họ"  {...register(`firstName`, { required: 'Họ không được để trống' })}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    {errors['firstName'] && <span className='text-red-500 '>{errors['firstName']?.message}</span>}
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="lastName" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Tên
                                    </label>
                                    <input type="text" name="lastName" id="lastName" placeholder="Nhập tên" {...register(`lastName`, { required: 'Tên không được để trống' })}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    {errors['lastName'] && <span className='text-red-500 '>{errors['lastName']?.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                Số điện thoại
                            </label>
                            <input type="text" name="phone" id="phone" placeholder="Nhập số điện thoại"
                                {...register(`phone`, {
                                    required: 'Số điện thoại không được để trống',
                                    pattern: {
                                        value: /^[64 | 0 ]+\d{9}/gi,
                                        message: 'Số điện thoại không hợp lệ. ví dụ 0905067222'
                                    }
                                })}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            {errors['phone'] && <span className='text-red-500 '>{errors['phone']?.message}</span>}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Email
                            </label>
                            <input type="email" name="email" id="email" placeholder="Nhập email"
                                {...register(`email`, {
                                    required: 'Email không được để trống',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Email không hợp lệ. ví dụ abc@gmail.com'
                                    }
                                })}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            {errors['email'] && <span className='text-red-500 '>{errors['email']?.message}</span>}
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="createdAt" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Ngày tạo
                                    </label>
                                    <input type="text" name="createdAt" id="createdAt" value={formatDate(current?.createdAt)} disabled
                                        className="w-full  rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="isBlocked" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Trạng thái
                                    </label>
                                    <input type="text" name="isBlocked" id="isBlocked" value={current?.isBlocked ? 'Đã khoá' : 'Hoạt động'} disabled
                                        className="w-full rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>

                        {isDirty &&
                            <div>
                                <button
                                    type='submit'
                                    className="hover:bg-red-400 w-full rounded-md bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                    Lưu chỉnh sửa
                                </button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminPersonal
