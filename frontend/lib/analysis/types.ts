export interface CharsetFlags {
  upper: boolean
  lower: boolean
  digit: boolean
  symbol: boolean
}

export interface CharsetInfo {
  flags: CharsetFlags
  size: number
}

export interface CrackTimes {
  bruteForceSeconds: number
  dictionarySeconds: number
  rainbowTableSeconds: number
  worstCaseSeconds: number
}

export interface Pattern {
  type: 'keyboard_walk' | 'repeated_chars' | 'leet_speak' | 'date_pattern' | 'repeated_word'
  match: string
  description: string
}

export interface AnalysisResult {
  score: number
  entropyBits: number
  charsetInfo: CharsetInfo
  crackTimes: CrackTimes
  patterns: Pattern[]
  suggestions: string[]
  inDictionary: boolean
}
