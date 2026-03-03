import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow p-3 text-xs">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-teal-600">Avg severity: <strong>{payload[0].value}</strong>/10</p>
      </div>
    )
  }
  return null
}

export default function History() {
  const { user } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (user) fetchLogs()
  }, [user])

  async function fetchLogs() {
    setLoading(true)
    const { data } = await supabase
      .from('symptom_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
    setLogs(data || [])
    setLoading(false)
  }

  const uniqueSymptoms = [...new Set(logs.map((l) => l.symptom_name))]
  const filtered = filter === 'all' ? logs : logs.filter((l) => l.symptom_name === filter)

  // Build chart data: average severity per day (last 14 unique days)
  const chartData = (() => {
    const byDay = {}
    ;[...logs].reverse().forEach((l) => {
      const day = new Date(l.logged_at).toLocaleDateString('en-KE', {
        day: 'numeric', month: 'short',
      })
      if (!byDay[day]) byDay[day] = []
      byDay[day].push(l.severity)
    })
    return Object.entries(byDay)
      .slice(-14)
      .map(([day, vals]) => ({
        day,
        avg: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
      }))
  })()

  const formatTimestamp = (d) =>
    new Date(d).toLocaleString('en-KE', {
      weekday: 'short', day: 'numeric', month: 'short',
      hour: '2-digit', minute: '2-digit',
    })

  return (
    <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-800">Symptom History</h1>

      {/* ── Severity Chart ── */}
      {!loading && chartData.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-bold text-gray-700 mb-4">Severity Trend (last 30 days)</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis domain={[1, 10]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#0d9488"
                strokeWidth={2.5}
                dot={{ fill: '#0d9488', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Symptom Filter ── */}
      {!loading && uniqueSymptoms.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              filter === 'all'
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300'
            }`}
          >
            All
          </button>
          {uniqueSymptoms.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border capitalize transition-all ${
                filter === s
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300'
              }`}
            >
              {symptomEmojis[s]} {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Timeline ── */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-20 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-14 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-gray-500 font-semibold">No logs yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Tap <strong className="text-teal-600">+</strong> to log your first symptom
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((log) => {
            const meta = severityMeta(log.severity)
            return (
              <div
                key={log.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-4"
              >
                <div className="text-2xl mt-0.5 shrink-0">
                  {symptomEmojis[log.symptom_name] || '🔵'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-bold text-gray-800 capitalize">{log.symptom_name}</p>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${meta.cls}`}>
                      {log.severity}/10 — {meta.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{formatTimestamp(log.logged_at)}</p>
                  {log.notes && (
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{log.notes}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
