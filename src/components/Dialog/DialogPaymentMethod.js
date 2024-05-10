import React, {useEffect} from 'react';
import { Dialog } from 'primereact/dialog';
import icon from '../../ultils/icons';

const DialogPaymentMethod = ({ visible, setVisible, register, setValue }) => {
    const { CiCreditCard1 } = icon;

    const handleCloseDialog = (e) => {
        setValue('paymentType', e.target.value); 
        setVisible(false); 
    };

    return (
        <div>
            <Dialog header="Đổi hình thức thanh toán" visible={visible} style={{ width: '35vw' }} onHide={() => setVisible(false)}
                pt={{
                    header: 'p-5 border-b border-gray-200 dark:border-neutral-700',
                }}>
                <section className="flex justify-center flex-col items-center my-5">
                    <div className="grid space-y-2">
                        <label htmlFor="CASH" className="w-125 flex items-center p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm focus-within:border-red-500 focus-within:ring-red-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <input {...register('paymentType')} onChange={handleCloseDialog} value="CASH" type="radio" id="CASH" name="payment" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-red-600 checked:bg-red-500 checked:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-red-500 dark:checked:border-red-500 dark:focus:ring-offset-gray-800" />
                            <div className="flex gap-2 w-full items-center">
                                <CiCreditCard1 size={30} className='ml-5' />
                                <span className='font-main text-lg'>Tiền mặt khi nhận hàng</span>
                            </div>
                        </label>
                        <label htmlFor="VNPAY" className="w-125 flex items-center p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm focus-within:border-red-500 focus-within:ring-red-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <input {...register('paymentType')} onChange={handleCloseDialog} value="VNPAY" type="radio" id="VNPAY" name="payment" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-red-600 checked:bg-red-500 checked:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-red-500 dark:checked:border-red-500 dark:focus:ring-offset-gray-800" />
                            <div className="flex gap-2 w-full items-center">
                                <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fb/df/27/fbdf2726-43a1-9fe0-4af5-9f7992626155/AppIcon-0-0-1x_U007emarketing-0-10-0-0-85-220.png/1200x600wa.png" alt="VNPAY" className='w-10 h-10 ml-4 object-cover bg-gray-100' />
                                <span className='font-main text-lg'>VNPAY</span>
                            </div>
                        </label>
                    </div>
                </section>
            </Dialog>
        </div>
    )
};

export default DialogPaymentMethod;