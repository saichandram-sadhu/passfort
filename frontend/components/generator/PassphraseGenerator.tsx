'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { generatePassphrase } from '@/lib/generator/passphrase'

export default function PassphraseGenerator() {
  const [wordCount, setWordCount] = useState(5)
  const [separator, setSeparator] = useState('-')
  const [generated, setGenerated] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    const phrase = await generatePassphrase(wordCount, separator)
    setGenerated(phrase)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Words</span>
          <span className="font-mono text-white">{wordCount}</span>
        </div>
        <input
          type="range" min={4} max={8} value={wordCount}
          onChange={e => setWordCount(+e.target.value)}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <div className="flex gap-2">
        {['-', '.', '_', ' '].map(sep => (
          <button
            key={sep}
            onClick={() => setSeparator(sep)}
            className={`px-3 py-1 rounded-lg text-sm font-mono border transition-all ${
              separator === sep
                ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]'
                : 'border-[#2a2a3a] text-gray-500'
            }`}
          >
            {sep === ' ' ? '·space' : sep}
          </button>
        ))}
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="w-full bg-[var(--accent)] text-black font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Passphrase'}
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
