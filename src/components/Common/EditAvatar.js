import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Avatar from 'react-avatar-edit'

const EditAvatar = ({avartardefault, handleUpLoadImage, size ='65px'}) => {
    const [imageCrop, setImageCrop] = useState(false);
    const [src, setSrc] = useState(null); 
    const [profile, setProfile] = useState([]);
    const [pview, setPview] = useState(false);

    const onClose = () => {
        setPview(null)
    }
    const onCrop = (view) => {
        setPview(view)
    }
    const saveCropImage = () => {
        setProfile({ pview });
        setImageCrop(false);
        handleUpLoadImage(pview);
    }
    return (
        <div className='flex flex-col justify-center items-center cursor-pointer'>
            <img
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid green'
                }}

                onClick={() => setImageCrop(true)}
                src={profile.pview ? profile.pview : avartardefault} 
                alt='avatar'
            />
           
            <Dialog
                className='bg-white border px-5 py-5'
                visible={imageCrop}
                header={() => (
                    <p htmlFor="" className='text 2xl font-semibold font-main'>Cập nhật Avartar</p>
                )}
                onHide={() => setImageCrop(false)}>
                <div className='flex flex-col items-center mt-5'>
                    <Avatar
                        width={390}
                        height={295}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={src}
                        shadingColor={"#474649"}
                        backgroundColor={"#474649"}
                    />
                    <div className='flex flex-col items-center mt-5 w-12'>
                        <div className='flex justify-center w-20 h-10 mt-3 bg-blue-600 text-white'>
                            <Button
                                type='button'
                                onClick={saveCropImage}
                                label='Lưu'
                                icon="pi pi-check"
                            />
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    )
}
export default EditAvatar;