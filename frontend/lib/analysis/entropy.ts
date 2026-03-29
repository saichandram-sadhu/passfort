export function calculateEntropy(password: string, charsetSize: number): number {
  if (!password || charsetSize === 0) return 0
  return password.length * Math.log2(charsetSize)
}

export function entropyTier(bits: number): 'weak' | 'fair' | 'good' | 'strong' {
  if (bits < 28) return 'weak'
  if (bits < 36) return 'fair'
  if (bits < 60) return 'good'
  return 'strong'
}
