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

const typeStyles = {
  natural:   { bg: 'bg-green-100 text-green-700',  icon: '🌿' },
  lifestyle: { bg: 'bg-blue-100 text-blue-700',    icon: '⭐' },
  dietary:   { bg: 'bg-yellow-100 text-yellow-700', icon: '🥗' },
  exercise:  { bg: 'bg-purple-100 text-purple-700', icon: '🏃' },
}

const severityMeta = (s) => {
  if (s <= 3) return { label: 'Mild', cls: 'bg-green-100 text-green-700' }
  if (s <= 6) return { label: 'Moderate', cls: 'bg-yellow-100 text-yellow-700' }
  if (s <= 8) return { label: 'Severe', cls: 'bg-orange-100 text-orange-700' }
  return { label: 'Critical', cls: 'bg-red-100 text-red-700' }
}

function RemedyCard({ remedy }) {
  const style = typeStyles[remedy.remedy_type] || { bg: 'bg-gray-100 text-gray-600', icon: '💊' }
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-gray-800 leading-snug">{remedy.remedy_title}</h3>
        <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold capitalize ${style.bg}`}>
          {style.icon} {remedy.remedy_type}
        </span>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-3">{remedy.remedy_description}</p>
      <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
        <span className="truncate max-w-[65%]">📚 {remedy.source}</span>
        <span className={`px-2 py-0.5 rounded-full font-bold ${
          remedy.severity_max >= 8 ? 'bg-red-50 text-red-500' :
          remedy.severity_max >= 5 ? 'bg-yellow-50 text-yellow-600' :
          'bg-green-50 text-green-600'
        }`}>
          Severity {remedy.severity_min}–{remedy.severity_max}
        </span>
      </div>
    </div>
  )
}

export default function Remedies() {
  const { user } = useAuth()
  const [recentLog, setRecentLog] = useState(null)
  const [remedies, setRemedies] = useState([])
  const [wellness, setWellness] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  async function fetchData() {
    setLoading(true)

    // Most recent symptom log
    const { data: logs } = await supabase
      .from('symptom_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
      .limit(1)

    if (logs?.length) {
      const log = logs[0]
      setRecentLog(log)

      // Remedies matching symptom + severity range
      const { data: rems } = await supabase
        .from('remedies')
        .select('*')
        .eq('symptom_key', log.symptom_name)
        .lte('severity_min', log.severity)
        .gte('severity_max', log.severity)
      setRemedies(rems || [])
    }

    // General wellness suggestions (always shown at bottom)
    const { data: gen } = await supabase
      .from('remedies')
      .select('*')
      .eq('symptom_key', 'fatigue')
      .lte('severity_min', 3)
      .limit(3)
    setWellness(gen || [])

    setLoading(false)
  }

  const formatDate = (d) =>
    new Date(d).toLocaleString('en-KE', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    })

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl animate-bounce mb-4">🌿</div>
        <p className="text-gray-400">Loading recommendations…</p>
      </div>
    )
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-800">Remedy Recommendations</h1>

      {recentLog ? (
        <>
          {/* Context card */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
            <span className="text-3xl">{symptomEmojis[recentLog.symptom_name] || '🔵'}</span>
            <div className="flex-1">
              <p className="text-xs text-amber-600 font-bold mb-0.5">Based on your last log</p>
              <p className="font-extrabold text-gray-800 capitalize">{recentLog.symptom_name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${severityMeta(recentLog.severity).cls}`}>
                  Severity {recentLog.severity}/10 — {severityMeta(recentLog.severity).label}
                </span>
                <span className="text-xs text-gray-400">{formatDate(recentLog.logged_at)}</span>
              </div>
            </div>
          </div>

          {/* Matched remedies */}
          {remedies.length > 0 ? (
            <div className="space-y-4">
              {remedies.map((r) => <RemedyCard key={r.id} remedy={r} />)}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
              <div className="text-4xl mb-3">🔎</div>
              <p className="text-gray-500 font-medium">No specific remedies found for this severity level.</p>
              <p className="text-gray-400 text-sm mt-1">Try logging a different severity or symptom.</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex gap-3">
            <span className="text-xl shrink-0">⚠️</span>
            <p className="text-amber-700 text-sm leading-relaxed">
              <strong>Important:</strong> If your symptoms are severe, persistent, or worsening, please
              visit your nearest health facility immediately.
              Kenya Emergency: <strong>0800 723 253</strong> (free, 24/7).
            </p>
          </div>
        </>
      ) : (
        /* No logs yet */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500 font-semibold mb-2">No symptoms logged yet</p>
            <p className="text-gray-400 text-sm mb-6">
              Log a symptom first to get personalised remedy recommendations.
            </p>
            <Link
              to="/dashboard/log"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Log First Symptom
            </Link>
          </div>

          {/* General wellness */}
          {wellness.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-700 mb-4">General Wellness Tips</h2>
              <div className="space-y-4">
                {wellness.map((r) => <RemedyCard key={r.id} remedy={r} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
