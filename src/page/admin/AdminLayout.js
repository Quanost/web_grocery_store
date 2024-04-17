import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import path from '../../ultils/path';
import { useSelector } from 'react-redux';
import { AdminSidebar } from '../../components'

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user);
  console.log('role', current?.role)
  if (!isLoggedIn || !current || current?.role !== "MANAGER") return <Navigate to={`/${path.LOGIN}`} replace={true} />

  return (
    <div className='flex w-full min-h-screen'>
      <div className='w-[327px] flex-none'>
        <AdminSidebar />
      </div>
      <div className='flex-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout