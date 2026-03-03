import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const symptomEmojis = {
  headache: '🤕', cough: '🤧', fever: '🌡️', fatigue: '😴',
  'stomach pain': '🫃', 'sore throat': '😮‍💨', 'back pain': '🦴',
  nausea: '🤢', dizziness: '💫', insomnia: '🌙', 'joint pain': '🦵',
  'chest tightness': '💔', 'skin rash': '🔴', anxiety: '😰',
  'menstrual cramps': '🩺', allergies: '🌸',
}

const severityMeta = (s) => {
  if (s <= 3) return { label: 'Mild', cls: 'bg-green-100 text-green-700' }
  if (s <= 6) return { label: 'Moderate', cls: 'bg-yellow-100 text-yellow-700' }
  if (s <= 8) return { label: 'Severe', cls: 'bg-orange-100 text-orange-700' }
  return { label: 'Critical', cls: 'bg-red-100 text-red-700' }
}

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-100 rounded-xl ${className}`} />
}

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [recentLogs, setRecentLogs] = useState([])
  const [stats, setStats] = useState({ total: 0, topSymptom: null, avgSeverity: null })
  const [healthTip, setHealthTip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) loadAll()
  }, [user, profile])

  async function loadAll() {
    setLoading(true)
    await Promise.all([loadLogs(), loadHealthTip()])
    setLoading(false)
  }

  async function loadLogs() {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // Recent 3 for display
    const { data: recent } = await supabase
      .from('symptom_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
      .limit(3)
    setRecentLogs(recent || [])

    // All this week for stats
    const { data: week } = await supabase
      .from('symptom_logs')
      .select('symptom_name, severity')
      .eq('user_id', user.id)
      .gte('logged_at', oneWeekAgo.toISOString())

    if (week?.length) {
      const counts = week.reduce((acc, l) => {
        acc[l.symptom_name] = (acc[l.symptom_name] || 0) + 1
        return acc
      }, {})
      const topSymptom = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
      const avgSeverity = Math.round(week.reduce((s, l) => s + l.severity, 0) / week.length)
      setStats({ total: week.length, topSymptom, avgSeverity })
    }
  }

  async function loadHealthTip() {
    let query = supabase.from('health_tips').select('*')

    // Filter by user's gender if known
    if (profile?.gender && profile.gender !== 'prefer_not_to_say' && profile.gender !== 'other') {
      query = query.or(`target_gender.is.null,target_gender.eq.${profile.gender}`)
    } else {
      query = query.is('target_gender', null)
    }

    // Filter by age range
    if (profile?.age) {
      query = query.lte('target_age_min', profile.age).gte('target_age_max', profile.age)
    }

    const { data } = await query.limit(50)
    if (data?.length) {
      setHealthTip(data[Math.floor(Math.random() * data.length)])
    }
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-KE', {
      weekday: 'short', day: 'numeric', month: 'short',
    })

  return (
    <main className="max-w-lg mx-auto px-4 py-6 space-y-5">

      {/* ── Personalised Health Tip Banner ── */}
      {loading ? (
        <Skeleton className="h-32 w-full" />
      ) : healthTip ? (
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-teal-200">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-100 mb-2">
            💡 Today's Health Tip
          </p>
          <p className="text-sm leading-relaxed">{healthTip.tip_text}</p>
          <p className="text-teal-200 text-xs mt-3">📚 {healthTip.source}</p>
        </div>
      ) : null}

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-3 gap-3">
        {loading ? (
          [1, 2, 3].map((i) => <Skeleton key={i} className="h-20" />)
        ) : (
          <>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-extrabold text-teal-600">{stats.total}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">Logs this week</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
              <p className="text-lg font-extrabold text-gray-700 truncate capitalize">
                {stats.topSymptom
                  ? (symptomEmojis[stats.topSymptom] || '🔵') + ' ' + stats.topSymptom.split(' ')[0]
                  : '—'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">Top symptom</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-extrabold text-orange-500">
                {stats.avgSeverity ?? '—'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">Avg severity</p>
            </div>
          </>
        )}
      </div>

      {/* ── Recent Logs ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-gray-800">Recent Logs</h2>
          <Link to="/dashboard/history" className="text-xs text-teal-600 font-bold">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
          </div>
        ) : recentLogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="text-5xl mb-3">📋</div>
            <p className="text-gray-500 font-semibold">No symptoms logged yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Tap the <strong className="text-teal-600">+</strong> button below to log your first symptom
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentLogs.map((log) => {
              const meta = severityMeta(log.severity)
              return (
                <div
                  key={log.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
                >
                  <span className="text-3xl">{symptomEmojis[log.symptom_name] || '🔵'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 capitalize">{log.symptom_name}</p>
                    <p className="text-xs text-gray-400">{formatDate(log.logged_at)}</p>
                    {log.notes && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">{log.notes}</p>
                    )}
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${meta.cls}`}>
                    {log.severity}/10 {meta.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Remedies shortcut ── */}
      <Link
        to="/dashboard/remedies"
        className="flex items-center gap-4 bg-orange-50 border border-orange-100 rounded-2xl p-4 hover:shadow-md transition-shadow"
      >
        <span className="text-3xl">🌿</span>
        <div>
          <p className="font-bold text-orange-700 text-sm">View Remedy Recommendations</p>
          <p className="text-orange-400 text-xs mt-0.5">
            Based on your most recent logged symptom
          </p>
        </div>
        <span className="ml-auto text-orange-400 text-xl">›</span>
      </Link>
    </main>
  )
}
