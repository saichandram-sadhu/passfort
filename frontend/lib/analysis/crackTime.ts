import type { CrackTimes } from './types'

const GUESSES_PER_SECOND = 10_000_000_000

export function estimateCrackTime(
  charsetSize: number,
  length: number,
  dictionaryRank: number | null
): CrackTimes {
  const bruteForceSeconds = Math.pow(charsetSize, length) / GUESSES_PER_SECOND
  const dictionarySeconds = dictionaryRank !== null
    ? (dictionaryRank + 1) / GUESSES_PER_SECOND
    : bruteForceSeconds
  const rainbowTableSeconds = bruteForceSeconds * 0.001
  const worstCaseSeconds = Math.min(bruteForceSeconds, dictionarySeconds, rainbowTableSeconds)

  return { bruteForceSeconds, dictionarySeconds, rainbowTableSeconds, worstCaseSeconds }
}

export function formatCrackTime(seconds: number): string {
  if (seconds < 1)                 return '< 1 second'
  if (seconds < 60)                return `${Math.round(seconds)} second${Math.round(seconds) === 1 ? '' : 's'}`
  if (seconds < 3600)              return `${Math.round(seconds / 60)} minute${Math.round(seconds / 60) === 1 ? '' : 's'}`
  if (seconds < 86400)             return `${Math.round(seconds / 3600)} hour${Math.round(seconds / 3600) === 1 ? '' : 's'}`
  if (seconds < 86400 * 365)       return `${Math.round(seconds / 86400)} day${Math.round(seconds / 86400) === 1 ? '' : 's'}`
  if (seconds < 86400 * 365 * 100) return `${Math.round(seconds / (86400 * 365))} year${Math.round(seconds / (86400 * 365)) === 1 ? '' : 's'}`
  return 'centuries'
}
