import type { CharsetInfo, CharsetFlags } from './types'

const LOWER = /[a-z]/
const UPPER = /[A-Z]/
const DIGIT = /[0-9]/
const SYMBOL = /[^a-zA-Z0-9]/

export function analyzeCharset(password: string): CharsetInfo {
  if (!password) return { flags: { upper: false, lower: false, digit: false, symbol: false }, size: 0 }

  const flags: CharsetFlags = {
    lower: LOWER.test(password),
    upper: UPPER.test(password),
    digit: DIGIT.test(password),
    symbol: SYMBOL.test(password),
  }

  const size =
    (flags.lower ? 26 : 0) +
    (flags.upper ? 26 : 0) +
    (flags.digit ? 10 : 0) +
    (flags.symbol ? 32 : 0)

  return { flags, size }
}
