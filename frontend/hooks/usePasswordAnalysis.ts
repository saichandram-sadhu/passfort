'use client'

import { useState, useEffect, useRef } from 'react'
import { analyzePassword } from '@/lib/analysis'
import { postStats } from '@/lib/api'
import type { AnalysisResult } from '@/lib/analysis'

const DEBOUNCE_MS = 800

export function usePasswordAnalysis(password: string, dictionary: string[]) {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!password) {
      setResult(null)
      return
    }
    const analysis = analyzePassword(password, dictionary)
    setResult(analysis)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      postStats({
        score: analysis.score,
        length: password.length,
        crack_time_seconds: analysis.crackTimes.worstCaseSeconds,
        charset_flags: analysis.charsetInfo.flags,
      })
    }, DEBOUNCE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [password, dictionary])
  return result
}
