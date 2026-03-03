import { Link } from 'react-router-dom'

const features = [
  {
    emoji: '📝',
    title: 'Track Symptoms',
    desc: 'Log symptoms with a 1–10 severity slider and optional notes. Backdate entries so your history is always accurate.',
    bg: 'bg-teal-50',
    iconBg: 'bg-teal-100',
  },
  {
    emoji: '🌿',
    title: 'Get Remedies',
    desc: 'Instantly receive evidence-based home remedies — natural, dietary, lifestyle, and exercise — matched to your symptom and severity.',
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-100',
  },
  {
    emoji: '💡',
    title: 'Stay Informed',
    desc: 'Get a personalised daily health tip based on your age, gender, and location — sourced from WHO, Mayo Clinic, and Kenyan health guidelines.',
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
  },
]

const symptoms = [
  { emoji: '🤕', name: 'Headache' },
  { emoji: '🌡️', name: 'Fever' },
  { emoji: '🤧', name: 'Cough' },
  { emoji: '😴', name: 'Fatigue' },
  { emoji: '🤢', name: 'Nausea' },
  { emoji: '😰', name: 'Anxiety' },
]

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-orange-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="/logo.png"
            alt="AfyaBot"
            className="h-36 w-36 mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Your Personal{' '}
            <span className="text-teal-600">Health Companion</span>
          </h1>
          <p className="text-lg text-gray-500 mb-2">
            <span className="font-bold text-orange-500">Afya yako, kwanza!</span>{' '}
            — Your health, first!
          </p>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Track symptoms, get evidence-based home remedies, and receive personalised
            health tips — built for Kenyans, available 24/7.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-teal-200 text-base"
            >
              Get Started — It's Free
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-50 active:scale-95 text-gray-700 font-bold px-8 py-4 rounded-full transition-all shadow-md border border-gray-200 text-base"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-2">
            How AfyaBot Works
          </h2>
          <p className="text-gray-400 text-center mb-10 text-sm">
            Three simple steps to better health management
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`${f.bg} rounded-2xl p-6 border border-gray-100`}
              >
                <div
                  className={`w-12 h-12 ${f.iconBg} rounded-full flex items-center justify-center mb-4 text-2xl`}
                >
                  {f.emoji}
                </div>
                <h3 className="font-extrabold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Symptoms preview ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            16 Symptoms Covered
          </h2>
          <p className="text-gray-400 text-sm mb-10">
            From everyday aches to anxiety — AfyaBot has curated remedies for all of them
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-lg mx-auto mb-8">
            {symptoms.map((s) => (
              <div
                key={s.name}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center"
              >
                <div className="text-2xl mb-1">{s.emoji}</div>
                <p className="text-xs font-semibold text-gray-600">{s.name}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mb-6">…and headache, back pain, insomnia, joint pain, and more</p>
          <Link
            to="/signup"
            className="inline-block bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-teal-200"
          >
            Start Tracking Today →
          </Link>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="py-6 px-4 bg-amber-50 border-t border-amber-100">
        <p className="text-center text-amber-700 text-xs max-w-2xl mx-auto">
          ⚠️ <strong>Medical Disclaimer:</strong> AfyaBot provides general health information only
          and is not a substitute for professional medical advice. Always consult a qualified
          healthcare provider for medical decisions.
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-teal-700 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="AfyaBot" className="h-8 w-8 rounded-full" />
            <span className="font-extrabold">AfyaBot</span>
          </div>
          <p className="text-teal-200 text-xs">Built with ❤️ for healthier Kenyan communities</p>
          <p className="text-teal-300 text-xs">
            Emergency: <strong className="text-white">0800 723 253</strong>
          </p>
        </div>
      </footer>
    </main>
  )
}
