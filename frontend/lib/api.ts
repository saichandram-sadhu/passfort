const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function fetchDictionary(): Promise<string[]> {
  try {
    const r = await fetch(`${API}/api/dictionary`)
    if (!r.ok) return []
    const d = await r.json()
    return d.words ?? []
  } catch {
    return []
  }
}

export interface StatPayload {
  score: number
  length: number
  crack_time_seconds: number
  charset_flags: {
    upper: boolean
    lower: boolean
    digit: boolean
    symbol: boolean
  }
}

export async function postStats(payload: StatPayload): Promise<void> {
  try {
    await fetch(`${API}/api/stats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    /* fire-and-forget */
  }
}

export interface GlobalStats {
  total_analyzed: number
  avg_score: number
  avg_length: number
}

export async function getStats(): Promise<GlobalStats | null> {
  try {
    const r = await fetch(`${API}/api/stats`)
    if (!r.ok) return null
    return r.json()
  } catch {
    return null
  }
}
