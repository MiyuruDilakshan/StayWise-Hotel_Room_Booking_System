import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Import pages
import Home from './pages/Home'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminForgotPassword from './pages/admin/AdminForgotPassword'
import RoomManagement from './pages/admin/RoomManagement'
import BookingInformation from './pages/BookingInformation';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';


// Placeholder components for pages team will create
function Placeholder({ name }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>{name}</h2>
      <p>This page is ready to be implemented by the team.<br/>
        when you make pages in client/src/pages make sure to import pages in app.jsx(client\src\App.jsx) <br/>
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
        <Route path="/rooms" element={<Placeholder name="Browse Rooms" />} />
        <Route path="/about" element={<Placeholder name="About Us" />} />
        <Route path="/contact" element={<Placeholder name="Contact Us" />} />
        <Route path="/login" element={<Placeholder name="Login" />} />
        <Route path="/register" element={<Placeholder name="Register" />} />
        <Route path="/bookings" element={<Placeholder name="My Bookings" />} />
        <Route path="/profile" element={<Placeholder name="User Profile" />} />
        <Route path="/" element={<BookingInformation />} />
        <Route path="/booking" element={<BookingInformation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Route>

      {/* Admin Routes WITHOUT navbar & footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<RoomManagement />} />
        <Route path="/admin/bookings" element={<Placeholder name="Manage Bookings" />} />
        <Route path="/admin/users" element={<Placeholder name="Manage Users" />} />
        <Route path="/admin/settings" element={<Placeholder name="Admin Settings" />} />
      </Route>
    </Routes>
  )
}
