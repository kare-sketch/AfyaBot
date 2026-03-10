import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const KENYAN_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi',
  'Kitale', 'Garissa', 'Kakamega', 'Nyeri', 'Machakos', 'Meru', 'Kericho',
  'Embu', 'Kilifi', 'Kisii', 'Voi', 'Bungoma', 'Homa Bay', 'Busia', 'Isiolo',
  'Marsabit', 'Wajir', 'Mandera', 'Kwale', 'Siaya', 'Migori', 'Bomet',
  'Baringo', 'Laikipia', 'Uasin Gishu', 'Trans Nzoia', 'West Pokot', 'Samburu',
  'Turkana', 'Outside Kenya',
]

export default function Signup() {
  const { signUp, user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    full_name: '', email: '', password: '', age: '', gender: '', location: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Navigate only after auth state is confirmed in context
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.gender || !form.location) {
      setError('Please fill in all fields including gender and county.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await signUp(form)
      // navigation handled by useEffect above
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 bg-white text-sm'

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/logo.png" alt="AfyaBot" className="h-20 w-20 mx-auto mb-4 drop-shadow-md" />
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-800">Create your account</h1>
          <p className="text-gray-400 text-sm mt-1">
            Your info helps us personalise health tips for you 🇰🇪
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={form.full_name}
                onChange={set('full_name')}
                placeholder="Jane Wanjiku"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={set('email')}
                placeholder="jane@example.com"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={form.password}
                onChange={set('password')}
                placeholder="Min. 6 characters"
                className={inputClass}
              />
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Age</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={form.age}
                  onChange={set('age')}
                  placeholder="25"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Gender</label>
                <select
                  value={form.gender}
                  onChange={set('gender')}
                  className={inputClass}
                >
                  <option value="">Select…</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* County / Location */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                📍 County / Location
              </label>
              <select
                value={form.location}
                onChange={set('location')}
                className={inputClass}
              >
                <option value="">Select your county…</option>
                {KENYAN_COUNTIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 active:scale-95 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-teal-100 mt-2"
            >
              {loading ? 'Creating account…' : 'Get Started →'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
