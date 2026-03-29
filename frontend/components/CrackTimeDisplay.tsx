'use client'
import { formatCrackTime } from '@/lib/analysis'
import type { CrackTimes } from '@/lib/analysis'

interface Props { crackTimes: CrackTimes }

const rows = [
  { label: 'Brute Force',   key: 'bruteForceSeconds'   },
  { label: 'Dictionary',    key: 'dictionarySeconds'   },
  { label: 'Rainbow Table', key: 'rainbowTableSeconds' },
] as const

export default function CrackTimeDisplay({ crackTimes }: Props) {
  return (
    <div className="bg-[var(--surface)] rounded-xl p-4 border border-[#2a2a3a] space-y-3">
      <div className="text-xs text-gray-500">Estimated Crack Time</div>
      {rows.map(({ label, key }) => (
        <div key={key} className="flex justify-between items-center text-sm">
          <span className="text-gray-400">{label}</span>
          <span className="font-mono text-white">{formatCrackTime(crackTimes[key])}</span>
        </div>
      ))}
    </div>
  )
}
