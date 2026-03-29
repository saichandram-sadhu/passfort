'use client'
import { useState } from 'react'
import RandomGenerator from './RandomGenerator'
import PassphraseGenerator from './PassphraseGenerator'

export default function GeneratorPanel() {
  const [mode, setMode] = useState<'random' | 'passphrase'>('random')

  return (
    <section id="generator" className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-white">Generate Strong Password</h2>
        <p className="text-gray-400 text-sm">Cryptographically secure — generated in your browser</p>
      </div>

      <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[#2a2a3a] space-y-6">
        <div className="flex bg-[#0d0d16] rounded-xl p-1 gap-1">
          {(['random', 'passphrase'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                mode === m ? 'bg-[var(--accent)] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {mode === 'random' ? <RandomGenerator /> : <PassphraseGenerator />}
      </div>
    </section>
  )
}
