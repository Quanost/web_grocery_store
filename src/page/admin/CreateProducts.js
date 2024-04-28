import { useState, useEffect } from 'react'
import { SelectSeachOptions, ChooseMutilImage, ChooseOneImage, LabelInput, Button, InputForm, InputTextAreaForm, SelectEditOptions, InputNumber } from '../../components'
import icon from '../../ultils/icons';
import { apiUploadMutilImage, apiUploadSingleImage, apiCreateProduct } from '../../apis'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, useFieldArray, set } from 'react-hook-form';
import { getCategories } from '../../store/app/asyncAction';
import { getAttributeProductType } from '../../store/attribute/asynActionAttribute';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const CreateProducts = () => {
  const { IoAddCircleOutline, FiDelete, MdOutlineDelete } = icon
  const { control, register, unregister, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      attributes: [
        { name: 'Loại sản phẩm', value: '', disabled: true },
        { name: 'Thương hiệu', value: '', disabled: true }]
    }
  });
  const dispatch = useDispatch();
  const [showVariants, setShowVariants] = useState(false);
  const [variants, setVariants] = useState([{ id: 1 }]);
  const [images, setImages] = useState([]);
  const [resetImages, setResetImages] = useState(false);


  const { categories } = useSelector(state => state.appReducer);
  const { attributes } = useSelector(state => state.attributes);

  const parentValue = watch('parentcategory');
  const categoryValue = watch('categories');
  const variantsWatched = watch('variants');

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes"
  });
  const { remove: removeVar } = useFieldArray({
    control,
    name: "variants"
  });

  const handleImages = (images) => {
    setImages(images);
  }
  const handleShowAddVariant = () => {
    setShowVariants(!showVariants)
    unregister('regularPrice');
    unregister('quantity');
    unregister('unitPack');
  }
  const handleAddVariant = () => {
    const newVariantId = variants.length + 1;
    setVariants([...variants, { id: newVariantId }]);
  };

  const handleDeleteVariant = (id, index) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };
  useEffect(() => {
    if (variants.length === 0) {
      setShowVariants(false);
      setVariants([{ id: 1 }]);
    }
  }, [variants.length]);

  useEffect(() => {
    if (!categories)
      dispatch(getCategories());
    if (!attributes)
      dispatch(getAttributeProductType());
  }, [dispatch]);


  //set default value for attributes when select category product
  useEffect(() => {
    if (categoryValue) {
      let selectedCategory;
      categories?.forEach(category => {
        category.sub.forEach(sub => {
          if (sub.id === categoryValue.code) {
            selectedCategory = sub;
          }
        });
      });
      if (selectedCategory && selectedCategory.attributes) {
        if (selectedCategory.attributes.length === 0) {
          setValue("attributes", [
            { name: 'Loại sản phẩm', value: '', disabled: true },
            { name: 'Thương hiệu', value: '', disabled: true }]
          );
        } else {
          const defaultAttributes = selectedCategory?.attributes.map(sub => ({
            name: sub,
            value: '',
            disabled: true
          }));
          setValue("attributes", defaultAttributes);
        }
      }
    }
  }, [categories, setValue, categoryValue]);

  const handleUploadImages = async (images) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const response = await fetch(image.url);
        const blob = await response.blob();
        const file = new File([blob], image.name);
        formData.append('images', file);
      }
      const reponse = await apiUploadMutilImage(formData);
      if (reponse?.status === 200) {
        toast.success('Thêm hình ảnh thành công');
        return reponse?.data;
      }
      else {
        toast.error('Thêm hình ảnh thất bại');
        return [];
      }
    } catch (error) {
      toast.error('Thêm hình ảnh thất bại', error);
    }
  }

  const handleUploadOneImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const reponse = await apiUploadSingleImage(formData);
      if (reponse?.status === 200) {
        toast.success('Thêm hình ảnh biến thể sản phẩm thành công');
        return reponse?.data;
      }
      else {
        toast.error('Thêm hình ảnh biến thể sản phẩm thất bại');
        return null;
      }
    } catch (error) {
      toast.error('Thêm hình ảnh thất bại', error);
    }
  }
  const handleFormSubmit = async (data) => {
    try {
      console.log('data', data);
      if (images.length > 0) {
        const imageurls = await handleUploadImages(images);
        if (imageurls)
          data.productGalleries = imageurls;
      } else {
        Swal.fire({
          title: 'Lỗi',
          text: 'Bạn chưa chọn hình ảnh sản phẩm',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }

      let modifiedData = { ...data };
      modifiedData.categories = [data?.categories?.code];
      modifiedData.hidden = false;
      if (modifiedData.attributes?.length > 0) {
        modifiedData.attributes = modifiedData.attributes.map(attribute => ({
          name: attribute.name,
          value: attribute.value.name
        }));
      }
      if (modifiedData.variants?.length > 0) {
        for (let i = 0; i < modifiedData.variants.length; i++) {
          modifiedData.variants[i].discountPrice = modifiedData.variants[i].regularPrice;
          const image = modifiedData.variants[i].thumbnail;
          if (!image) {
            toast.error('Chưa có hình ảnh cho biến thể sản phẩm');
            return;
          }
          const imageurl = await handleUploadOneImage(image);
          if (imageurl)
            modifiedData.variants[i].thumbnail = imageurl;
        }
        modifiedData.unitPack = modifiedData?.variants[0].unitPack;
        modifiedData.regularPrice = modifiedData?.variants.reduce((total, variant) => total + variant.regularPrice, 0);
        modifiedData.discountPrice = modifiedData?.variants.reduce((total, variant) => total + variant.regularPrice, 0);
        modifiedData.quantity = modifiedData?.variants.reduce((total, variant) => total + variant.quantity, 0);
      } else {
        modifiedData.discountPrice = data?.regularPrice;
      }

      const response = await apiCreateProduct(modifiedData);
      if (response?.data) {
        Swal.fire({
          title: 'Thành công',
          text: 'Tạo sản phẩm thành công',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setResetImages(prevReset => !prevReset);
        setVariants([{ id: 1 }]);
        reset()
      } else if (response?.status === 409) {
        Swal.fire({
          title: 'Thất bại',
          text: 'Tên sản phẩm đã tồn tại',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Thất bại',
          text: 'Thêm sản phẩm thất bại',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      toast.error('Thêm sản phẩm thất bại', error);
    }
  }


  console.log('images', images);

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleFormSubmit)} className='grid grid-cols-1 gap-9 sm:grid-cols-2 dark:bg-boxdark'>
        <div className="flex flex-col gap-9">
          {/* <!-- Input Trái --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium font-main text-2xl text-black dark:text-white">
                Thông tin cơ bản
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <LabelInput label="Hình ảnh sản phẩm" required />
              <ChooseMutilImage handleImages={handleImages} resetImages={resetImages} />
              <div>
                <LabelInput label="Tên sản phẩm" required />
                <InputForm
                  id={'name'} register={register} errors={errors}
                  placehoder='Nhập tên sản phẩm'
                  validate={{
                    required: 'Tên sản phẩm không được trống',
                    minLength: {
                      value: 10,
                      message: 'Tên sản phẩm phải có ít nhất 10 ký tự'
                    },
                    maxLength: {
                      value: 100,
                      message: 'Tên sản phẩm không được vượt quá 100 ký tự'
                    }
                  }}
                />
              </div>
              <div>
                <LabelInput label="Mô tả" required />
                <InputTextAreaForm
                  id={'description'}
                  register={register} errors={errors}
                  placeholder='Nhập mô tả sản phẩm'
                  rows={6}
                  validate={{
                    required: 'Mô tả sản phẩm không được trống',
                    minLength: {
                      value: 10,
                      message: 'Mô tả sản phẩm phải có ít nhất 10 ký tự'
                    },
                  }}
                />
              </div>

              <div>
                <LabelInput label="Danh mục sản phẩm" required />
                <SelectSeachOptions
                  name="parentcategory"
                  control={control}
                  placeholder="Chọn danh mục sản phẩm"
                  options={categories?.map(el => ({ name: el.name, code: el.id }))}
                  messageError="Danh mục sản phẩm không được trống"
                />
                {errors['parentcategory'] && <span className='text-red-500'>{errors['parentcategory']?.message}</span>}
              </div>
              {parentValue && (
                <div>
                  <LabelInput label="Loại sản phẩm" required />
                  <SelectSeachOptions
                    name="categories"
                    control={control}
                    placeholder="Chọn loại sản phẩm"
                    options={categories?.find(el => el.id === parentValue.code)?.sub.map(el => ({ name: el.name, code: el.id }))}
                    messageError="Loại sản phẩm không được trống"
                    parent={true}
                  />
                  {errors['categories'] && <span className='text-red-500 '>{errors['categories']?.message}</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Input phải --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium font-main text-2xl text-black dark:text-white">
                Thông tin chi tiết
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-base font-main text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Thuộc tính</th>
                      <th scope="col" className="px-6 py-3">Giá trị</th>
                      <th scope="col" className="px-6 py-3">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields?.map((field, index) => (
                      <tr key={field.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            placeholder="Nhập tên thuộc tính"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            {...register(`attributes.${index}.name`, {
                              required: 'Tên thuộc tính không được trống',
                              validate: value => {
                                const duplicate = fields.find((field, fieldIndex) => fieldIndex !== index && field.name === value);
                                return duplicate ? 'Tên thuộc tính không được trùng' : true;
                            }
                            })}
                            defaultValue={field.name}
                            disabled={field.disabled} // Không cho phép chỉnh sửa nếu disabled là true
                          />
                          {errors.attributes?.[index]?.name && <span className='text-red-500'>{errors.attributes?.[index]?.name?.message}</span>}
                        </td>

                        {field.name === 'Loại sản phẩm' || field.name === 'Thương hiệu' ? (
                          <td className="px-6 py-4">
                            <SelectEditOptions
                              control={control}
                              name={`attributes.${index}.value`}
                              placeholder="Nhập giá trị thuộc tính"
                              options={attributes?.attributes?.flatMap(attribute => {
                                return Object.entries(attribute.value).flatMap(([key, values]) => {
                                  if (key === categoryValue?.name) {
                                    return Object.entries(values).flatMap(([valueKey, valueValues]) => {
                                      if (valueKey.includes(field.name)) {
                                        return valueValues.map((val, index) => {
                                          return { name: val, code: index };
                                        });
                                      }
                                      return [];
                                    });
                                  }
                                  return [];
                                });
                              })}
                            />
                            {errors.attributes?.[index]?.value && <span className='text-red-500'>{errors.attributes?.[index]?.value?.message}</span>}
                          </td>
                        ) : (
                          <td className='px-6 py-4'>
                            <input
                              type="text"
                              placeholder="Nhập giá trị thuộc tính"
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              {...register(`attributes.${index}.value`, { required: 'Giá trị thuộc tính không được trống' })}
                              defaultValue={field.value}
                            />
                            {errors.attributes?.[index]?.value && <span className='text-red-500'>{errors.attributes?.[index]?.value?.message}</span>}
                          </td>
                        )}
                        <td className="px-6 py-4">
                          {!field.disabled &&
                            <button onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                              <MdOutlineDelete size={22} />
                            </button>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button onClick={() => append({ name: "", value: "" })} type="button" class="text-red-500 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 
              focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center
               dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                  <IoAddCircleOutline size={22} className='mx-2' />
                  Thêm thuộc tính
                </button>
              </div>
            </div>
          </div>


          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium font-main text-2xl text-black dark:text-white">
                Thông tin bán hàng
              </h3>
            </div>
            {showVariants ? (
              <div className="flex flex-col gap-5.5 p-6.5">
                {variants.map((variant, index) => (
                  <div key={variant.id}>
                    <LabelInput label={`Phân loại hàng hoá ${index + 1}`} />
                    <div className="bg-gray-200 px-5 rounded-md relative">
                      <div>
                        <ChooseOneImage id={`variants[${index}].thumbnail`} register={register} watch={watch} setValue={setValue} resetImages={resetImages} />
                        {errors.variants?.[index]?.thumbnail && <span className='text-red-500'>{errors.variants?.[index]?.thumbnail?.message}</span>}
                        <div className="relative z-0 w-full mb-5 group">
                          <LabelInput label="Đóng gói" required />
                          <input
                            type="text"
                            placeholder="Ví dụ: Thùng, hộp, chai, lọ..."
                            {...register(`variants[${index}].unitPack`, {
                               required: 'Đóng gói không được trống',
                               validate: value => {
                                const duplicateUnitPack = variantsWatched.find((variant, variantIndex) => variantIndex !== index && variant.unitPack === value);
                                return duplicateUnitPack ? 'Đóng gói không được trùng' : true;
                            }
                             })}
                            className="w-full bg-white rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {errors.variants?.[index]?.unitPack && <span className='text-red-500'>{errors.variants?.[index]?.unitPack?.message}</span>}
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-5 group">
                            <LabelInput label="Giá sản phẩm" required />
                            <InputNumber control={control} name={`variants.${index}.regularPrice`} messageError='Giá không được trống' min={1000} max={10000000} />
                            {errors.variants?.[index]?.regularPrice && <span className='text-red-500'>{errors.variants?.[index]?.regularPrice?.message}</span>}
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <LabelInput label="Số lượng sản phẩm" required />
                            <InputNumber control={control} name={`variants.${index}.quantity`} messageError='Số lượng không được trống' min={1} max={10000} />
                            {errors.variants?.[index]?.quantity && <span className='text-red-500'>{errors.variants?.[index]?.quantity?.message}</span>}
                          </div>
                        </div>
                      </div>
                      <FiDelete
                        size={30}
                        className="absolute right-0 top-0 text-gray-500 cursor-pointer"
                        onClick={() => { handleDeleteVariant(variant.id, index); removeVar(index) }}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddVariant}
                  type="button"
                  className="text-red-500 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                >
                  <IoAddCircleOutline size={22} className="mx-2" />
                  Thêm nhóm phân loại {variants.length + 1}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <LabelInput label="Phân loại hàng hoá" />
                  <button onClick={handleShowAddVariant} type="button" class="text-red-500 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                    <IoAddCircleOutline size={22} className='mx-2' />
                    Thêm nhóm phân loại
                  </button>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <LabelInput label="Đóng gói" required />
                  <input
                    type="text"
                    placeholder="Ví dụ: Thùng, hộp, chai, lọ..."
                    {...register(`unitPack`, { required: 'Đóng gói không được trống' })}
                    className="w-full bg-white rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors['unitPack'] && <span className='text-red-500 '>{errors['unitPack']?.message}</span>}
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-5 group">
                    <LabelInput label="Giá sản phẩm" required />
                    <InputNumber
                      control={control} name="regularPrice" messageError='Giá không được trống' min={1000} max={10000000} />
                    {errors['regularPrice'] && <span className='text-red-500 '>{errors['regularPrice']?.message}</span>}
                  </div>
                  <div class="relative z-0 w-full mb-5 group">
                    <LabelInput label="Số lượng sản phẩm" required />
                    <InputNumber name="quantity" control={control} messageError='Số lượng không được trống' min={1} max={10000} />
                    {errors['quantity'] && <span className='text-red-500 '>{errors['quantity']?.message}</span>}
                  </div>
                </div>
              </div>
            )}

          </div>
          <div className='w-full'>
            <Button childen='Thêm sản phẩm' fw type='submit' />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProducts
