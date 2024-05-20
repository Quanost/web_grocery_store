
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Chip } from 'primereact/chip';
import { InputTable, InputTextAreaForm, Select } from '../index';
import { set, useForm } from 'react-hook-form';
import icon from '../../ultils/icons';
import { apiAddCategory } from '../../apis';
import { toast } from 'react-toastify';

export default function DialogForm({ optionsCategories, getAllCategories }) {
    const { IoMdAddCircleOutline } = icon
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        name: '',
        description: '',
        parentId: null,
        attributes: [],
        active: true
    });
    const [visible, setVisible] = useState(false);
    const [attributes, setAttributes] = useState(['Loại', 'Thương hiệu']);
    const [attribute, setAttribute] = useState('');

    const handleAddCategory = async(data) => {
        if(data.parentId === '') delete data.parentId;
        const addCategory = await apiAddCategory({...data, attributes: attributes, active: true});
        if(addCategory?.data) {
            setVisible(false);
            getAllCategories();
            reset();
            setAttributes(['Loại', 'Thương hiệu']);
            toast.success('Thêm loại sản phẩm thành công')
        }else{
            toast.error('Thêm loại sản phẩm thất bại')
        }
    }

    const handleAddattributes = (e) => {
        e.preventDefault();
        setAttributes(prevAttributes => [...prevAttributes, attribute])
        setAttribute('')
    }
    const handleRemoveAttribute = (attributeToRemove) => {
        setAttributes(prevAttributes => prevAttributes.filter(attribute => attribute !== attributeToRemove));
    }
    return (
        <div className="card flex justify-center">
            <Button label="Thêm loại sản phẩm" className="text-white bg-red-500 font-main flex items-center px-3" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => {setVisible(false);  setAttributes(['Loại', 'Thương hiệu'])}}
                content={({ hide }) => (
                    <div className="flex flex-col px-8 py-5 gap-4 w-[500px]" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <h1 className="text-2xl text-white">Thêm loại sản phẩm</h1>

                        <div>
                            <form onSubmit={handleSubmit(handleAddCategory)} className="flex flex-col gap-7">
                                <div className=" my-auto gap-1">
                                    <label htmlFor="parentId">Nhóm sản phẩm</label>
                                    <Select id={'parentId'} register={register} errors={errors} options={optionsCategories} defaultValue=''
                                        validate={{

                                        }} />
                                </div>
                                <div className="my-auto gap-1">
                                    <label htmlFor="name">Tên loại sản phẩm</label>
                                    <InputTable
                                        id="name"
                                        register={register}
                                        errors={errors}
                                        validate={{ required: 'Tên không được để trống' }}
                                    />
                                </div>
                                <div className="gap-1">
                                    <label htmlFor="description">Mô tả</label>
                                    <InputTextAreaForm
                                        id="description"
                                        register={register}
                                        errors={errors}
                                        type="textarea"
                                        validate={{ required: 'Mô tả không được để trống' }}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="attribute">Thuộc tính</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {attributes.map((attribute, index) => (
                                            index < 2 ?
                                                <Chip label={attribute} className="bg-cyan-500 text-white min-w-0 truncate flex items-center justify-center w-auto px-2" /> :
                                                <Chip label={attribute} className="bg-cyan-500 text-white min-w-0 truncate flex items-center justify-center w-auto px-2" 
                                                removable onRemove={() => handleRemoveAttribute(attribute)}/>
                                        ))}
                                      
                                    </div>
                                    <div className="flex text-base border-2 border-indigo-500/100 rounded-sm  h-[50px]">
                                        <input id='attribute' value={attribute} type="text" onChange={(e) => setAttribute(e.target.value)} placeholder="Thêm thuộc tính" className="w-full h-full pl-2 font-main dark:bg-strokedark dark:text-white" />
                                        <IoMdAddCircleOutline size={50} color="blue" className="bg-white h-full" onClick={(e) => handleAddattributes(e)} />
                                    </div>


                                </div>
                                <div className="flex justify-between items-center gap-2 mt-2">
                                    <Button label="Huỷ" onClick={(e) => hide(e)} text className="p-3 w-full text-white border-2 border-white hover:bg-cyan-500"></Button>
                                    <Button label="Lưu" type="submit" className="p-3 w-full text-white border-2 border-white hover:bg-cyan-500"></Button>
                                </div>
                            </form>


                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
