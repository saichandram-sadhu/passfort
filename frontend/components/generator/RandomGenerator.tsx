'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { generateRandom } from '@/lib/generator/random'
import type { CharsetFlags } from '@/lib/analysis'

export default function RandomGenerator() {
  const [length, setLength] = useState(16)
  const [flags, setFlags] = useState<CharsetFlags>({ lower: true, upper: true, digit: true, symbol: true })
  const [generated, setGenerated] = useState('')

  const generate = () => setGenerated(generateRandom(length, flags))
  const toggle = (k: keyof CharsetFlags) => setFlags(f => ({ ...f, [k]: !f[k] }))

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Length</span>
          <span className="font-mono text-white">{length}</span>
        </div>
        <input
          type="range" min={12} max={64} value={length}
          onChange={e => setLength(+e.target.value)}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['lower', 'upper', 'digit', 'symbol'] as const).map(k => (
          <button
            key={k}
            onClick={() => toggle(k)}
            className={`px-3 py-1 rounded-full text-xs border transition-all ${
              flags[k]
                ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]'
                : 'bg-transparent border-[#2a2a3a] text-gray-500'
            }`}
          >
            {k === 'lower' ? 'a-z' : k === 'upper' ? 'A-Z' : k === 'digit' ? '0-9' : '!@#'}
          </button>
        ))}
      </div>

      <button
        onClick={generate}
        className="w-full bg-[var(--accent)] text-black font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
      >
        Generate Password
      </button>

      {generated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-[var(--surface)] rounded-xl px-4 py-3 font-mono text-[var(--accent)] text-sm break-all border border-[var(--accent)]/30"
        >
          {generated}
          <button
            onClick={() => navigator.clipboard.writeText(generated)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white transition-colors"
          >
            Copy
          </button>
        </motion.div>
      )}
    </div>
  )
}
