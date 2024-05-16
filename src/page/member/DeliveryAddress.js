import React, { useState } from 'react'
import icon from '../../ultils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { DialogCreateAddress } from '../../components';
import { getUserCurrent } from '../../store/user/asynActionUser';
import { address } from '../../ultils/dataAddress';
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form';
import { apiAddUserAddress, apiUpdateUserAddress, apiDeleteUserAddress } from '../../apis'

const DeliveryAddress = () => {
    const { current, userAddress } = useSelector(state => state.user);
    const { control, register, unregister, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const { IoLocationOutline, CiPhone, CiUser, FaPlus } = icon;
    const [showDialogAddress, setShowDialogAddress] = useState(false);
    const [typeSubmit, setTypeSubmit] = useState(false);  // false: add, true: update
    const dispatch = useDispatch();

    const handleUpdateUserAddress = async (e, data) => {
        e.preventDefault();
        setTypeSubmit(true);
        setShowDialogAddress(!showDialogAddress);
        setValue('customerName', data?.customerName);
        setValue('customerPhone', data?.customerPhone);
        setValue('city', { name: data?.city, code: address?.data?.provinceList?.find(item => item.name === data?.city)?.id });
        setValue('district', { name: data?.district, code: address?.data?.provinceList?.find(city => city.id === (watch('city')?.code))?.districtBOList.find(item => item.name === data?.district)?.id });
        setValue('ward', { name: data?.ward, code: address?.data?.provinceList?.flatMap(city => city?.districtBOList).find(district => district?.id === watch('district')?.code)?.wards?.find(item => item.name === data?.ward)?.id });
        setValue('address', data.address);
        setValue('id', data?.id);
    }

    const handleDeleteUserAddress = async (e, id) => {
        e.preventDefault();
        const response = await apiDeleteUserAddress(id);
        if (response?.status === 200) {
            dispatch(getUserCurrent(current?.id))
            toast.success('Xoá địa chỉ thành công')
        } else {
            toast.error(response?.error)
        }
    }
    const handleFormSubmit = async (data) => {
        try {
            let modifiedData = { ...data };
            modifiedData.userId = current?.id;
            modifiedData.city = data?.city?.name;
            modifiedData.country = 'VN'
            modifiedData.district = data?.district?.name;
            modifiedData.ward = data?.ward?.name;
            if (typeSubmit) {
                const response = await apiUpdateUserAddress(modifiedData);
                setTypeSubmit(false);
                if (response?.status === 200) {
                    dispatch(getUserCurrent(current?.id))
                    setShowDialogAddress(!showDialogAddress);
                    toast.success('Cập nhật địa chỉ thành công')
                } else {
                    toast.error('Cập nhật địa chỉ thất bại')
                }
            } else {
                const response = await apiAddUserAddress(modifiedData);
                if (response?.status === 200) {
                    dispatch(getUserCurrent(current?.id));
                    setShowDialogAddress(!showDialogAddress);
                    toast.success('Thêm địa chỉ thành công')
                } else {
                    toast.error('Thêm địa chỉ thất bại')
                }
            }
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <div className='font-main bg-slate-50'>
            <header className='flex items-center justify-center text-2xl py-2 font-semibold text-[#07074D] sm:text-xl bg-white border-2 w-[70%] mx-auto'>
                Thông tin cá nhân
            </header>
            <div className='flex items-center justify-center my-5 py-5 bg-white w-[70%] mx-auto px-20 border-2 rounded-xl'>
                <div className="mb-5 pt-3">
                    <label className="mb-5 block text-center text-base font-semibold text-[#07074D] sm:text-xl">
                        Địa chỉ nhận hàng
                    </label>
                    {userAddress?.length === 0 ? (
                        <divv>Bạn chưa có địa chỉ nhận hàng</divv>
                    ) : <>
                        {userAddress?.map((address, index) => (
                            <div key={index} className="flex flex-col my-5 bg-gray-100 rounded-2xl p-3 space-y-2 gap-2">
                                <div className='flex items-center gap-2 font-main' >
                                    <IoLocationOutline size={25} />
                                    <span>
                                        {address?.address}, {address?.ward}, {address?.district}, {address?.city}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2 font-main' >
                                    <CiUser size={25} />
                                    <span>
                                        {address?.customerName}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2 font-main' >
                                    <CiPhone size={25} />
                                    <span>
                                        {address?.customerPhone}
                                    </span>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button onClick={(e) => handleUpdateUserAddress(e, address)} className="bg-blue-500 text-white px-2 py-1 rounded">Chỉnh sửa</button>
                                    <button onClick={(e) => handleDeleteUserAddress(e, address.id)} className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
                                </div>
                            </div>
                        ))}
                    </>
                    }
                    <span onClick={() => {setShowDialogAddress(!showDialogAddress); reset()}} className='flex gap-2 items-center justify-center py-5 text-red-500 font-main text-base cursor-pointer'> <FaPlus />  Thêm địa chỉ mới</span>
                </div>
                <DialogCreateAddress visible={showDialogAddress} setVisible={setShowDialogAddress} userAddress={userAddress}
                    handleFormSubmit={handleFormSubmit} current={current} register={register} handleSubmit={handleSubmit} errors={errors} reset={reset} watch={watch}
                    control={control} typeSubmit={typeSubmit} setTypeSubmit={setTypeSubmit} />
            </div>

        </div>
    )
}

export default DeliveryAddress