import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/MainLayout.css'

export default function MainLayout() {
  const location = useLocation()
  
  // Pages that should NOT show footer
  const hideFooterPaths = ['/login', '/signup']
  const showFooter = !hideFooterPaths.includes(location.pathname)

  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  )
}