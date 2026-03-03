import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const SYMPTOMS = [
  'headache', 'cough', 'fever', 'fatigue', 'stomach pain', 'sore throat',
  'back pain', 'nausea', 'dizziness', 'insomnia', 'joint pain',
  'chest tightness', 'skin rash', 'anxiety', 'menstrual cramps', 'allergies',
]

const symptomEmojis = {
  headache: '🤕', cough: '🤧', fever: '🌡️', fatigue: '😴',
  'stomach pain': '🫃', 'sore throat': '😮‍💨', 'back pain': '🦴',
  nausea: '🤢', dizziness: '💫', insomnia: '🌙', 'joint pain': '🦵',
  'chest tightness': '💔', 'skin rash': '🔴', anxiety: '😰',
  'menstrual cramps': '🩺', allergies: '🌸',
}

const SEVERITY_LABELS = {
  1: 'Mild', 2: 'Mild', 3: 'Mild',
  4: 'Moderate', 5: 'Moderate', 6: 'Moderate',
  7: 'Severe', 8: 'Severe',
  9: 'Critical', 10: 'Critical',
}

const SEVERITY_COLORS = {
  1: 'text-green-600', 2: 'text-green-600', 3: 'text-green-600',
  4: 'text-yellow-600', 5: 'text-yellow-600', 6: 'text-yellow-600',
  7: 'text-orange-600', 8: 'text-orange-600',
  9: 'text-red-600', 10: 'text-red-600',
}

function nowLocal() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

export default function LogSymptom() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [symptom, setSymptom] = useState('')
  const [severity, setSeverity] = useState(5)
  const [notes, setNotes] = useState('')
  const [loggedAt, setLoggedAt] = useState(nowLocal)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const filteredSymptoms = SYMPTOMS.filter((s) =>
    s.includes(search.toLowerCase().trim())
  )

  const handleSave = async () => {
    if (!symptom) { setError('Please select a symptom first.'); return }
    setSaving(true)
    setError('')

    const { error: dbErr } = await supabase.from('symptom_logs').insert({
      user_id: user.id,
      symptom_name: symptom,
      severity,
      notes: notes.trim() || null,
      logged_at: new Date(loggedAt).toISOString(),
    })

    if (dbErr) {
      setError(dbErr.message)
      setSaving(false)
      return
    }

    setSuccess(true)
    setTimeout(() => navigate('/dashboard/remedies'), 1400)
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-5 animate-bounce">✅</div>
        <h2 className="text-xl font-extrabold text-gray-800">Symptom Logged!</h2>
        <p className="text-gray-400 mt-2">Finding remedy recommendations for you…</p>
      </div>
    )
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
      <h1 className="text-2xl font-extrabold text-gray-800">Log a Symptom</h1>

      {/* ── Step 1: Symptom ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-sm font-bold text-gray-700 mb-3">
          1. What's bothering you?
          {symptom && (
            <span className="ml-2 text-teal-600 capitalize">
              {symptomEmojis[symptom]} {symptom}
            </span>
          )}
        </p>
        <input
          type="text"
          placeholder="Search symptom…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 text-sm mb-3"
        />
        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
          {filteredSymptoms.map((s) => (
            <button
              key={s}
              onClick={() => setSymptom(s)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all text-left ${
                symptom === s
                  ? 'bg-teal-600 text-white border-teal-600 scale-[1.02] shadow-sm'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-teal-400 hover:bg-teal-50'
              }`}
            >
              <span>{symptomEmojis[s] || '🔵'}</span>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 2: Severity Slider ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-gray-700">2. How severe is it?</p>
          <span className={`text-sm font-extrabold ${SEVERITY_COLORS[severity]}`}>
            {severity}/10 — {SEVERITY_LABELS[severity]}
          </span>
        </div>

        {/* Gradient track */}
        <div
          className="h-3 rounded-full mb-2"
          style={{ background: 'linear-gradient(to right, #22c55e 0%, #eab308 40%, #f97316 70%, #ef4444 100%)' }}
        />
        <input
          type="range"
          min={1}
          max={10}
          value={severity}
          onChange={(e) => setSeverity(Number(e.target.value))}
          className="w-full -mt-7 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-gray-300
            [&::-webkit-slider-thumb]:shadow-md"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2 px-0.5">
          <span>1 Mild</span>
          <span>4 Moderate</span>
          <span>7 Severe</span>
          <span>10 Critical</span>
        </div>
      </div>

      {/* ── Step 3: Notes ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-sm font-bold text-gray-700 mb-3">
          3. Additional notes{' '}
          <span className="font-normal text-gray-400">(optional)</span>
        </p>
        <textarea
          rows={3}
          maxLength={500}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe how you're feeling in more detail…"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 text-sm resize-none"
        />
        <p className="text-xs text-gray-400 text-right mt-1">{notes.length}/500</p>
      </div>

      {/* ── Step 4: Date/time ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-sm font-bold text-gray-700 mb-3">4. When did this start?</p>
        <input
          type="datetime-local"
          value={loggedAt}
          onChange={(e) => setLoggedAt(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 text-sm"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving || !symptom}
        className="w-full bg-teal-600 hover:bg-teal-700 active:scale-95 disabled:opacity-40 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-teal-200 text-base"
      >
        {saving ? 'Saving…' : '💾 Save Symptom'}
      </button>
    </main>
  )
}
