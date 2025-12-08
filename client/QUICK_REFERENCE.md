# Frontend Quick Reference Guide

## Directory Structure
```
client/src/
├── pages/                 ← Page components
│   ├── Home.jsx          ✅ Example (landing page)
│   ├── admin/
│   │   └── dashboard.jsx ✅ Example (admin overview)
│   ├── Rooms.jsx         👈 Create this (browse all rooms)
│   ├── Login.jsx         👈 Create this
│   ├── Register.jsx      👈 Create this
│   ├── Profile.jsx       👈 Create this
│   └── Bookings.jsx      👈 Create this
│
├── components/           ← Shared UI components
│   ├── Navbar.jsx        ✅ Done (with login/logout)
│   └── Footer.jsx        ✅ Done
│
├── layouts/              ← Page wrappers
│   ├── MainLayout.jsx    ✅ Done (navbar + footer)
│   └── AdminLayout.jsx   ✅ Done (sidebar nav)
│
├── styles/               ← CSS files
│   ├── Navbar.css        ✅ Done
│   ├── Footer.css        ✅ Done
│   ├── MainLayout.css    ✅ Done
│   ├── AdminLayout.css   ✅ Done
│   ├── Home.css          ✅ Done (example)
│   ├── AdminDashboard.css ✅ Done (example)
│   ├── Rooms.css         👈 Create this
│   ├── Login.css         👈 Create this
│   └── Profile.css       👈 Create this
│
├── App.jsx               ✅ Done (all routes defined)
├── main.jsx              ✅ Done (React entry point)
└── styles.css            ✅ Done (global styles)
```

---

## API Endpoints Summary

### Authentication Routes
```
POST   /api/auth/register    ← Create new account
POST   /api/auth/login       ← Login user
```

### Room Routes
```
GET    /api/rooms           ← Get all rooms
GET    /api/rooms/:id       ← Get single room
POST   /api/rooms           ← Create room (admin)
PUT    /api/rooms/:id       ← Update room (admin)
DELETE /api/rooms/:id       ← Delete room (admin)
```

### Booking Routes (team will create)
```
GET    /api/bookings        ← Get user bookings
POST   /api/bookings        ← Create booking
PUT    /api/bookings/:id    ← Update booking
DELETE /api/bookings/:id    ← Cancel booking
```

### Admin Routes (team will create)
```
GET    /api/admin/stats     ← Dashboard stats
GET    /api/admin/users     ← All users
GET    /api/admin/bookings/recent ← Recent bookings
```

---

## Component Implementation Checklist

### For each new page you create:

**1. Create the component file:**
```jsx
import React, { useState, useEffect } from 'react'
import '../styles/YourPage.css'

export default function YourPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch data from API
    // axios.get('/api/endpoint').then(res => setData(res.data))
  }, [])

  return (
    <div className="your-page">
      {/* Your JSX here */}
    </div>
  )
}
```

**2. Create the CSS file:**
```css
/* client/src/styles/YourPage.css */
.your-page {
  /* Your styles */
}
```

**3. Add import in App.jsx:**
```jsx
import YourPage from './pages/YourPage'
```

**4. Add route in App.jsx (under correct Layout):**

For customer pages (with navbar/footer):
```jsx
<Route path="/your-path" element={<YourPage />} />
```

For admin pages (sidebar nav):
```jsx
<Route path="/admin/your-path" element={<YourPage />} />
```

**5. Update sidebar link in AdminLayout.jsx (if admin page):**
```jsx
<Link to="/admin/your-path" className={`sidebar-link ...`}>
  📊 Your Page Name
</Link>
```

---

## Common Code Patterns

### Fetch data from API
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/endpoint')
      setData(response.data)
    } catch (error) {
      console.error('Error:', error.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])
```

### Handle form submission
```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.post('/api/endpoint', formData)
    console.log('Success:', response.data)
    // Redirect or show success message
  } catch (error) {
    console.error('Error:', error.response.data)
  }
}
```

### Get user token from localStorage
```jsx
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))

// Use token in API requests
const response = await axios.get('/api/endpoint', {
  headers: { Authorization: `Bearer ${token}` }
})
```

### Socket.IO real-time updates
```jsx
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

socket.on('bookingUpdate', (data) => {
  // Update UI when booking is created/updated
  setBookings(prev => [...prev, data])
})

// Emit event when creating booking
socket.emit('newBooking', bookingData)
```

---

## Styling Best Practices

### Use consistent colors
```css
/* Primary colors */
--primary-blue: #3498db
--primary-dark: #2c3e50
--primary-light: #ecf0f1

/* Status colors */
--success-green: #27ae60
--warning-yellow: #f39c12
--danger-red: #e74c3c
```

### Make components responsive
```css
/* Desktop first approach */
.my-component {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

/* Mobile: 1 column */
@media (max-width: 768px) {
  .my-component {
    grid-template-columns: 1fr;
  }
}
```

### Use flexbox for alignment
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
```

---

## Navigation Links

### From customer pages (can link anywhere):
```jsx
<Link to="/">Home</Link>
<Link to="/rooms">Browse Rooms</Link>
<Link to="/bookings">My Bookings</Link>
<Link to="/profile">Profile</Link>
<Link to="/login">Login</Link>
```

### From admin pages (stay in admin):
```jsx
<Link to="/admin/dashboard">Dashboard</Link>
<Link to="/admin/rooms">Manage Rooms</Link>
<Link to="/admin/bookings">Manage Bookings</Link>
<Link to="/admin/users">Manage Users</Link>
```

---

## Testing Your Page

**1. Start dev server:**
```cmd
npm run dev
```

**2. Visit your page:**
- Customer: http://localhost:5173/your-path
- Admin: http://localhost:5173/admin/your-path

**3. Check console for errors:**
- Open DevTools (F12)
- Look for red errors or warnings

**4. Test API calls:**
- Make sure backend is running (`npm run dev` in `server/` folder)
- Check network tab to see API requests

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Navbar/Footer not showing | Check if route is inside `<MainLayout>` wrapper |
| Sidebar not showing | Check if route is inside `<AdminLayout>` wrapper |
| API 404 error | Make sure backend is running and endpoint path matches |
| Styling not applied | Check CSS filename and import path in component |
| useState not working | Make sure you import: `import React, { useState }` |
| Token not sent to API | Use axios headers: `headers: { Authorization: 'Bearer ' + token }` |

---

## Ready to Build?

1. ✅ Pick a page to create (e.g., Rooms.jsx)
2. ✅ Use the **Component Implementation Checklist** above
3. ✅ Reference the **Home.jsx** or **AdminDashboard.jsx** examples
4. ✅ Check API endpoints with team members
5. ✅ Test in browser at http://localhost:5173
6. ✅ Push to GitHub when done!

**Good luck! Ask questions if you get stuck.** 💪
