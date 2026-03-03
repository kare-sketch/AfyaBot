import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { profile } = useAuth()

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-40 shadow-sm">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* Greeting */}
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="AfyaBot" className="h-9 w-9 rounded-full" />
          <div>
            <p className="text-xs text-gray-400 leading-none">{greeting},</p>
            <p className="font-extrabold text-gray-800 text-sm leading-tight">
              {profile?.full_name?.split(' ')[0] || 'there'} 👋
            </p>
          </div>
        </div>

        {/* Avatar → profile */}
        <Link
          to="/dashboard/profile"
          className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm shrink-0 hover:bg-teal-200 transition-colors"
        >
          {initials}
        </Link>
      </div>
    </header>
  )
}
