'use client'
import { useEffect, useState } from 'react'
import { getStats } from '@/lib/api'
import type { GlobalStats } from '@/lib/api'

export default function StatsPanel() {
  const [stats, setStats] = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats().then(s => {
      setStats(s)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <section id="stats" className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-600">
        Loading stats...
      </section>
    )
  }

  if (!stats) return null

  return (
    <section id="stats" className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-white">Global Anonymous Stats</h2>
        <p className="text-gray-400 text-sm">Anonymized — no passwords stored, ever</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Analyzed',   value: stats.total_analyzed.toLocaleString(), unit: '' },
          { label: 'Avg Score',  value: stats.avg_score.toFixed(1),            unit: '/100' },
          { label: 'Avg Length', value: stats.avg_length.toFixed(1),           unit: ' chars' },
        ].map(({ label, value, unit }) => (
          <div key={label} className="bg-[var(--surface)] rounded-2xl p-5 border border-[#2a2a3a] text-center">
            <div className="text-2xl font-mono font-bold text-[var(--accent)]">
              {value}<span className="text-sm text-gray-500">{unit}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
