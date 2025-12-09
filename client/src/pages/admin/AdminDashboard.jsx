import React, { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [stats, setStats] = useState({
    totalRooms: 250,
    roomsGrowth: '+10%',
    totalBookings: 1200,
    bookingsGrowth: '+5%',
    totalUsers: 500,
    usersGrowth: '+8%',
    revenue: 150000,
    revenueGrowth: '+12%'
  });

  const [recentBookings] = useState([
    {
      id: 'BK12345',
      roomType: 'Deluxe Suite',
      checkIn: '2024-07-15',
      checkOut: '2024-07-20',
      user: 'Liam Carter',
      status: 'Confirmed'
    },
    {
      id: 'BK12346',
      roomType: 'Standard Room',
      checkIn: '2024-07-16',
      checkOut: '2024-07-18',
      user: 'Olivia Bennett',
      status: 'Confirmed'
    },
    {
      id: 'BK12347',
      roomType: 'Executive Suite',
      checkIn: '2024-07-17',
      checkOut: '2024-07-22',
      user: 'Noah Thompson',
      status: 'Pending'
    },
    {
      id: 'BK12348',
      roomType: 'Family Room',
      checkIn: '2024-07-18',
      checkOut: '2024-07-25',
      user: 'Isabella Hayes',
      status: 'Confirmed'
    },
    {
      id: 'BK12349',
      roomType: 'Deluxe Suite',
      checkIn: '2024-07-19',
      checkOut: '2024-07-24',
      user: 'Ethan Parker',
      status: 'Cancelled'
    }
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('adminUser'));
    setAdminData(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

          {/* Overview Section */}
          <section className="overview-section">
            <h2>Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Rooms</div>
                <div className="stat-value">{stats.totalRooms}</div>
                <div className="stat-growth positive">{stats.roomsGrowth}</div>
              </div>

              <div className="stat-card">
                <div className="stat-label">Total Bookings</div>
                <div className="stat-value">{stats.totalBookings}</div>
                <div className="stat-growth positive">{stats.bookingsGrowth}</div>
              </div>

              <div className="stat-card">
                <div className="stat-label">Total Users</div>
                <div className="stat-value">{stats.totalUsers}</div>
                <div className="stat-growth positive">{stats.usersGrowth}</div>
              </div>

              <div className="stat-card">
                <div className="stat-label">Revenue</div>
                <div className="stat-value">${stats.revenue.toLocaleString()}</div>
                <div className="stat-growth positive">{stats.revenueGrowth}</div>
              </div>
            </div>
          </section>

          {/* Recent Bookings Section */}
          <section className="bookings-section">
            <h2>Recent Bookings</h2>
            <div className="table-container">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Room Type</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>User</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="booking-id">{booking.id}</td>
                      <td className="room-type">{booking.roomType}</td>
                      <td>{booking.checkIn}</td>
                      <td>{booking.checkOut}</td>
                      <td>{booking.user}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        © 2024 StayWise Hotels. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;