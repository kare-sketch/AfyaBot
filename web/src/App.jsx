import { Routes, Route, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import LogSymptom from './pages/LogSymptom'
import History from './pages/History'
import Remedies from './pages/Remedies'
import UserProfile from './pages/UserProfile'

// Layout for the public landing page (has top navbar)
function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public landing page */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Auth pages — no nav, full-screen */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="log" element={<LogSymptom />} />
          <Route path="history" element={<History />} />
          <Route path="remedies" element={<Remedies />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
