import type { CharsetFlags } from '../analysis/types'

const CHARS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digit: '0123456789',
  symbol: '!@#$%^&*()-_=+[]{}|;:,.<>?',
}

export function generateRandom(length: number, flags: CharsetFlags): string {
  const pool = [
    flags.lower ? CHARS.lower : '',
    flags.upper ? CHARS.upper : '',
    flags.digit ? CHARS.digit : '',
    flags.symbol ? CHARS.symbol : '',
  ].join('')
  if (!pool) return ''
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array).map((n) => pool[n % pool.length]).join('')
}
