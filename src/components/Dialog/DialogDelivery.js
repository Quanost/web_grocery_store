import React, {useEffect} from 'react';
import { Dialog } from 'primereact/dialog';
import { CartItems, InputNumber, LabelInput, InputTextAreaForm, SelectSeachOptions, InputForm } from '../../components';
import { set, useForm } from 'react-hook-form';
import { formatterMonney, validateVietnamesePhoneNumber } from '../../ultils/helper';
import { noteDelivery, addressStore } from '../../ultils/contants';
import { dataCreateDelivery } from '../../ultils/dataStructureDeliveryOrders'
import { useSelector } from 'react-redux';
import { apiCreateDelivery, apiUpdateOrderStatus } from '../../apis'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useSocket from '../../hooks/useSocket';

const DialogDelivery = ({  visible, setVisible, order , getOrders }) => {
    const { control, register, unregister, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
        defaultValues: dataCreateDelivery
    });
    const { current } = useSelector(state => state.user)
    const { sendMessage } = useSocket(getOrders);

    const handleCloseDialog = () => {
        setVisible(false);
        reset();
    }
    useEffect(() => {
        setValue('payment_type_id', order?.paymentDetail?.status === 'SUCCESS' ? 1 : 2);
        setValue('cod_amount', order?.paymentDetail?.status === 'SUCCESS' ? 0 : order?.total);
    }, [order?.paymentDetail?.status, setValue]);

    const updateOrderStatus = async (order_code) => {
        const response = await apiUpdateOrderStatus({ orderId: order?.id, status: 'WAITING_PICKUP', deliveryId: order_code});
        if (response?.status === 200) {
            // getOrders();
            sendMessage('Trạng thái đơn hàng đã cập nhật', '');
            toast.success('Cập nhật trạng thái thành công');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Cập nhật trạng thái thất bại',
            });
        }
    }
    const handleCreateDelivery = async (data) => {
        const validatePhone = validateVietnamesePhoneNumber(order?.address?.customerPhone);
        let modifiedData = { ...data };
        modifiedData.required_note = data?.required_note?.code;
        modifiedData.from_name = current?.firstName + " " + current?.lastName || 'Nguyễn Quân';
        modifiedData.from_phone = current?.phone || '0372267891';
        modifiedData.to_name = order?.address?.customerName || 'Người nhận hàng';
        modifiedData.to_phone = validatePhone ? order?.address?.customerPhone : '0987654321';
        modifiedData.to_address = [order?.address?.address, order?.address?.ward, order?.address?.district, order?.address?.city].join(", ") || '72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam'; //note

        modifiedData.items = order?.orderItem.map(item => ({
            name: item.product?.name,
            code: item.product?.id,
            quantity: item.quantity,
            price: item.price
        }));
        const response = await apiCreateDelivery(modifiedData)
        if (response?.data?.code === 200) {
            await updateOrderStatus(response?.data?.data?.order_code);
            setVisible(false);
            reset();
            toast.success('Tạo đơn giao hàng thành công')
        } else {
            toast.error('Tạo đơn giao hàng thất bại')
        }

    }
    console.log('order', order?.paymentDetail?.status)
    console.log('người trả tiền', watch('payment_type_id'))
    return (
        <div>
            <Dialog header="Tạo đơn giao hàng" visible={visible} style={{ width: '50vw' }} onHide={handleCloseDialog}
                pt={{
                    header: 'p-5 border-b border-gray-200 dark:border-neutral-700',
                }}>
                <section>
                    <div className='w-[90%] flex gap-5 mx-auto py-5 px-5 bg-gray-200'>
                        <div className='w-[50%] flex flex-col gap-1 h-full'>
                            <label className='font-main text-xl font-medium'>Thông tin người gửi</label>
                            <div className='bg-white px-5 py-5 font-main text-md flex flex-col gap-1'>
                                <p className='font-main text-md text-black-2'>{current?.firstName + " " + current?.lastName || 'Nguyễn Quân'} </p>
                                <p>Địa chỉ: {addressStore}</p>
                                <p>Điện thoại: {current?.phone || '0372267891'} </p>
                            </div>
                        </div>
                        <div className='w-[50%] flex flex-col gap-1'>
                            <label className='font-main text-xl font-medium'>Thông tin người nhận</label>
                            <div className='bg-white px-5 py-5 font-main text-md flex flex-col gap-1 h-36'>
                                <p className='font-main text-md text-black-2'>{order?.address?.customerName}</p>
                                <p>Địa chỉ: {order?.address?.address}, {order?.address?.ward}, {order?.address?.district}, {order?.address?.city}</p>
                                <p>Điện thoại: {order?.address?.customerPhone}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col px-15 gap-2 py-10'>
                        <div className="border-b border-stroke py-2 px-1 dark:border-strokedark">
                            <h3 className="font-medium font-main text-lg text-black dark:text-white">
                                Sản phẩm
                            </h3>
                        </div>
                        <table className="w-[90%] mx-auto  text-md text-left rtl:text-right  dark:text-gray-400">
                            <thead className="text-xl font-main  ">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-base font-main font-normal">
                                        Sản phẩm
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-base font-main font-normal">
                                        Đơn giá
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-base font-main font-normal">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-base font-main font-normal">
                                        Số tiền
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-base font-main font-normal">

                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {order?.orderItem?.map((item) => (
                                    <CartItems key={item.id} item={item} defaultQuantity={item.quantity} checkout />
                                ))}

                            </tbody>
                        </table>
                        <div className='flex justify-end gap-5 w-full font-main text-lg text-black'>
                            <p className='font-main'>Tiền thu hộ:</p>
                            <span className='w-30'>{formatterMonney.format(watch('cod_amount'))}</span>
                        </div>
                        <div className='flex justify-end gap-5 w-full font-main text-lg text-black'>
                            <p className='font-main'>Phí vận chuyển:</p>
                            <span className='font-main'>{watch('payment_type_id') === 2 ? 'Người nhận trả': 'Người bán trả'}</span>
                        </div>
                    </div>
                    <div className='flex flex-col px-15 gap-2 py-3'>
                        <div className="border-b border-stroke px-1 dark:border-strokedark">
                            <h3 className="font-medium font-main text-lg text-black dark:text-white">
                                Thông tin gói hàng
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-2 group">
                                <LabelInput label="Trọng lượng đơn hàng (gram)" required />
                                <InputNumber control={control} name={`weight`} messageError='Trọng lượng không được trống' min={1} max={30000} />
                                {errors['weight'] && <span className='text-red-500'>{errors['weight']?.message}</span>}
                            </div>
                            <div className="relative z-0 w-full mb-2 group">
                                <LabelInput label="Chiều dài đơn hàng (cm)" required />
                                <InputNumber control={control} name={`length`} messageError='Chiều dài không được trống' min={1} max={150} />
                                {errors['length'] && <span className='text-red-500'>{errors['length']?.message}</span>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-2 group">
                                <LabelInput label="Chiều rộng đơn hàng (cm)" required />
                                <InputNumber control={control} name={`width`} messageError='Chiều rộng không được trống' min={1} max={150} />
                                {errors['width'] && <span className='text-red-500'>{errors['width']?.message}</span>}
                            </div>
                            <div className="relative z-0 w-full mb-2 group">
                                <LabelInput label="Chiều cao đơn hàng (cm)" required />
                                <InputNumber control={control} name={`height`} messageError='Chiều cao không được trống' min={1} max={150} />
                                {errors['height'] && <span className='text-red-500'>{errors['height']?.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col px-15 gap-2 py-3'>
                        <div className="border-b border-stroke px-1 dark:border-strokedark">
                            <h3 className="font-medium font-main text-lg text-black dark:text-white">
                                Lưu ý
                            </h3>
                        </div>
                        <div class=" grid grid-cols-3 grid-rows-2 gap-2">
                            <div className="col-span-1 my-auto">
                                <label htmlFor="required_note">Lưu ý khi giao hàng<span className='text-red-500 text-md'>*</span></label>
                                <SelectSeachOptions
                                    name="required_note"
                                    control={control}
                                    placeholder=""
                                    options={noteDelivery}
                                    messageError="Lưu ý không được trống"
                                />
                                {errors['required_note'] && <span className='text-red-500'>{errors['required_note']?.message}</span>}
                            </div>
                            <div className="col-span-2 row-span-2 my-auto">
                                <label htmlFor="note">Ghi chú</label>
                                <InputTextAreaForm
                                    id="note"
                                    register={register}
                                    errors={errors}
                                    type="textarea"
                                    validate={{}}
                                />
                            </div>
                            <div className="col-span-1 my-auto">
                                <label htmlFor="coupon">Khuyến mãi</label>
                                <InputForm
                                    id={'couponId'} register={register} errors={errors}
                                    placehoder='Nhập mã khuyến mãi'

                                />
                            </div>

                        </div>

                    </div>
                    <div className='flex justify-end pr-12 pt-5'>
                        <button type="submit" onClick={handleSubmit(handleCreateDelivery)} className="w-60 font-main text-lg text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2">
                            Tạo đơn giao hàng
                        </button>
                    </div>
                </section>
            </Dialog>
        </div>
    )
}

export default DialogDelivery
