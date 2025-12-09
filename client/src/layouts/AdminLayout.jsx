import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    // Temporarily disabled for testing
    // if (!token) {
    //   navigate('/admin/login');
    // }
  }, [navigate]);

  return (
    <div className="admin-layout-wrapper">
      <AdminNavbar />
      <div className="admin-layout-container">
        <AdminSidebar />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;