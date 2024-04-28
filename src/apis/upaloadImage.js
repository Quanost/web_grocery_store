import axios from "../axios";


export const apiUploadMutilImage = (image) => axios({
    url:'/upload/multi',
    method:'post',
    data:image,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})