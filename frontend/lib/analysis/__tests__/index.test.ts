import { describe, it, expect } from 'vitest'
import { analyzePassword } from '../index'

describe('analyzePassword', () => {
  it('returns score 0 for empty password', () => {
    expect(analyzePassword('', []).score).toBe(0)
  })

  it('score is always clamped to [0, 100]', () => {
    // Very weak password with many penalties should not go below 0
    const result = analyzePassword('aaa', ['aaa'])
    expect(result.score).toBeGreaterThanOrEqual(0)
    expect(result.score).toBeLessThanOrEqual(100)
  })

  it('penalises dictionary passwords by 20 points', () => {
    const withoutDict = analyzePassword('hello123', [])
    const inDict      = analyzePassword('hello123', ['hello123'])
    expect(inDict.score).toBeLessThan(withoutDict.score)
    expect(withoutDict.score - inDict.score).toBe(20)
  })

  it('gives bonus for all 4 charset classes', () => {
    const lower  = analyzePassword('helloworld', [])
    const full   = analyzePassword('Helloworld1!', [])
    expect(full.score).toBeGreaterThan(lower.score)
  })

  it('gives +10 bonus for length >= 16', () => {
    const short = analyzePassword('Hello123!World', [])     // 14 chars
    const long  = analyzePassword('Hello123!World@XY', [])  // 17 chars
    expect(long.score).toBeGreaterThan(short.score)
  })

  it('inDictionary flag is true when password in list', () => {
    const result = analyzePassword('password', ['password'])
    expect(result.inDictionary).toBe(true)
  })

  it('inDictionary is case-insensitive', () => {
    const result = analyzePassword('PASSWORD', ['password'])
    expect(result.inDictionary).toBe(true)
  })
})
