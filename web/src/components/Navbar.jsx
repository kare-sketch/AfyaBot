import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b border-teal-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="AfyaBot" className="h-10 w-10 rounded-full" />
          <span className="font-extrabold text-xl text-teal-600">AfyaBot</span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all shadow-md shadow-teal-100"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-500 hover:text-teal-600 font-semibold text-sm px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all shadow-md shadow-teal-100"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
