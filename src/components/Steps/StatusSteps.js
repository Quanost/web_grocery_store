import React, { useState, useEffect } from 'react';
import { orderStatus } from '../../ultils/contants';
import { Steps } from 'primereact/steps';
import icon from '../../ultils/icons';

const StatusSteps = ({status}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { CiDeliveryTruck,MdEventNote, MdEventAvailable, TbTruckOff, LuBookDown, FaRegStar } = icon;

  useEffect(() => {
    setActiveIndex(orderStatus.findIndex(el => el.value === status))
  }, [status])
  const itemRenderer = (item, itemIndex) => {
    const isActiveItem = activeIndex === itemIndex;
    const backgroundColor = isActiveItem ? 'bg-green-300  border-2 border-green-600 shadow-6' : 'bg-green-100';
    const textColor = isActiveItem ? 'text-green-600' : 'text-green-300';

    return (
      <div className='flex flex-col justify-center items-center gap-3'>
        <span
          className={` ${backgroundColor} inline-flex justify-center items-center   h-[4rem] w-[4rem] rounded-full  z-1 cursor-pointer`}
        >
          <div className={`${!isActiveItem ? 'text-green-300':' text-green-700'}`}>
            { item.icon }
          </div>

        </span>
        <label className={`${textColor} flex items-center justify-center font-main font-bold text-md`}>{item.label}</label>
      </div>
    );
  };
  const items = [
    {
      icon: <MdEventNote size={30} />,
      label: 'Chờ xác nhận',
      template: (item) => itemRenderer(item, 0)
    },
    {
      icon: <MdEventAvailable size={30} />,
      label: 'Đã xác nhận',
      template: (item) => itemRenderer(item, 1)
    },
    {
      icon: <CiDeliveryTruck size={30} />,
      label: 'Đang giao hàng',
      template: (item) => itemRenderer(item, 2)
    },
    {
      icon: <LuBookDown size={30} />,
      label: 'Đã nhận hàng',
      template: (item) => itemRenderer(item, 3)
    },
    {
      icon: <FaRegStar size={30} />,
      label: 'Hoàn thành đơn hàng',
      template: (item) => itemRenderer(item, 3)
    },
    // {
    //   icon: <TbTruckOff size={30} />,
    //   label: 'Huỷ giao hàng',
    //   template: (item) => itemRenderer(item, 4)
    // }
  ];
  return (
    <div className="card">
     
      <Steps
        model={items}
        activeIndex={activeIndex}
        readOnly={false}
        className="m-2 pt-4"
        pt={{
          root: 'relative',
          menuitem: 'relative flex justify-center flex-1 overflow-hidden before:border-t before:border-gray-300 before:dark:border-blue-900/40 before:w-full before:absolute before:top-1/2 before:left-0 before:transform before:-translate-y-1/2',
          action: 'inline-flex flex-col items-center overflow-hidden transition-shadow rounded-md bg-white dark:bg-transparent focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
          step: 'flex items-center justify-center text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40 bg-red-200 dark:bg-gray-900 w-[3rem] h-[3rem] leading-3rem text-sm z-10 rounded-full',
          label: 'block whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full mt-2 text-red-300 dark:text-white/60',

        }}
      />
    </div>
  )
}

export default StatusSteps
