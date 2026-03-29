export async function generatePassphrase(
  wordCount: number,
  separator: string,
): Promise<string> {
  const { EFF_WORDLIST } = await import('@/data/eff-wordlist')
  const indices = new Uint32Array(wordCount)
  crypto.getRandomValues(indices)
  return Array.from(indices)
    .map((n) => EFF_WORDLIST[n % EFF_WORDLIST.length])
    .join(separator)
}
