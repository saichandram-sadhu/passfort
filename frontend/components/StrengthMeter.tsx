'use client'
import { motion } from 'framer-motion'

interface Props { score: number }

function scoreColor(score: number): string {
  if (score < 25) return 'var(--score-1)'
  if (score < 50) return 'var(--score-2)'
  if (score < 70) return 'var(--score-3)'
  if (score < 90) return 'var(--score-4)'
  return 'var(--score-5)'
}

function scoreLabel(score: number): string {
  if (score < 25) return 'Weak'
  if (score < 50) return 'Fair'
  if (score < 70) return 'Good'
  if (score < 90) return 'Strong'
  return 'Very Strong'
}

export default function StrengthMeter({ score }: Props) {
  const color = scoreColor(score)
  const label = scoreLabel(score)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Strength</span>
        <span className="font-semibold" style={{ color }}>{label}</span>
      </div>
      <div className="h-2 bg-[#1a1a28] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
