import AnalyzerPanel from '@/components/AnalyzerPanel'
import GeneratorPanel from '@/components/generator/GeneratorPanel'
import StatsPanel from '@/components/dashboard/StatsPanel'

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <section id="hero" className="max-w-2xl mx-auto px-4 pt-24 pb-8 text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono mb-4">
          100% Client-Side Analysis
        </div>
        <h1 className="text-5xl font-bold text-white leading-tight">
          Pass<span className="text-[var(--accent)]">Fort</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Real-time password strength analysis. Your password never leaves your device.
        </p>
      </section>

      <AnalyzerPanel />
      <GeneratorPanel />
      <StatsPanel />

      <footer className="text-center py-8 text-gray-600 text-sm">
        PassFort — Passwords analyzed locally · Stats are anonymous
      </footer>
    </main>
  )
}
