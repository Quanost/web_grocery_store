import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import path from '../../ultils/path';
import { useSelector } from 'react-redux';
import { AdminSidebar, HeaderManager } from '../../components'



const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user);
  if (!isLoggedIn || !current || current?.role !== "MANAGER") return <Navigate to={`/${path.LOGIN}`} replace={true} />

  return (
    <div className='fixed flex w-full h-full'>
      <div className=''>
        <AdminSidebar />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <HeaderManager />
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout