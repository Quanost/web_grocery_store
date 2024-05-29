import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';


const data = [

    {
        key: '1',
        data: {
            name: 'Cloud',
            size: '20kb'
        },
        children: [
            {
                key: '5',
                data: {
                    name: 'backup-1.zip',
                    size: '10kb',
                }
            },
            {
                key: '6',
                data: {
                    name: 'backup-2.zip',
                    size: '10kb',
                }
            }
        ]
    },
    {
        key: '2',
        data: {
            name: 'Desktop',
            size: '150kb',
        },
        children: [
            {
                key: '2-0',
                data: {
                    name: 'note-meeting.txt',
                    size: '50kb',
                  
                }
            },
            {
                key: '2-1',
                data: {
                    name: 'note-todo.txt',
                    size: '100kb',

                }
            }
        ]
    },

]
const transformData = (data) => {
    const transformed = [];
    let keyCounter = 1;
    
    Object.keys(data).forEach(category => {
        if (category === 'root') return;
        const categoryData = data[category];
        const totalInventory = categoryData.reduce((total, item) => total + item.inventory, 0);
        const children = categoryData.map((item, index) => ({
            key: `${keyCounter}-${index}`,
            data: {
                name: item.categoryName,
                size: item.inventory
            }
        }));
        
        transformed.push({
            key: `${keyCounter++}`,
            data: {
                name: category,
                size: totalInventory
            },
            children: children
        });
    });

    return transformed;
};
export default function TreeTableData({ dataTable = [] }) {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        const transformedData = transformData(dataTable);
        setNodes(transformedData);
    }, [dataTable]);

    return (
        <div className="border-2 mt-20 rounded-lg p-5">

            <TreeTable value={nodes} tableStyle={{ minWidth: '20rem' }}>
                <Column field="name" header="Tên danh mục" expander></Column>
                <Column field="size" header="Số sản phẩm tồn kho"></Column>
            </TreeTable>
        </div>
    );
}


