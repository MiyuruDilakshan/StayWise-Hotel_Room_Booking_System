import React, { useState, useEffect } from 'react';
import { getUserStats, getBookingStats, getRooms, fetchBookings } from '../../services/adminService';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [stats, setStats] = useState({
    totalRooms: 0,
    roomsGrowth: '0%',
    totalBookings: 0,
    bookingsGrowth: '0%',
    totalUsers: 0,
    usersGrowth: '0%',
    revenue: 0,
    revenueGrowth: '0%'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('adminUser'));
        setAdminData(user);

        // Load user stats
        const userStatsResult = await getUserStats();
        if (userStatsResult.success) {
          setStats(prev => ({
            ...prev,
            totalUsers: userStatsResult.data.totalUsers || 0,
            usersGrowth: `+${userStatsResult.data.newUsersThisMonth || 0} this month`
          }));
        }

        // Load booking stats (including revenue)
        const bookingStatsResult = await getBookingStats();
        if (bookingStatsResult.success) {
          setStats(prev => ({
            ...prev,
            totalBookings: bookingStatsResult.data.totalBookings || 0,
            revenue: bookingStatsResult.data.revenue || 0
          }));
        }

        // Load rooms to count them
        const roomsResult = await getRooms();
        if (roomsResult.success) {
             setStats(prev => ({
                ...prev,
                totalRooms: roomsResult.count || 0
             }));
        }

        // Load recent bookings
        const bookingsResult = await fetchBookings({ perPage: 5 });
        if (bookingsResult.success) {
            setRecentBookings(bookingsResult.data.slice(0, 5));
        }

      } catch (err) {
        console.error('Error loading dashboard:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      {error && <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>}

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
                <tr key={booking._id || booking.id}>
                  <td className="booking-id">{(booking._id || booking.id).substring(0, 8)}...</td>
                  <td className="room-type">{booking.room ? booking.room.name : booking.roomType || 'N/A'}</td>
                  <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                  <td>{booking.user ? booking.user.name : booking.user || 'Guest'}</td>
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