import type { AnalysisResult } from './types'

export function generateSuggestions(result: AnalysisResult): string[] {
  const tips: string[] = []
  const { charsetInfo, patterns, inDictionary, entropyBits, score } = result

  if (score >= 90) return []

  if (inDictionary)                      tips.push('Avoid common passwords — this appears in breach lists')
  if (!charsetInfo.flags.symbol)         tips.push('Add symbols (!@#$%^&*) to significantly boost strength')
  if (!charsetInfo.flags.upper)          tips.push('Mix in uppercase letters')
  if (!charsetInfo.flags.digit)          tips.push('Add numbers to expand the character set')
  if (entropyBits < 36)                  tips.push('Make it longer — aim for at least 12 characters')
  if (patterns.some(p => p.type === 'keyboard_walk'))   tips.push('Avoid keyboard sequences like "qwerty" or "asdf"')
  if (patterns.some(p => p.type === 'repeated_chars'))  tips.push('Avoid repeating the same character multiple times')
  if (patterns.some(p => p.type === 'leet_speak'))      tips.push('Leet speak substitutions (@ for a, 0 for o) are well-known — use truly random characters instead')
  if (patterns.some(p => p.type === 'date_pattern'))    tips.push('Avoid years or date patterns — they are commonly guessed')

  return tips
}
