# Example Pages - Home & Admin Dashboard

This document explains the two example pages I created for reference.

## 🏠 Home Page (`/`)

**File:** `client/src/pages/Home.jsx`

### Features:
- **Hero Section** — Search form for room bookings (check-in, check-out, guests)
- **Featured Rooms Grid** — Displays sample rooms with:
  - Room name & emoji icon
  - Guest capacity
  - Star rating
  - Price per night
  - "View Details" button
- **Why Choose Us Section** — 4 benefit cards (Price guarantee, Security, 24/7 support, Easy cancellation)
- **Call-to-Action Section** — Encourages users to browse all rooms

### Styling:
- Uses `Home.css` for all styles
- Gradient backgrounds for hero and CTA sections
- Responsive grid layout (auto-fit minmax)
- Hover effects on cards

### API Integration Notes:
- Currently uses `setTimeout()` to simulate API call (placeholder data)
- Replace with actual API call: `axios.get('/api/rooms')`
- Example:
```jsx
const response = await axios.get('/api/rooms');
setRooms(response.data);
```

---

## 🔧 Admin Dashboard (`/admin/dashboard`)

**File:** `client/src/pages/admin/dashboard.jsx`

### Features:
- **Stats Overview** — 4 cards showing:
  - Total Rooms
  - Total Bookings
  - Total Users
  - Total Revenue
- **Recent Bookings Table** — Shows last 4 bookings with columns:
  - Guest Name
  - Room
  - Check-in / Check-out dates
  - Booking Status (Confirmed/Pending/Completed)
  - Amount
  - Action button
- **Quick Actions** — 4 button cards for:
  - Add New Room
  - Create Booking
  - View Reports
  - Settings

### Styling:
- Uses `AdminDashboard.css` for all styles
- Color-coded status badges (green=confirmed, yellow=pending, blue=completed)
- Responsive table with hover effects
- Stat cards have hover animations

### API Integration Notes:
- Currently uses `setTimeout()` for placeholder data
- Replace with actual API calls:
```jsx
// Fetch stats
const statsResponse = await axios.get('/api/admin/stats');
setStats(statsResponse.data);

// Fetch recent bookings
const bookingsResponse = await axios.get('/api/admin/bookings/recent');
setRecentBookings(bookingsResponse.data);
```

---

## 📐 Layout System

### MainLayout (for customer pages)
```jsx
<MainLayout>
  <Navbar />
  <main className="main-content">
    <Page Content>
  </main>
  <Footer />
</MainLayout>
```

**Routes using MainLayout:**
- `/` (Home)
- `/rooms` (Browse Rooms)
- `/about` (About Us)
- `/contact` (Contact)
- `/login` (Login)
- `/register` (Register)
- `/bookings` (My Bookings)
- `/profile` (User Profile)

### AdminLayout (for admin pages)
```jsx
<AdminLayout>
  <Sidebar with navigation>
  <main className="admin-content">
    <Page Content>
  </main>
</AdminLayout>
```

**Routes using AdminLayout:**
- `/admin/dashboard` (Dashboard)
- `/admin/rooms` (Manage Rooms)
- `/admin/bookings` (Manage Bookings)
- `/admin/users` (Manage Users)
- `/admin/settings` (Admin Settings)

---

## 🎨 CSS File Structure

```
client/src/styles/
├── MainLayout.css         ← Layout for customer pages
├── AdminLayout.css        ← Layout for admin pages
├── Navbar.css             ← Top navigation bar
├── Footer.css             ← Bottom footer
├── Home.css               ← Home page specific styles
└── AdminDashboard.css     ← Admin dashboard specific styles
```

### How CSS is organized:
- **Layout CSS** — Container, flexbox, responsive grid
- **Component CSS** — Individual navbar, footer, sidebar styles
- **Page CSS** — Specific page styling (home hero section, admin table, etc.)

---

## 📝 How Team Members Should Extend

### Adding a New Customer Page (e.g., Rooms page)

1. **Create component file:**
```jsx
// client/src/pages/Rooms.jsx
import React, { useState, useEffect } from 'react'
import '../styles/Rooms.css'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all rooms from API
    axios.get('/api/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="rooms-page">
      {/* Your content here */}
    </div>
  )
}
```

2. **Create CSS file:**
```css
/* client/src/styles/Rooms.css */
.rooms-page {
  /* Your styles */
}
```

3. **Add route in App.jsx:**
```jsx
<Route path="/rooms" element={<Rooms />} />
```

✅ Done! Navbar and Footer will appear automatically (via MainLayout).

---

### Adding a New Admin Page (e.g., Manage Users)

1. **Create component file:**
```jsx
// client/src/pages/admin/Users.jsx
import React, { useState, useEffect } from 'react'
import '../../styles/AdminUsers.css'

export default function AdminUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/admin/users')
      .then(res => setUsers(res.data))
  }, [])

  return (
    <div className="admin-users">
      {/* Your content here */}
    </div>
  )
}
```

2. **Create CSS file:**
```css
/* client/src/styles/AdminUsers.css */
.admin-users {
  /* Your styles */
}
```

3. **Update sidebar link in AdminLayout.jsx:**
```jsx
<Link to="/admin/users" className={`sidebar-link ...`}>
  👥 Users
</Link>
```

4. **Add route in App.jsx:**
```jsx
<Route path="/admin/users" element={<AdminUsers />} />
```

✅ Done! Sidebar navigation will work automatically (via AdminLayout).

---

## 🧪 Testing the Examples

Run the development server:
```
cd client
npm run dev
```

Then visit:
- **Home Page:** http://localhost:5173/
- **Admin Dashboard:** http://localhost:5173/admin/dashboard

Click the sidebar toggle (←/→) to collapse the admin sidebar.

---

## 📋 Summary

| File | Purpose | Status |
|------|---------|--------|
| `pages/Home.jsx` | Landing page example | ✅ Implemented |
| `pages/admin/dashboard.jsx` | Admin overview example | ✅ Implemented |
| `styles/Home.css` | Home page styling | ✅ Implemented |
| `styles/AdminDashboard.css` | Admin dashboard styling | ✅ Implemented |
| `layouts/MainLayout.jsx` | Customer page wrapper | ✅ Implemented |
| `layouts/AdminLayout.jsx` | Admin page wrapper | ✅ Implemented |
| `components/Navbar.jsx` | Top navigation | ✅ Implemented |
| `components/Footer.jsx` | Bottom footer | ✅ Implemented |
| `App.jsx` | Main router with all routes | ✅ Implemented |

**All files are ready for your team to build upon!**
