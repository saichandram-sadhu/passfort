import { describe, it, expect } from 'vitest'
import { detectPatterns } from '../patterns'

describe('detectPatterns', () => {
  it('detects keyboard walk "qwerty"', () => {
    const patterns = detectPatterns('myqwerty123')
    expect(patterns.some(p => p.type === 'keyboard_walk')).toBe(true)
  })

  it('detects repeated characters "aaa"', () => {
    const patterns = detectPatterns('paaaassword')
    expect(patterns.some(p => p.type === 'repeated_chars')).toBe(true)
  })

  it('detects date pattern 1990', () => {
    const patterns = detectPatterns('john1990')
    expect(patterns.some(p => p.type === 'date_pattern')).toBe(true)
  })

  it('detects leet speak substitution', () => {
    const patterns = detectPatterns('p@ssw0rd')
    expect(patterns.some(p => p.type === 'leet_speak')).toBe(true)
  })

  it('returns empty array for strong unique password', () => {
    const patterns = detectPatterns('Kx#9mQ!vL2')
    expect(patterns).toHaveLength(0)
  })

  it('detects repeated word segment', () => {
    const patterns = detectPatterns('helloworld1helloworld1')
    expect(patterns.some(p => p.type === 'repeated_word')).toBe(true)
  })

  it('detects common_subs — de-leeted word found in dictionary', () => {
    // 'p@ssword' de-leeted → 'password', which is in the dictionary
    const patterns = detectPatterns('p@ssword', ['password', 'hello'])
    expect(patterns.some(p => p.type === 'leet_speak')).toBe(true)
  })
})
