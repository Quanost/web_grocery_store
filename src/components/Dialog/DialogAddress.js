import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import icon from '../../ultils/icons';
import { InputFloatLabel } from '../../components';
import { set, useForm } from 'react-hook-form';
import { address } from '../../ultils/dataAddress';
import { apiAddUserAddress, apiUpdateUserAddress, apiDeleteUserAddress } from '../../apis'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCurrent } from '../../store/user/asynActionUser'


const DialogAddress = ({ visible, setVisible, userAddress, current, setValueAddress }) => {
    const { FaPlus } = icon;
    const { control, register, unregister, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            customerName: userAddress?.length > 0 ? '' : current?.firstName + " " + current?.lastName,
            customerPhone: userAddress?.length > 0 ? '' : current?.phone
        }
    });
    const [showCreateAddress, setShowCreateAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(userAddress?.[0]);
    const [typeSubmit, setTypeSubmit] = useState(false); // false: add, true: update
    const dispatch = useDispatch();

    const footerMyAddress = (
        <div className="border-t py-2">
            <button onClick={() => setVisible(false)} autoFocus type="button" className="font-main text-red-500 hover:text-red-500 border border-red-700 hover:bg-red-50  font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Huỷ</button>
            <button onClick={(e) => handleChooseAddress(e)} type="button" className="font-main  text-white  bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl  dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Xác nhận</button>
        </div>
    );
    const handleChooseAddress = (e) => {
        e.preventDefault();
        setVisible(false);
        setShowCreateAddress(false);
        setValueAddress('address', selectedAddress);
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
                    setShowCreateAddress(!showCreateAddress);
                    dispatch(getUserCurrent(current?.id))
                    toast.success('Cập nhật địa chỉ thành công')
                } else {
                    toast.error('Cập nhật địa chỉ thất bại')
                }
            } else {
                const response = await apiAddUserAddress(modifiedData);
                if (response?.status === 200) {
                    setShowCreateAddress(!showCreateAddress);
                    dispatch(getUserCurrent(current?.id))
                    toast.success('Thêm địa chỉ thành công')
                } else {
                    toast.error('Thêm địa chỉ thất bại')
                }
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const handleUpdateUserAddress = async (e, data) => {
        e.preventDefault();
        setTypeSubmit(true);
        setShowCreateAddress(!showCreateAddress);
        setValue('customerName', data?.customerName);
        setValue('customerPhone', data?.customerPhone);
        setValue('city', { name: data?.city, code: address?.data?.provinceList?.find(item => item.name === data?.city)?.id });
        setValue('district', { name: data?.district, code: address?.data?.provinceList?.find(city => city.id === (watch('city')?.code))?.districtBOList.find(item => item.name === data?.district)?.id });
        setValue('ward', { name: data?.ward, code: address?.data?.provinceList?.flatMap(city => city?.districtBOList).find(district => district?.id === watch('district')?.code).wards?.find(item => item.name === data?.ward)?.id });
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
   
    return (
        <div>
            {!showCreateAddress ?
                <Dialog header="Địa chỉ của tôi" visible={visible} style={{ width: '35vw' }} onHide={() => setVisible(false)} footer={footerMyAddress}
                    pt={{
                        header: 'p-5 border-b border-gray-200 dark:border-neutral-700',
                    }}>
                    <section className="flex justify-center flex-col items-center my-5">
                        <div className="grid space-y-2">
                            {userAddress.length === 0 ? (
                                <div className="font-main text-xl">Chưa có địa chỉ nhận hàng</div>
                            ) :
                                (
                                    <>
                                        {userAddress?.map((item, index) => (
                                            <label key={item.id} htmlFor={item.id} className="w-125 flex items-center p-3 bg-white border border-gray-200 rounded-lg text-sm focus-within:border-red-500 focus-within:ring-red-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                                                <input type="radio" id={item.id} name="address" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-red-600 checked:bg-red-500 checked:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-red-500 dark:checked:border-red-500 dark:focus:ring-offset-gray-800" checked={item.id === selectedAddress?.id} onChange={() => setSelectedAddress(item)} />

                                                <div className="flex justify-between w-full">
                                                    <div className="flex flex-col gap-1 text-gray-400 ms-3 dark:text-neutral-400">
                                                        <span className="font-main text-base text-black flex gap-3">{item.customerName}<p className="text-gray-400">|| {item.customerPhone}</p></span>
                                                        <span>{item.address}<br></br> {item.ward}, {item.district}, {item.city}</span>
                                                    </div>
                                                    <div className="flex gap-3 font-main text-base text-blue-600">
                                                        <label onClick={(e) => handleUpdateUserAddress(e, item)}>Sửa</label>
                                                        <label onClick={(e) => handleDeleteUserAddress(e, item.id)}>Xoá</label>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </>

                                )}
                        </div>
                        <span onClick={() => setShowCreateAddress(!showCreateAddress)} className='flex gap-2 items-center justify-center py-5 text-red-500 font-main text-base cursor-pointer'> <FaPlus />  Thêm địa chỉ mới</span>
                    </section>
                </Dialog> :
                <Dialog header={typeSubmit ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'} visible={visible} style={{ width: '35vw' }} modal onHide={() => { setVisible(false); setShowCreateAddress(false); reset(); setTypeSubmit(false) }}
                    pt={{
                        header: 'p-5 border-b border-gray-200 dark:border-neutral-700',
                    }}>
                    <section className="flex justify-center flex-col items-center my-5">
                        <div className="w-full px-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <InputFloatLabel id={'customerName'} register={register} errors={errors} defaultValue={userAddress?.length > 0 ? '' : current?.firstName + " " + current?.lastName}
                                        control={control} label='Họ và tên' required
                                        validate={{
                                            required: 'Vui lòng nhập họ và tên',
                                        }} />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <InputFloatLabel id={'customerPhone'} register={register} errors={errors} defaultValue={userAddress?.length > 0 ? '' : current?.phone}
                                        control={control} label='Số điện thoại' required
                                        validate={{
                                            required: 'Vui lòng nhập số điện thoại',
                                            pattern: {
                                                value: /^(0)[0-9]{9}$/,
                                                message: 'Số điện thoại không hợp lệ'
                                            }
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <InputFloatLabel id={'city'} register={register} errors={errors} control={control} label='Chọn tỉnh thành phố' selectSeach messageError="Vui lòng chọn tỉnh thành phố"
                                        option={address.data?.provinceList?.map((item) => ({ name: item.name, code: item.id }))} />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <InputFloatLabel id={'district'} register={register} errors={errors} control={control} label='Chọn quận huyện' selectSeach messageError="Vui lòng chọn quận huyện"
                                        option={address.data?.provinceList.find(city => city.id === (watch('city')?.code))?.districtBOList.map((item) => ({ name: item.name, code: item.id }))}
                                        disabled={!watch('city')} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-5 flex flex-wrap">
                            <div className="w-full px-3">
                                <div className="mb-5">
                                    <InputFloatLabel id={'ward'} register={register} errors={errors} control={control} label='Chọn phường xã' selectSeach messageError="Vui lòng chọn phường xã"
                                        option={address.data?.provinceList.flatMap(city => city.districtBOList).find(district => district.id === watch('district')?.code)?.wards?.map((item) => ({ name: item.name, code: item.id }))}
                                        disabled={!watch('district')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-5 flex flex-wrap">
                            <div className="w-full px-3">
                                <div className="mb-5">
                                    <InputFloatLabel id={'address'} register={register} errors={errors} control={control} label='Số nhà, tên đường' required disabled={!watch('ward')}
                                        validate={{
                                            required: 'Vui lòng nhập Số nhà, tên đường',
                                        }} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="border-t py-5 flex justify-end items-center">
                        <button onClick={() => (setShowCreateAddress(!showCreateAddress), reset(), setTypeSubmit(false))} autoFocus type="button" className="font-main text-red-500 hover:text-red-500 border border-red-700 hover:bg-red-50  font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Trở lại</button>
                        <button type="submit" onClick={handleSubmit(handleFormSubmit)} className="font-main  text-white  bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl  dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Hoàn thành</button>
                    </div>
                </Dialog>
            }
        </div >
    )
}

export default DialogAddress