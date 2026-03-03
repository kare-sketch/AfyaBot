import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const symptomEmojis = {
  headache: '🤕',
  cough: '🤧',
  fever: '🌡️',
  fatigue: '😴',
  'stomach pain': '🫃',
  'sore throat': '😮‍💨',
  'back pain': '🦴',
  nausea: '🤢',
  dizziness: '💫',
  insomnia: '🌙',
  'joint pain': '🦵',
  'chest tightness': '💔',
  'skin rash': '🔴',
  anxiety: '😰',
  'menstrual cramps': '🩺',
  allergies: '🌸',
}

const typeStyles = {
  natural: { bg: 'bg-green-100 text-green-700', icon: '🌿' },
  lifestyle: { bg: 'bg-blue-100 text-blue-700', icon: '⭐' },
  dietary: { bg: 'bg-yellow-100 text-yellow-700', icon: '🥗' },
  exercise: { bg: 'bg-purple-100 text-purple-700', icon: '🏃' },
}

const severityOptions = [
  { label: 'All', min: 1, max: 10, pill: 'bg-gray-100 text-gray-700 border-gray-300' },
  { label: '😊 Mild', min: 1, max: 4, pill: 'bg-green-100 text-green-700 border-green-300' },
  { label: '😐 Moderate', min: 4, max: 7, pill: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { label: '😣 Severe', min: 7, max: 10, pill: 'bg-red-100 text-red-700 border-red-300' },
]

export default function SymptomChecker() {
  const [searchParams] = useSearchParams()
  const [allSymptoms, setAllSymptoms] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(searchParams.get('symptom') || null)
  const [severity, setSeverity] = useState(severityOptions[0])
  const [remedies, setRemedies] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch unique symptoms list from DB
  useEffect(() => {
    supabase
      .from('remedies')
      .select('symptom_key')
      .then(({ data }) => {
        if (data) {
          const unique = [...new Set(data.map((r) => r.symptom_key))].sort()
          setAllSymptoms(unique)
        }
      })
  }, [])

  // Auto-select from URL query param
  useEffect(() => {
    const param = searchParams.get('symptom')
    if (param) setSelected(param)
  }, [searchParams])

  // Fetch remedies when symptom or severity changes
  useEffect(() => {
    if (!selected) return
    setLoading(true)
    supabase
      .from('remedies')
      .select('*')
      .eq('symptom_key', selected)
      .lte('severity_min', severity.max)
      .gte('severity_max', severity.min)
      .then(({ data }) => {
        setRemedies(data || [])
        setLoading(false)
      })
  }, [selected, severity])

  const handleSelect = (symptom) => {
    setSelected(symptom)
    setSeverity(severityOptions[0])
    setRemedies([])
  }

  const filtered = allSymptoms.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Symptom Checker</h1>
        <p className="text-gray-400">
          Select a symptom below to get evidence-based home remedies
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
        <input
          type="text"
          placeholder="Search symptoms…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700"
        />
      </div>

      {/* Symptom grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
        {filtered.map((symptom) => (
          <button
            key={symptom}
            onClick={() => handleSelect(symptom)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-left text-sm font-semibold capitalize transition-all ${
              selected === symptom
                ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-[1.03]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:bg-teal-50'
            }`}
          >
            <span className="text-xl">{symptomEmojis[symptom] || '🔵'}</span>
            {symptom}
          </button>
        ))}
      </div>

      {/* Remedies panel */}
      {selected ? (
        <div>
          {/* Section header + severity filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 capitalize">
              {symptomEmojis[selected]} Remedies for{' '}
              <span className="text-teal-600">{selected}</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {severityOptions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSeverity(s)}
                  className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all ${
                    severity.label === s.label
                      ? s.pill + ' border-2 shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-16">
              <div className="text-5xl animate-bounce mb-3">💊</div>
              <p className="text-gray-400">Loading remedies…</p>
            </div>
          )}

          {/* Empty */}
          {!loading && remedies.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">🔎</div>
              <p>No remedies found for this severity level.</p>
              <p className="text-sm mt-1">Try selecting "All" to see everything.</p>
            </div>
          )}

          {/* Remedy cards */}
          {!loading && remedies.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5">
              {remedies.map((remedy) => {
                const style = typeStyles[remedy.remedy_type] || {
                  bg: 'bg-gray-100 text-gray-600',
                  icon: '💊',
                }
                return (
                  <div
                    key={remedy.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
                  >
                    {/* Title + type badge */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-bold text-gray-800 leading-snug">
                        {remedy.remedy_title}
                      </h3>
                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold capitalize ${style.bg}`}
                      >
                        {style.icon} {remedy.remedy_type}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {remedy.remedy_description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                      <span className="truncate max-w-[60%]">📚 {remedy.source}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold ${
                          remedy.severity_max >= 8
                            ? 'bg-red-50 text-red-500'
                            : remedy.severity_max >= 5
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'bg-green-50 text-green-600'
                        }`}
                      >
                        Severity {remedy.severity_min}–{remedy.severity_max}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-10 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex gap-3">
            <span className="text-xl shrink-0">⚠️</span>
            <p className="text-amber-700 text-sm">
              <strong>Important:</strong> These remedies are for general information only. If
              symptoms are severe, persistent, or worsening — please visit your nearest health
              facility. Kenya Emergency Line:{' '}
              <strong>0800 723 253</strong> (free, 24/7).
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-300">
          <div className="text-7xl mb-4">☝️</div>
          <p className="text-xl font-semibold text-gray-400">
            Select a symptom above to get started
          </p>
        </div>
      )}
    </main>
  )
}
