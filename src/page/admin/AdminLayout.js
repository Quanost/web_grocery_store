import React, {useEffect} from 'react';
import { Navigate, Outlet, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { useSelector } from 'react-redux';
import { AdminSidebar, HeaderManager } from '../../components'



const AdminLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, current } = useSelector(state => state.user);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn || !current || current?.role !== "MANAGER") {
      navigate({
        pathname: `/${path.LOGIN}`,
        search: createSearchParams({ redirect: location.pathname }).toString(),
      })
    }
  }, [isLoggedIn, current, navigate]);
  // if (!isLoggedIn || !current || current?.role !== "MANAGER") return <Navigate to={`/${path.LOGIN}`} replace={true} />

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