'use client'

import { useEffect, useRef, useState } from 'react'
import { fetchDictionary } from '@/lib/api'

export function useDictionary() {
  const cache = useRef<string[]>([])
  const [ready, setReady] = useState(false)
  useEffect(() => {
    fetchDictionary().then((w) => {
      cache.current = w
      setReady(true)
    })
  }, [])
  return { dictionary: cache.current, ready }
}
