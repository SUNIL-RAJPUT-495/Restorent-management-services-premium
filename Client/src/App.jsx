import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/landing/Navbar'
import { Footer } from './components/landing/Footer'
import { Home } from './pages/marketing/Home'
import { About } from './pages/marketing/About'
import { Pos } from './pages/marketing/Pos'
import { FeaturesPage } from './pages/marketing/FeaturesPage'
import { PricingPage } from './pages/marketing/PricingPage'
import { Blogs } from './pages/marketing/Blogs'
import { ContactPage } from './pages/marketing/ContactPage'
import { SuperAdminLogin } from './pages/auth/SuperAdminLogin'

// Super Admin Components
import SuperAdminLayout from './layouts/SuperAdminLayout'
import Dashboard from './pages/super-admin/Dashboard'
import PlanManage from './pages/super-admin/PlanManage'
import BlogManage from './pages/super-admin/BlogManage'
import TenantManage from './pages/super-admin/TenantManage'
import SuperAdminProtectedRoute from './components/superAdmin/SuperAdminProtectedRoute'
import RegisterRestaurant from './pages/marketing/RegisterRestaurant'


export const App = () => {
  const location = useLocation()
  const isAuthRoute = location.pathname.includes('/login')
  const isSuperAdminRoute = location.pathname.startsWith('/super-admin')

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-orange-500 selection:text-white">
      {(!isAuthRoute && !isSuperAdminRoute) && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register-plan" element={<RegisterRestaurant />} />
          
          {/* Auth Routes */}
          <Route path="/super-admin/login" element={<SuperAdminLogin />} />

          {/* Super Admin Dashboard Routes - Protected */}
          <Route path="/super-admin" element={
            <SuperAdminProtectedRoute>
              <SuperAdminLayout />
            </SuperAdminProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="plans" element={<PlanManage />} />
            <Route path="blogs" element={<BlogManage />} />
            <Route path="restaurants" element={<TenantManage />} />
          </Route>
        </Routes>
      </main>
      {(!isAuthRoute && !isSuperAdminRoute) && <Footer />}
    </div>
  )
}
