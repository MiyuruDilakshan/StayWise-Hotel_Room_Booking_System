import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Import pages
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/signup'
import AdminDashboard from './pages/admin/dashboard'
import UserProfile from './pages/user_profile/UserProfile'
import MyBookings from './pages/user_profile/MyBookings';
import UserSettings from './pages/user_profile/UserSettings';
import EditProfile from './pages/user_profile/EditProfile';
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
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} /> 
        <Route path="/bookings" element={<Placeholder name="My Bookings" />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/editprofile" element={<EditProfile />} />

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
        <Route path="/admin/rooms" element={<Placeholder name="Manage Rooms" />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/users" element={<Users/>} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/rooms/edit/:id" element={<EditRoom />} />
        

      </Route>
    </Routes>
  )
}
