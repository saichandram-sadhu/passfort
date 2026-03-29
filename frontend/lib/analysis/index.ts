import { analyzeCharset } from './charset'
import { calculateEntropy } from './entropy'
import { estimateCrackTime } from './crackTime'
import { detectPatterns } from './patterns'
import { generateSuggestions } from './suggestions'
import type { AnalysisResult } from './types'

export function analyzePassword(password: string, dictionary: string[]): AnalysisResult {
  if (!password) {
    return {
      score: 0, entropyBits: 0,
      charsetInfo: { flags: { upper: false, lower: false, digit: false, symbol: false }, size: 0 },
      crackTimes: { bruteForceSeconds: 0, dictionarySeconds: 0, rainbowTableSeconds: 0, worstCaseSeconds: 0 },
      patterns: [], suggestions: [], inDictionary: false,
    }
  }

  const charsetInfo   = analyzeCharset(password)
  const entropyBits   = calculateEntropy(password, charsetInfo.size)
  const lowerPassword = password.toLowerCase()
  const dictIndex     = dictionary.indexOf(lowerPassword)
  const inDictionary  = dictIndex !== -1
  const crackTimes    = estimateCrackTime(charsetInfo.size, password.length, inDictionary ? dictIndex : null)
  const patterns      = detectPatterns(password, dictionary)

  // Score formula (0–100, clamped)
  const base      = Math.min((entropyBits / 128) * 100, 60)
  const bonuses   = (charsetInfo.flags.upper  ? 10 : 0)
                  + (charsetInfo.flags.digit  ? 10 : 0)
                  + (charsetInfo.flags.symbol ? 10 : 0)
                  + (password.length >= 16    ? 10 : 0)
  const penalties = (inDictionary ? 20 : 0) + Math.min(patterns.length * 10, 30)
  const score     = Math.round(Math.max(0, Math.min(100, base + bonuses - penalties)))

  const partial: AnalysisResult = {
    score, entropyBits, charsetInfo, crackTimes, patterns, inDictionary, suggestions: [],
  }

  return { ...partial, suggestions: generateSuggestions(partial) }
}

export { formatCrackTime } from './crackTime'
export { entropyTier } from './entropy'
export type { AnalysisResult, Pattern, CharsetFlags, CrackTimes } from './types'
