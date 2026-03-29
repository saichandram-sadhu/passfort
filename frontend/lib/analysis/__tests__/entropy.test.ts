import { describe, it, expect } from 'vitest'
import { calculateEntropy, entropyTier } from '../entropy'

describe('calculateEntropy', () => {
  it('returns 0 for empty password', () => {
    expect(calculateEntropy('', 0)).toBe(0)
  })

  it('calculates correctly for lowercase-only', () => {
    // length=5, charsetSize=26 → 5 * log2(26) ≈ 23.5
    const bits = calculateEntropy('hello', 26)
    expect(bits).toBeCloseTo(23.5, 0)
  })

  it('calculates correctly for full 94-charset', () => {
    // length=8, charsetSize=94 → 8 * log2(94) ≈ 52.4
    const bits = calculateEntropy('H3llo!#X', 94)
    expect(bits).toBeCloseTo(52.4, 0)
  })

  it('entropy scales linearly with length', () => {
    const short = calculateEntropy('abc', 26)
    const long  = calculateEntropy('abcabc', 26)
    expect(long).toBeCloseTo(short * 2, 1)
  })
})

describe('entropyTier', () => {
  it('returns weak for < 28 bits', () => {
    expect(entropyTier(20)).toBe('weak')
  })
  it('returns fair for 28–35 bits', () => {
    expect(entropyTier(30)).toBe('fair')
  })
  it('returns good for 36–59 bits', () => {
    expect(entropyTier(50)).toBe('good')
  })
  it('returns strong for >= 60 bits', () => {
    expect(entropyTier(60)).toBe('strong')
    expect(entropyTier(80)).toBe('strong')
  })
})
