'use client'
import type { Pattern } from '@/lib/analysis'

interface Props { patterns: Pattern[] }

export default function PatternList({ patterns }: Props) {
  if (!patterns.length) return null

  return (
    <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--danger)]/30 space-y-2">
      <div className="text-xs text-[var(--danger)]">⚠ Patterns Detected</div>
      {patterns.map((p, i) => (
        <div key={i} className="text-sm text-gray-300 flex gap-2">
          <span className="text-[var(--danger)]">•</span>
          {p.description}
        </div>
      ))}
    </div>
  )
}
