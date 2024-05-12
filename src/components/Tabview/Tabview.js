import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { TableDataOrder } from '../../components'
import icon from '../../ultils/icons'
import path from '../../ultils/path';

const Tabview = ({ dataTable, errorGetAPI, navigate }) => {
    const { FaRegEye, MdOutlineVerified, MdCancelPresentation, CiDeliveryTruck } = icon
    const handleClickOrderDetail = (e, orderId) => {
        e.preventDefault()
        navigate(`/${path.ADMIN}/${path.ORDER_DETAIL}/${orderId}`)
    }
    const datatableFilter = {
        All: dataTable,
        PENDING: dataTable.filter(item => item.status === 'PENDING'),
        PROCESSING: dataTable.filter(item => item.status === 'PROCESSING'),
        SHIPPED: dataTable.filter(item => item.status === 'SHIPPED'),
        CANCELLED: dataTable.filter(item => item.status === 'CANCELLED'),
        SUCCESS: dataTable.filter(item => item.status === 'SUCCESS'),
    }
    const actions = {
        All: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: handleClickOrderDetail }
        ],
        PENDING: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: handleClickOrderDetail },
            { icons: <MdOutlineVerified size={22} />, action: 'Xác nhận', handleClick: handleClickOrderDetail },
            { icons: <MdCancelPresentation size={22} />, action: 'Huỷ đơn hàng', handleClick: handleClickOrderDetail }
        ],
        PROCESSING: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: handleClickOrderDetail },
            { icons: <CiDeliveryTruck size={22} />, action: 'Giao hàng', handleClick: handleClickOrderDetail },
            { icons: <MdCancelPresentation size={22} />, action: 'Huỷ đơn hàng', handleClick: handleClickOrderDetail }
        ],
        SHIPPED: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: handleClickOrderDetail },
            { icons: <CiDeliveryTruck size={22} />, action: 'Hoàn thành đơn hàng', handleClick: handleClickOrderDetail },
        ],
        CANCELLED: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: handleClickOrderDetail }
        ],
        SUCCESS: [
            { icons: <FaRegEye size={22} />, action: 'Xem chi tiết', handleClick: handleClickOrderDetail }
        ],
    }

    const tab = [
        { header: 'Tất cả', content: <TableDataOrder actions={actions.All} dataTable={datatableFilter.All}  /> },
        { header: 'Chờ xác nhận', content: <TableDataOrder actions={actions.PENDING} dataTable={datatableFilter.PENDING}/> },
        { header: 'Chuẩn bị hàng', content: <TableDataOrder actions={actions.PROCESSING} dataTable={datatableFilter.PROCESSING} /> },
        { header: 'Xác nhận giao hàng', content: <TableDataOrder actions={actions.SHIPPED} dataTable={datatableFilter.SHIPPED} /> },
        { header: 'Hoàn thành đơn hàng', content: <TableDataOrder actions={actions.SUCCESS}  dataTable={datatableFilter.SUCCESS}/> },
        { header: 'Đã huỷ', content: <TableDataOrder actions={actions.CANCELLED} dataTable={datatableFilter.CANCELLED}/> },
    ]
    return (
        <div className="dark:border-strokedark dark:bg-boxdark">
            <TabView
                pt={{
                    navContent: 'flex gap-1 relative dark:border-strokedark dark:bg-boxdark',
                    nav: 'flex justify-center gap-5 bord dark:border-strokedark dark:bg-boxdark dark:text-black',
                    tabContent: 'relative p-4 ',
                    inkbar: 'bg-green-500 w-full h-2 absolute field bottom-0 left-0 right-0 ',
                }}
            >
                {tab.map((item, index) => (
                    <TabPanel key={index} header={item.header} pt={{
                        content: 'p-5 relative dark:border-strokedark dark:bg-boxdark',
                        headerAction: 'bg-green-200 px-5 py-4 relative',
                    }}>
                        {errorGetAPI ? <p className='text-red-500'>{errorGetAPI}</p> : item.content}
                       
                    </TabPanel>
                ))}
            </TabView>
        </div>
    )
}

export default Tabview