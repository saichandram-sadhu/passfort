'use client'
import type { CharsetFlags } from '@/lib/analysis'

interface Props { flags: CharsetFlags }

const BADGES = [
  { key: 'lower'  as const, label: 'a-z' },
  { key: 'upper'  as const, label: 'A-Z' },
  { key: 'digit'  as const, label: '0-9' },
  { key: 'symbol' as const, label: '!@#' },
]

export default function CharsetBadges({ flags }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {BADGES.map(({ key, label }) => (
        <span
          key={key}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
            flags[key]
              ? 'bg-[var(--accent)]/10 border-[var(--accent)]/40 text-[var(--accent)]'
              : 'bg-[var(--surface)] border-[#2a2a3a] text-gray-600'
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
