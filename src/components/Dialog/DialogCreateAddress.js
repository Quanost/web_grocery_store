import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { InputFloatLabel } from '../../components';
import { address } from '../../ultils/dataAddress';


const DialogCreateAddress = ({ visible, setVisible, userAddress, handleFormSubmit, current, register, handleSubmit, errors, reset, watch, control, typeSubmit, setTypeSubmit }) => {

    return (
        <div>
            <Dialog header={typeSubmit ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'} visible={visible} style={{ width: '35vw' }} modal onHide={() => { setVisible(false); reset(); setTypeSubmit(false) }}
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
                    <button type="submit" onClick={handleSubmit(handleFormSubmit)} className="font-main  text-white  bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl  dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Hoàn thành</button>
                </div>
            </Dialog>
        </div>
    )
}

export default DialogCreateAddress
