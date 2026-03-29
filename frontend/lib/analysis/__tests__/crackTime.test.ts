import { describe, it, expect } from 'vitest'
import { estimateCrackTime, formatCrackTime } from '../crackTime'

const GUESSES_PER_SECOND = 10_000_000_000

describe('estimateCrackTime', () => {
  it('computes brute force from charsetSize and length', () => {
    // charset=26, length=4 → 26^4 / 10B ≈ 4.57e-7 seconds
    const times = estimateCrackTime(26, 4, null)
    expect(times.bruteForceSeconds).toBeCloseTo(26 ** 4 / GUESSES_PER_SECOND, 10)
  })

  it('dictionary is faster when rank provided', () => {
    const times = estimateCrackTime(26, 8, 0)  // rank=0, first in list
    expect(times.dictionarySeconds).toBeCloseTo(1 / GUESSES_PER_SECOND, 15)
  })

  it('dictionary falls back to brute force when not in list', () => {
    const times = estimateCrackTime(94, 20, null)
    expect(times.dictionarySeconds).toBe(times.bruteForceSeconds)
  })

  it('rainbow is 1000x faster than brute force', () => {
    const times = estimateCrackTime(94, 12, null)
    expect(times.rainbowTableSeconds).toBeCloseTo(times.bruteForceSeconds * 0.001, 5)
  })

  it('worstCaseSeconds is the minimum of all three', () => {
    const times = estimateCrackTime(26, 8, 5)
    expect(times.worstCaseSeconds).toBe(Math.min(
      times.bruteForceSeconds,
      times.dictionarySeconds,
      times.rainbowTableSeconds
    ))
  })
})

describe('formatCrackTime', () => {
  it('formats sub-second as "< 1 second"', () => {
    expect(formatCrackTime(0.001)).toBe('< 1 second')
  })
  it('formats minutes', () => {
    expect(formatCrackTime(90)).toBe('2 minutes')   // 90s / 60 = 1.5 → rounds to 2
  })
  it('formats years', () => {
    expect(formatCrackTime(60 * 60 * 24 * 365 * 5)).toBe('5 years')
  })
  it('formats centuries', () => {
    expect(formatCrackTime(60 * 60 * 24 * 365 * 500)).toBe('centuries')
  })
})
