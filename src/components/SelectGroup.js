import React, { useState } from 'react';
import { formatterMonney } from '../ultils/helper'

const SelectGroup = ({ variant }) => {
    const [selectedVariant, setSelectedVariant] = useState(null);

    const handleVariantChange = (event) => {
        setSelectedVariant(event.target.value);
    };

    console.log('vảia', selectedVariant)
    return (
        <div>
            <div class="flex items-center justify-center bg-slate-200 border border-solid rounded-sm">
                <div class="mx-auto py-3 pl-1">
                    <div class="flex flex-wrap gap-3">
                        {variant?.map((variant) => (
                            <label class="cursor-pointer">
                                <input type="radio" class="peer sr-only" name="pricing" value="option 1" onChange={handleVariantChange} />
                                <div class="w-auto max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                    <div class="flex flex-col gap-1">
                                        <div className='flex justify-end -pr-2'>
                                            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <p class="text-lg font-bold  text-gray-500">{variant.unitPack}</p>
                                        </div>
                                        <div class="flex items-end justify-between gap-2">
                                            <p><span class="text-sm font-bold  text-red-500">{formatterMonney.format(variant.discountPrice)}</span></p>
                                            {variant.discountPrice < variant.regularPrice && (
                                                <p><del class="text-sm text-gray-400">{formatterMonney.format(variant.regularPrice)}</del></p>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </label>
                        ))}
                        <label class="cursor-pointer">
                                <input type="radio" class="peer sr-only" name="pricing" value="option 1" onChange={handleVariantChange} />
                                <div class="w-auto max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                    <div class="flex flex-col gap-1">
                                        <div className='flex justify-end -pr-2'>
                                            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <p class="text-lg font-bold  text-gray-500">Lon 300ml</p>
                                        </div>
                                        <div class="flex items-end justify-between">
                                            <p><span class="text-sm font-bold  text-red-500">{formatterMonney.format(70000)}</span></p>
                                           
                                                <p><del class="text-sm text-gray-400">{formatterMonney.format(72000)}</del></p>
                                        </div>
                                    </div>
                                </div>
                            </label>
                    </div>
                </div>
            </div>

        </div>



    )
}

export default SelectGroup
