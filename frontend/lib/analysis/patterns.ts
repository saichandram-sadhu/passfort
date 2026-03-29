import type { Pattern } from './types'

const KEYBOARD_WALKS = [
  'qwerty', 'qwert', 'werty', 'asdf', 'asdfg', 'zxcv', 'zxcvb',
  '12345', '123456', '1234', 'qazwsx', 'wsxedc',
]

const LEET_MAP: Record<string, string> = {
  '@': 'a', '3': 'e', '0': 'o', '1': 'i', '$': 's', '5': 's', '7': 't', '!': 'i',
}

export function detectPatterns(password: string, dictionary: string[] = []): Pattern[] {
  const patterns: Pattern[] = []
  const lower = password.toLowerCase()

  // Keyboard walks
  for (const walk of KEYBOARD_WALKS) {
    if (lower.includes(walk)) {
      patterns.push({ type: 'keyboard_walk', match: walk, description: `Contains keyboard sequence "${walk}"` })
      break
    }
  }

  // Repeated characters (3+)
  const repeatedMatch = password.match(/(.)\1{2,}/)
  if (repeatedMatch) {
    patterns.push({ type: 'repeated_chars', match: repeatedMatch[0], description: `Repeated character "${repeatedMatch[1]}"` })
  }

  // Date patterns (4-digit year or date separators)
  if (/\d{4}/.test(password) || /\d{2}[-/]\d{2}/.test(password)) {
    patterns.push({ type: 'date_pattern', match: '', description: 'Contains a date-like number pattern' })
  }

  // Leet speak: flag only if 2+ substitutions (obvious pattern) or de-leeted word is in dictionary
  const leetChars = Object.keys(LEET_MAP).filter(char => password.includes(char))
  if (leetChars.length > 0) {
    const deleeted = lower.split('').map(c => LEET_MAP[c] ?? c).join('')
    const isCommonSub = dictionary.length > 0 && dictionary.includes(deleeted)

    if (leetChars.length >= 2 || isCommonSub) {
      patterns.push({
        type: 'leet_speak',
        match: deleeted,
        description: isCommonSub
          ? `Leet speak of common word "${deleeted}" — easy to guess`
          : 'Contains leet speak substitutions (@, 3, 0, $, etc.)',
      })
    }
  }

  // Repeated word segments (≥3 chars repeated)
  const wordMatch = lower.match(/(.{3,})\1+/)
  if (wordMatch) {
    patterns.push({ type: 'repeated_word', match: wordMatch[1], description: `Repeated segment "${wordMatch[1]}"` })
  }

  return patterns
}
