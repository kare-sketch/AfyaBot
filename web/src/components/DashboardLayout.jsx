import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* pb-24 gives room for the fixed bottom nav */}
      <div className="pb-24">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
