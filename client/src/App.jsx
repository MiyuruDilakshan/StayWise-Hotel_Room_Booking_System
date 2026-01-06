import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import UserProtectedRoute from './components/UserProtectedRoute'
import BookingNotification from './components/BookingNotification'

// Import pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import AdminDashboard from './pages/admin/admindashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminForgotPassword from './pages/admin/AdminForgotPassword'
import EditRoom from "./pages/admin/EditRoom";
import Bookings from "./pages/admin/Bookings";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Login from './pages/login'
import Signup from './pages/signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UserProfile from './pages/user_profile/UserProfile'
import MyBookings from './pages/user_profile/MyBookings';
import UserSettings from './pages/user_profile/UserSettings';
import EditProfile from './pages/user_profile/EditProfile';
import RoomManagement from './pages/admin/RoomManagement'
import BookingInformation from './pages/BookingInformation';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';


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
    <>
      <BookingNotification />
      <Routes>
        {/* Customer Routes WITH navbar & footer */}
        <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        {/* Protected User Routes */}
        <Route path="/profile" element={<UserProtectedRoute element={<UserProfile />} />} />
        <Route path="/mybookings" element={<UserProtectedRoute element={<MyBookings />} />} />
        <Route path="/settings" element={<UserProtectedRoute element={<UserSettings />} />} />
        <Route path="/editprofile" element={<UserProtectedRoute element={<EditProfile />} />} />
        
        {/* Booking Routes */}
        <Route path="/booking" element={<BookingInformation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Route>

      {/* Admin Routes WITHOUT navbar & footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/admin/rooms" element={<AdminProtectedRoute element={<RoomManagement />} />} />
        <Route path="/admin/bookings" element={<AdminProtectedRoute element={<Bookings />} />} />
        <Route path="/admin/users" element={<AdminProtectedRoute element={<Users />} />} />
        <Route path="/admin/settings" element={<AdminProtectedRoute element={<Settings />} />} />
        <Route path="/admin/rooms/edit/:id" element={<AdminProtectedRoute element={<EditRoom />} />} />
      </Route>
    </Routes>
    </>
  )
}
