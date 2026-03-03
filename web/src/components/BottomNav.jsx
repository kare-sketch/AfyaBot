import { NavLink, useNavigate } from 'react-router-dom'

export default function BottomNav() {
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-xl transition-colors ${
      isActive ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'
    }`

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg safe-area-inset-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-1">
        {/* Home */}
        <NavLink to="/dashboard" end className={linkClass}>
          <span className="text-xl">🏠</span>
          <span className="text-xs font-semibold">Home</span>
        </NavLink>

        {/* Log — floating + button */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={() => navigate('/dashboard/log')}
            className="w-14 h-14 -mt-6 bg-teal-600 hover:bg-teal-700 active:scale-95 rounded-full flex items-center justify-center shadow-xl shadow-teal-300 transition-all"
            aria-label="Log symptom"
          >
            <span className="text-white text-3xl leading-none">+</span>
          </button>
          <span className="text-xs font-semibold text-gray-400 mt-0.5">Log</span>
        </div>

        {/* History */}
        <NavLink to="/dashboard/history" className={linkClass}>
          <span className="text-xl">📋</span>
          <span className="text-xs font-semibold">History</span>
        </NavLink>

        {/* Profile */}
        <NavLink to="/dashboard/profile" className={linkClass}>
          <span className="text-xl">👤</span>
          <span className="text-xs font-semibold">Profile</span>
        </NavLink>
      </div>
    </nav>
  )
}
