import React, { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import '../styles/AdminLayout.css'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="admin-layout">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>🏨 Admin Panel</h2>
          <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/admin/dashboard" 
            className={`sidebar-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/admin/rooms" 
            className={`sidebar-link ${isActive('/admin/rooms') ? 'active' : ''}`}
          >
            🛏️ Rooms
          </Link>
          <Link 
            to="/admin/bookings" 
            className={`sidebar-link ${isActive('/admin/bookings') ? 'active' : ''}`}
          >
            📅 Bookings
          </Link>
          <Link 
            to="/admin/users" 
            className={`sidebar-link ${isActive('/admin/users') ? 'active' : ''}`}
          >
            👥 Users
          </Link>
          <Link 
            to="/admin/settings" 
            className={`sidebar-link ${isActive('/admin/settings') ? 'active' : ''}`}
          >
            ⚙️ Settings
          </Link>
        </nav>

        <button className="logout-btn-admin" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}