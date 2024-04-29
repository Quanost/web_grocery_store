import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'primereact/image';
import icon from '../../ultils/icons'
import { set } from 'react-hook-form';

const ChooseOneImage = ({id, register, setValue, resetImages, initialImage}) => {
    const { FiDelete } = icon
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef();

    function onFileSelects(event) {
        const files = event.target.files;
        if (files.length == 0) return;
        if (files[0].type.split('/')[0] !== 'image') return;
        setImages([
            {
                name: files[0].name,
                url: URL.createObjectURL(files[0])
            },
        ]);
        setValue(id, files[0])
    }
    function deleteImage(index) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setValue(id, null)
    }
    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = 'copy';
    }
    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }
    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files.length == 0) return;
        if (files[0].type.split('/')[0] !== 'image') return;
        setImages([
            {
                name: files[0].name,
                url: URL.createObjectURL(files[0])
            },
        ]);
    }

    useEffect(() => {
        setImages([]);
    }, [resetImages]);

    useEffect(() => {
        if (initialImage) {
            setImages([{
                name: '', 
                url: initialImage
            }]);
        }
    }, [initialImage]);

    return (
        <div className='p-[10px] shadow-sm rounded-md '>
            <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                <div class="flex items-center justify-center w-full">
                    <label for={id} class="flex flex-col items-center justify-center w-full h-35 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Thêm hình ảnh đại diện </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or JPEG </p>
                        </div>
                        <input id={id} name={id} type="file" className="hidden " {...register(id, {required: 'Chưa có ảnh được chọn'})} onChange={onFileSelects} ref={fileInputRef}  accept=".svg, .png, .jpg, .jpeg" />
                    </label>
                </div>
            </div>
            <div className='w-full h-auto flex justify-center items-center flex-wrap  overflow-y-auto mt-[10px]'>
                {images.map((images, index) => (
                    <div className='w-auto mr-[5px] h-auto relative mb-[8px]' key={index}>
                        <Image src={images.url}
                            zoomSrc={images.url}
                            alt={images.name} width="80" height="60" preview
                            pt={{
                                rotateRightButton: 'bg-red-500',
                                rotateLeftButton: 'bg-red-500',
                                zoomOutButton: 'bg-red-500',
                                zoomInButton: 'bg-red-500',
                                closeButton: 'bg-red-500',
                                icon: 'text-red-500',
                                image: 'w-[100px] h-[100px] object-cover',

                            }} />
                        <FiDelete size={25} className='absolute top-0 right-0 text-red-500 cursor-pointer' onClick={() => deleteImage(index)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChooseOneImage