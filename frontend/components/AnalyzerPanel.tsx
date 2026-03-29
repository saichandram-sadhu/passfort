'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PasswordInput from './PasswordInput'
import StrengthMeter from './StrengthMeter'
import EntropyDisplay from './EntropyDisplay'
import CrackTimeDisplay from './CrackTimeDisplay'
import PatternList from './PatternList'
import SuggestionList from './SuggestionList'
import CharsetBadges from './CharsetBadges'
import { useDictionary } from '@/hooks/useDictionary'
import { usePasswordAnalysis } from '@/hooks/usePasswordAnalysis'

export default function AnalyzerPanel() {
  const [password, setPassword] = useState('')
  const { dictionary } = useDictionary()
  const result = usePasswordAnalysis(password, dictionary)

  return (
    <section id="analyzer" className="max-w-2xl mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-white">Analyze Your Password</h2>
        <p className="text-gray-400 text-sm">
          🔒 Your password never leaves your browser. Analysis is 100% local.
        </p>
      </div>

      <PasswordInput value={password} onChange={setPassword} />

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <StrengthMeter score={result.score} />
            <CharsetBadges flags={result.charsetInfo.flags} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <EntropyDisplay bits={result.entropyBits} />
              <CrackTimeDisplay crackTimes={result.crackTimes} />
            </div>
            {result.inDictionary && (
              <div className="bg-[var(--danger)]/10 border border-[var(--danger)]/40 rounded-xl p-4 text-sm text-[var(--danger)]">
                ⚠ This password was found in a common password list. Change it immediately.
              </div>
            )}
            <PatternList patterns={result.patterns} />
            <SuggestionList suggestions={result.suggestions} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
