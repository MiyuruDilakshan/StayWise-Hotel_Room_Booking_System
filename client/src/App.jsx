import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Import pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminForgotPassword from './pages/admin/AdminForgotPassword'
import EditRoom from "./pages/admin/EditRoom";
import Bookings from "./pages/admin/Bookings";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";


// Placeholder components for pages team will create
function Placeholder({ name }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>{name}</h2>
      <p>This page is ready to be implemented by the team.<br />
        when you make pages in client/src/pages make sure to import pages in app.jsx(client\src\App.jsx) <br />
        example - add " import Login from './pages/Login' " in under "// Import pages"
      </p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Customer Routes WITH navbar & footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<Placeholder name="About Us" />} />
        <Route path="/contact" element={<Placeholder name="Contact Us" />} />
        <Route path="/login" element={<Placeholder name="Login" />} />
        <Route path="/register" element={<Placeholder name="Register" />} />
        <Route path="/bookings" element={<Placeholder name="My Bookings" />} />
        <Route path="/profile" element={<Placeholder name="User Profile" />} />
      </Route>

      {/* Admin Routes WITHOUT navbar & footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<Placeholder name="Manage Rooms" />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/rooms/edit/:id" element={<EditRoom />} />


      </Route>
    </Routes>
  )
}
