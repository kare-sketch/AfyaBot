import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const KENYAN_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi',
  'Kitale', 'Garissa', 'Kakamega', 'Nyeri', 'Machakos', 'Meru', 'Kericho',
  'Embu', 'Kilifi', 'Kisii', 'Voi', 'Bungoma', 'Homa Bay', 'Busia', 'Isiolo',
  'Marsabit', 'Wajir', 'Mandera', 'Kwale', 'Siaya', 'Migori', 'Bomet',
  'Baringo', 'Laikipia', 'Uasin Gishu', 'Trans Nzoia', 'West Pokot', 'Samburu',
  'Turkana', 'Outside Kenya',
]

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 bg-white text-sm'

export default function UserProfile() {
  const { user, profile, signOut, fetchProfile } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    full_name: '', age: '', gender: '', location: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [totalLogs, setTotalLogs] = useState(null)

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        age: profile.age || '',
        gender: profile.gender || '',
        location: profile.location || '',
      })
    }
  }, [profile])

  useEffect(() => {
    if (user) {
      supabase
        .from('symptom_logs')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .then(({ count }) => setTotalLogs(count ?? 0))
    }
  }, [user])

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSave = async () => {
    setSaving(true)
    setError('')
    const { error: dbErr } = await supabase
      .from('profiles')
      .update({
        full_name: form.full_name,
        age: parseInt(form.age),
        gender: form.gender,
        location: form.location,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (dbErr) {
      setError(dbErr.message)
    } else {
      await fetchProfile(user.id)
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  return (
    <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
      <h1 className="text-2xl font-extrabold text-gray-800">My Profile</h1>

      {/* ── Avatar card ── */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-white text-center shadow-lg shadow-teal-200">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-extrabold mx-auto mb-3">
          {initials}
        </div>
        <h2 className="text-xl font-extrabold">{profile?.full_name || 'User'}</h2>
        <p className="text-teal-100 text-sm mt-0.5">{user?.email}</p>
        <div className="flex items-center justify-center gap-4 mt-3 text-teal-100 text-sm">
          {profile?.age && <span>🎂 {profile.age} yrs</span>}
          {profile?.location && <span>· 📍 {profile.location}</span>}
        </div>
        {totalLogs !== null && (
          <div className="mt-4 bg-white/10 rounded-xl px-4 py-2 inline-block text-sm">
            <strong>{totalLogs}</strong> symptom log{totalLogs !== 1 ? 's' : ''} total
          </div>
        )}
      </div>

      {saved && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm text-center font-semibold">
          ✅ Profile updated successfully!
        </div>
      )}

      {/* ── Personal details ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-gray-800">Personal Details</h3>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-teal-600 text-sm font-bold hover:underline"
            >
              ✏️ Edit
            </button>
          )}
        </div>

        {editing ? (
          <>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <input type="text" value={form.full_name} onChange={set('full_name')} className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Age</label>
                <input type="number" min={1} max={120} value={form.age} onChange={set('age')} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Gender</label>
                <select value={form.gender} onChange={set('gender')} className={inputClass}>
                  <option value="">Select…</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                County / Location
              </label>
              <select value={form.location} onChange={set('location')} className={inputClass}>
                <option value="">Select county…</option>
                {KENYAN_COUNTIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">⚠️ {error}</p>}

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => { setEditing(false); setError('') }}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </>
        ) : (
          <dl className="space-y-3 text-sm">
            {[
              { label: 'Full Name', value: profile?.full_name },
              { label: 'Email', value: user?.email },
              { label: 'Age', value: profile?.age ? `${profile.age} years` : null },
              { label: 'Gender', value: profile?.gender?.replace(/_/g, ' ') },
              { label: 'Location', value: profile?.location ? `📍 ${profile.location}` : null },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <dt className="text-gray-400">{label}</dt>
                <dd className="text-gray-700 font-semibold capitalize">{value || '—'}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* ── Sign out ── */}
      <button
        onClick={handleLogout}
        className="w-full py-4 rounded-2xl border-2 border-red-200 text-red-500 font-bold hover:bg-red-50 active:scale-95 transition-all"
      >
        🚪 Sign Out
      </button>
    </main>
  )
}
