import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const categories = [
  { key: 'all', label: '✨ All' },
  { key: 'nutrition', label: '🥦 Nutrition', color: 'bg-green-100 text-green-700' },
  { key: 'exercise', label: '🏋️ Exercise', color: 'bg-blue-100 text-blue-700' },
  { key: 'sleep', label: '😴 Sleep', color: 'bg-indigo-100 text-indigo-700' },
  { key: 'mental_health', label: '🧠 Mental Health', color: 'bg-purple-100 text-purple-700' },
  { key: 'hygiene', label: '🧼 Hygiene', color: 'bg-cyan-100 text-cyan-700' },
  { key: 'general', label: '💊 General', color: 'bg-orange-100 text-orange-700' },
]

const catMap = Object.fromEntries(categories.map((c) => [c.key, c]))

const catEmoji = {
  nutrition: '🥦',
  exercise: '🏃',
  sleep: '😴',
  mental_health: '🧠',
  hygiene: '🧼',
  general: '💊',
}

export default function HealthTips() {
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [gender, setGender] = useState('all')
  const [kenyaOnly, setKenyaOnly] = useState(false)

  const fetchTips = useCallback(async () => {
    setLoading(true)
    let query = supabase.from('health_tips').select('*').limit(60)

    if (category !== 'all') query = query.eq('category', category)
    if (gender !== 'all')
      query = query.or(`target_gender.eq.${gender},target_gender.is.null`)
    if (kenyaOnly) query = query.eq('target_location', 'Kenya')

    const { data } = await query
    setTips(data || [])
    setLoading(false)
  }, [category, gender, kenyaOnly])

  useEffect(() => {
    fetchTips()
  }, [fetchTips])

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Health Tips</h1>
        <p className="text-gray-400">Expert-backed advice for a healthier, happier life</p>
      </div>

      {/* ── Filter panel ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 space-y-5">
        {/* Category */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  category === cat.key
                    ? (cat.color || 'bg-gray-200 text-gray-700') +
                      ' border-current shadow-sm scale-105'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gender + Kenya toggle */}
        <div className="flex flex-wrap gap-8 items-center">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Audience
            </p>
            <div className="flex gap-2">
              {[
                { key: 'all', label: '👤 Everyone' },
                { key: 'female', label: '♀️ Women' },
                { key: 'male', label: '♂️ Men' },
              ].map((g) => (
                <button
                  key={g.key}
                  onClick={() => setGender(g.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    gender === g.key
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Kenya toggle */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Location
            </p>
            <button
              onClick={() => setKenyaOnly(!kenyaOnly)}
              className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                kenyaOnly
                  ? 'bg-red-50 text-red-600 border-red-300'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-red-300'
              }`}
            >
              <span>🇰🇪 Kenya-specific only</span>
              <span
                className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${
                  kenyaOnly ? 'bg-red-400' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full bg-white shadow transition-transform ${
                    kenyaOnly ? 'translate-x-4' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Count */}
      {!loading && (
        <p className="text-sm text-gray-400 mb-5">
          Showing <strong className="text-gray-600">{tips.length}</strong> tip
          {tips.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="text-5xl animate-bounce mb-3">💡</div>
          <p className="text-gray-400">Loading tips…</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && tips.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🔎</div>
          <p>No tips match your filters.</p>
          <p className="text-sm mt-1">Try removing some filters.</p>
        </div>
      )}

      {/* Tips grid */}
      {!loading && tips.length > 0 && (
        <div className="grid md:grid-cols-2 gap-5">
          {tips.map((tip) => {
            const catInfo = catMap[tip.category]
            return (
              <div
                key={tip.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="shrink-0 w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xl">
                    {tip.target_location === 'Kenya'
                      ? '🇰🇪'
                      : catEmoji[tip.category] || '💡'}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Tip text */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {tip.tip_text}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {catInfo?.color && (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${catInfo.color}`}
                        >
                          {catInfo.label}
                        </span>
                      )}
                      {tip.target_gender === 'female' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-700">
                          ♀️ Women
                        </span>
                      )}
                      {tip.target_gender === 'male' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-700">
                          ♂️ Men
                        </span>
                      )}
                      {tip.target_location === 'Kenya' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600">
                          🇰🇪 Kenya
                        </span>
                      )}
                      <span className="ml-auto text-xs text-gray-400 truncate">
                        📚 {tip.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
