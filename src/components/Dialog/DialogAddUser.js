import React from 'react';
import { Dialog } from 'primereact/dialog';
import { LabelInput, InputForm, Button, Select } from '../../components'
import { useForm } from 'react-hook-form';
import { userRoles} from '../../ultils/contants';
import { apiAddUser } from '../../apis'
import { toast } from 'react-toastify';

const DialogAddUser = ({ visible, setVisible }) => {
    const { control, register, unregister, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    
    const handleAddUser = async (data) => {
        const {...rest} = data
        rest.password = "1234567"
        rest.avatar = "https://cdn.dribbble.com/users/574618/screenshots/1952857/media/7af7a78fc601705e36a9294cd448ea2f.jpg"
        rest.isVerified = true
        const response = await apiAddUser(rest)
        if(response?.status === 200){
            toast.success('Thêm người dùng thành công')
        }else {
            toast.error(response?.data?.error)
        }
       
    }
    return (
        <div className="card flex justify-center">
            <Dialog header="Thêm người dùng" visible={visible} style={{ width: '35vw' }} onHide={() => {setVisible(false);reset()}}
                pt={{
                    header: 'p-5 border-b border-gray-200 dark:border-neutral-700',
                }}>
                <section>
                    <div className='px-5'>
                        <LabelInput label="Họ" required />
                        <InputForm
                            id={'firstName'} register={register} errors={errors}
                            placehoder='Nhập họ người dùng'
                            validate={{
                                required: 'Họ người dùng không được trống',
                            }}
                        />
                    </div>
                    <div className='px-5 pt-5'>
                        <LabelInput label="Tên" required />
                        <InputForm
                            id={'lastName'} register={register} errors={errors}
                            placehoder='Nhập tên người dùng'
                            validate={{
                                required: 'Tên người dùng không được trống',
                            }}
                        />
                    </div>
                    <div className='px-5 pt-5'>
                        <LabelInput label="Email" required />
                        <InputForm
                            id={'email'} register={register} errors={errors}
                            placehoder='Nhập email người dùng'
                            validate={{
                                required: 'Email người dùng không được trống',
                            }}
                        />
                    </div>
                    <div className='px-5 pt-5'>
                        <LabelInput label="Số điện thoại" required />
                        <InputForm
                            id={'phone'} register={register} errors={errors}
                            placehoder='Nhập số điện thoại người dùng người dùng'
                            validate={{
                                required: 'Email người dùng không được trống',
                            }}
                        />
                    </div>
                    <div className=" mx-5 my-2 gap-3">
                        <label htmlFor="role">Vai trò</label>
                        <Select id={'role'} register={register} errors={errors} options={userRoles} defaultValue=''
                            validate={{

                            }} />
                    </div>
                    <div className='w-full px-5 py-5' onClick={handleSubmit(handleAddUser)}>
                        <Button childen='Thêm sản phẩm' fw type='submit' />
                    </div>
                </section>
            </Dialog>
        </div>
    )
}

export default DialogAddUser
