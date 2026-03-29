import { describe, it, expect } from 'vitest'
import { analyzeCharset } from '../charset'

describe('analyzeCharset', () => {
  it('detects lowercase only', () => {
    const result = analyzeCharset('hello')
    expect(result.flags).toEqual({ upper: false, lower: true, digit: false, symbol: false })
    expect(result.size).toBe(26)
  })

  it('detects mixed lower + upper', () => {
    const result = analyzeCharset('Hello')
    expect(result.flags.upper).toBe(true)
    expect(result.flags.lower).toBe(true)
    expect(result.size).toBe(52)
  })

  it('detects all four classes', () => {
    const result = analyzeCharset('H3llo!#')
    expect(result.flags).toEqual({ upper: true, lower: true, digit: true, symbol: true })
    expect(result.size).toBe(94)
  })

  it('returns size 10 for digits only', () => {
    const result = analyzeCharset('12345')
    expect(result.size).toBe(10)
  })

  it('handles empty string', () => {
    const result = analyzeCharset('')
    expect(result.size).toBe(0)
  })
})
