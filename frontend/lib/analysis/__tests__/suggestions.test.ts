import { describe, it, expect } from 'vitest'
import { generateSuggestions } from '../suggestions'
import type { AnalysisResult } from '../types'

const base: AnalysisResult = {
  score: 50, entropyBits: 40,
  charsetInfo: { flags: { upper: true, lower: true, digit: true, symbol: false }, size: 62 },
  crackTimes: { bruteForceSeconds: 1e6, dictionarySeconds: 1e6, rainbowTableSeconds: 1e3, worstCaseSeconds: 1e3 },
  patterns: [], suggestions: [], inDictionary: false,
}

describe('generateSuggestions', () => {
  it('suggests adding symbols when missing', () => {
    const tips = generateSuggestions(base)
    expect(tips.some(t => t.toLowerCase().includes('symbol'))).toBe(true)
  })

  it('suggests longer password when entropy < 36', () => {
    const weak = { ...base, entropyBits: 20, score: 20 }
    const tips = generateSuggestions(weak)
    expect(tips.some(t => t.toLowerCase().includes('longer') || t.toLowerCase().includes('length'))).toBe(true)
  })

  it('warns about dictionary word', () => {
    const tips = generateSuggestions({ ...base, inDictionary: true })
    expect(tips.some(t => t.toLowerCase().includes('common'))).toBe(true)
  })

  it('returns empty array for a strong password', () => {
    const strong: AnalysisResult = {
      ...base, score: 95, entropyBits: 80,
      charsetInfo: { flags: { upper: true, lower: true, digit: true, symbol: true }, size: 94 },
      inDictionary: false, patterns: [],
    }
    expect(generateSuggestions(strong)).toHaveLength(0)
  })
})
