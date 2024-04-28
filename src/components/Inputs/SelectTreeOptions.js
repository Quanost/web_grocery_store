import React, { useState, useEffect } from "react";
import { TreeSelect } from 'primereact/treeselect';


const data = [
    {

        label: 'Document',
        data: 'Events Folder',
        children: [
            {
                key: '0-0',
                label: 'Work',
                data: 'Work Folder',
                icon: 'pi pi-fw pi-cog',

            },
            {
                key: '0-1',
                label: 'Home',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',

            }
        ]
    },
    {

        label: 'Events',
        data: 'Events Folder',
        icon: 'pi pi-fw pi-calendar',
        children: [
            { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
            { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
            { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
        ]
    },
    {
        key: '2',
        label: 'Movies',
        data: 'Movies Folder',
        icon: 'pi pi-fw pi-star-fill',
        children: [
            {
                key: '2-0',
                icon: 'pi pi-fw pi-star-fill',
                label: 'Al Pacino',
                data: 'Pacino Movies',

            },
            {
                key: '2-1',
                label: 'Robert De Niro',
                icon: 'pi pi-fw pi-star-fill',
                data: 'De Niro Movies',
            }
        ]
    }
];


export default function SelectTreeOptions({ options }) {
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);

    useEffect(() => {
        setNodes(data);
    }, []);

    return (
        <div className="">
            <TreeSelect value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={nodes}
                filter
                className="flex justify-center w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary "
                placeholder="Chọn loại sản phẩm"

                pt={{
                    header: 'bg-gray-200 h-[3rem] flex justify-center items-center',
                    filterContainer: 'h-[2rem] ml-5 flex justify-center items-center',
                    filter: 'h-full pl-5 w-full justify-center items-center placeholder',
                    filterIcon: '-mt-2',
                    panel: 'bg-white border-[1.5px] border-stroke rounded-lg',
                    wrapper: 'bg-red-200 m-5 flex flex-col gap-5',
                    tree: 'bg-green-200 px-2',
                }}
            >

            </TreeSelect>
        </div>
    );
}