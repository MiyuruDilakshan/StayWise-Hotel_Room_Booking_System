import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">StayWise Admin</h2>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/admin/dashboard"
          className={`sidebar-nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 10L10 3L17 10V17C17 17.5304 16.7893 18.0391 16.4142 18.4142C16.0391 18.7893 15.5304 19 15 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/admin/rooms"
          className={`sidebar-nav-item ${isActive('/admin/rooms') ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 9V17H17V9M1 5H19V9H1V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Rooms</span>
        </Link>

        <Link
          to="/admin/bookings"
          className={`sidebar-nav-item ${isActive('/admin/bookings') ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 2V6M13 2V6M3 8H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Bookings</span>
        </Link>

        <Link
          to="/admin/users"
          className={`sidebar-nav-item ${isActive('/admin/users') ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M14 17V15C14 13.9391 13.5786 12.9217 12.8284 12.1716C12.0783 11.4214 11.0609 11 10 11H4C2.93913 11 1.92172 11.4214 1.17157 12.1716C0.421427 12.9217 0 13.9391 0 15V17M19 17V15C18.9993 14.1137 18.7044 13.2528 18.1614 12.5523C17.6184 11.8519 16.8581 11.3516 16 11.13M13 1.13C13.8604 1.35031 14.623 1.85071 15.1676 2.55232C15.7122 3.25392 16.0078 4.11683 16.0078 5.005C16.0078 5.89318 15.7122 6.75608 15.1676 7.45769C14.623 8.1593 13.8604 8.6597 13 8.88M7 7C8.65685 7 10 5.65685 10 4C10 2.34315 8.65685 1 7 1C5.34315 1 4 2.34315 4 4C4 5.65685 5.34315 7 7 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Users</span>
        </Link>

        <Link
          to="/admin/settings"
          className={`sidebar-nav-item ${isActive('/admin/settings') ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 10C16 10.39 15.96 10.77 15.9 11.14L17.63 12.51C17.78 12.63 17.82 12.85 17.72 13.03L16.08 15.97C15.98 16.15 15.76 16.22 15.57 16.15L13.54 15.33C13.11 15.67 12.64 15.96 12.13 16.18L11.83 18.32C11.8 18.52 11.63 18.67 11.42 18.67H8.17C7.96 18.67 7.79 18.52 7.76 18.32L7.46 16.18C6.95 15.96 6.48 15.68 6.05 15.33L4.02 16.15C3.83 16.21 3.61 16.15 3.51 15.97L1.87 13.03C1.77 12.85 1.81 12.63 1.96 12.51L3.69 11.14C3.63 10.77 3.59 10.39 3.59 10C3.59 9.61 3.63 9.23 3.69 8.86L1.96 7.49C1.81 7.37 1.77 7.15 1.87 6.97L3.51 4.03C3.61 3.85 3.83 3.78 4.02 3.85L6.05 4.67C6.48 4.33 6.95 4.04 7.46 3.82L7.76 1.68C7.79 1.48 7.96 1.33 8.17 1.33H11.42C11.63 1.33 11.8 1.48 11.83 1.68L12.13 3.82C12.64 4.04 13.11 4.32 13.54 4.67L15.57 3.85C15.76 3.79 15.98 3.85 16.08 4.03L17.72 6.97C17.82 7.15 17.78 7.37 17.63 7.49L15.9 8.86C15.96 9.23 16 9.61 16 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
