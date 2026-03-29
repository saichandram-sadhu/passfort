'use client'
import { entropyTier } from '@/lib/analysis'

interface Props { bits: number }

const TIER_COLORS: Record<string, string> = {
  weak:   'var(--score-1)',
  fair:   'var(--score-3)',
  good:   'var(--score-4)',
  strong: 'var(--score-5)',
}

export default function EntropyDisplay({ bits }: Props) {
  const tier = entropyTier(bits)
  const color = TIER_COLORS[tier]

  return (
    <div className="bg-[var(--surface)] rounded-xl p-4 border border-[#2a2a3a]">
      <div className="text-xs text-gray-500 mb-1">Entropy</div>
      <div className="text-2xl font-mono font-bold" style={{ color }}>
        {bits.toFixed(1)} <span className="text-sm font-normal text-gray-400">bits</span>
      </div>
      <div className="text-xs capitalize mt-1" style={{ color }}>{tier}</div>
    </div>
  )
}
