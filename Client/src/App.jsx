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
import LeadPopup from './components/landing/LeadPopup'
import { Billing } from './pages/marketing/pos/Billing'
import { Employee } from './pages/marketing/pos/Employee'
import { FineDiner } from './pages/marketing/pos/FineDiner'
import { Menu } from './pages/marketing/pos/Menu'
import { Report } from './pages/marketing/pos/Report'
import { Inventory } from './pages/marketing/pos/Inventory'

// Super Admin Components
import SuperAdminLayout from './layouts/SuperAdminLayout'
import Dashboard from './pages/super-admin/Dashboard'
import PlanManage from './pages/super-admin/PlanManage'
import BlogManage from './pages/super-admin/BlogManage'
import TenantManage from './pages/super-admin/TenantManage'
import LeadManage from './pages/super-admin/LeadManage'
import SuperAdminProtectedRoute from './components/superAdmin/SuperAdminProtectedRoute'
import RegisterRestaurant from './pages/marketing/RegisterRestaurant'
import IMBPaymentGateway from './pages/marketing/IMBPaymentGateway'


export const App = () => {
  const location = useLocation()
  const isAuthRoute = location.pathname.includes('/login')
  const isSuperAdminRoute = location.pathname.startsWith('/super-admin')
  const [showLeadPopup, setShowLeadPopup] = React.useState(false)
  const leadSubmittedKey = 'rw_lead_submitted'

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  React.useEffect(() => {
    if (isAuthRoute || isSuperAdminRoute) return
    if (localStorage.getItem(leadSubmittedKey) === 'true') return

    setShowLeadPopup(false)
    const timer = setTimeout(() => {
      setShowLeadPopup(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [location.pathname, isAuthRoute, isSuperAdminRoute])

  const handleLeadSubmitted = () => {
    localStorage.setItem(leadSubmittedKey, 'true')
    setShowLeadPopup(false)
  }

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
          <Route path="/pos/billing" element={<Billing />} />
          <Route path="/pos/inventory" element={<Inventory />} />
          <Route path="/pos/menu" element={<Menu />} />
          <Route path="/pos/report" element={<Report />} />
          <Route path="/pos/employee" element={<Employee />} />
          <Route path="/pos/finediner" element={<FineDiner />} />




          <Route path="/register-plan" element={<RegisterRestaurant />} />
          <Route path="/imb-payment" element={<IMBPaymentGateway />} />
          
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
            <Route path="leads" element={<LeadManage />} />
          </Route>
        </Routes>
      </main>
      {(!isAuthRoute && !isSuperAdminRoute) && <Footer />}
      <LeadPopup
        open={showLeadPopup}
        onClose={() => setShowLeadPopup(false)}
        onSubmitted={handleLeadSubmitted}
      />
    </div>
  )
}
