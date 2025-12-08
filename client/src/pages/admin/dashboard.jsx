import React, { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRooms: 45,
    totalBookings: 128,
    totalUsers: 523,
    revenue: 45230
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch dashboard data from API
    setLoading(true)
    setTimeout(() => {
      setRecentBookings([
        { id: 1, guest: 'John Doe', room: 'Deluxe Room 301', checkIn: '2025-01-15', checkOut: '2025-01-17', status: 'Confirmed', amount: 240 },
        { id: 2, guest: 'Jane Smith', room: 'Suite 402', checkIn: '2025-01-16', checkOut: '2025-01-18', status: 'Pending', amount: 360 },
        { id: 3, guest: 'Mike Johnson', room: 'Standard 105', checkIn: '2025-01-14', checkOut: '2025-01-16', status: 'Completed', amount: 160 },
        { id: 4, guest: 'Sarah Williams', room: 'Deluxe Room 305', checkIn: '2025-01-20', checkOut: '2025-01-22', status: 'Confirmed', amount: 240 },
      ])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🛏️</div>
          <div className="stat-content">
            <h3>Total Rooms</h3>
            <p className="stat-number">{stats.totalRooms}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p className="stat-number">{stats.totalBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-number">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="recent-bookings">
        <h2>Recent Bookings</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.guest}</td>
                  <td>{booking.room}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>${booking.amount}</td>
                  <td>
                    <button className="action-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card">
            <span className="action-icon">➕</span>
            <p>Add New Room</p>
          </button>
          <button className="action-card">
            <span className="action-icon">📋</span>
            <p>Create Booking</p>
          </button>
          <button className="action-card">
            <span className="action-icon">📊</span>
            <p>View Reports</p>
          </button>
          <button className="action-card">
            <span className="action-icon">⚙️</span>
            <p>Settings</p>
          </button>
        </div>
      </div>
    </div>
  )
}