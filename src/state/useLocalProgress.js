import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY_V2 = 'dsaProgressV2'
const STORAGE_KEY_V1 = 'dsaProgressV1'

function readStorageV2() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_V2)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function readStorageV1() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_V1)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStorageV2(obj) {
  try {
    localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(obj))
  } catch {
    // ignore
  }
}

const emptyState = { done: {}, saved: {} }

export default function useLocalProgress() {
  const [state, setState] = useState(emptyState)

  useEffect(() => {
    // Try V2 first
    let loaded = readStorageV2()
    if (!loaded) {
      // migrate V1 (where keys were completion flags)
      const v1 = readStorageV1()
      if (v1 && typeof v1 === 'object' && !Array.isArray(v1)) {
        loaded = { done: v1, saved: {} }
        writeStorageV2(loaded)
      }
    }
    setState(loaded || emptyState)
  }, [])

  const isDone = useCallback((key) => Boolean(state.done[key]), [state])
  const setDone = useCallback((key, value) => {
    setState(prev => {
      const next = { ...prev, done: { ...prev.done, [key]: Boolean(value) } }
      writeStorageV2(next)
      return next
    })
  }, [])
  const toggleDone = useCallback((key) => {
    setState(prev => {
      const next = { ...prev, done: { ...prev.done, [key]: !prev.done[key] } }
      writeStorageV2(next)
      return next
    })
  }, [])

  const isSaved = useCallback((key) => Boolean(state.saved[key]), [state])
  const setSaved = useCallback((key, value) => {
    setState(prev => {
      const next = { ...prev, saved: { ...prev.saved, [key]: Boolean(value) } }
      writeStorageV2(next)
      return next
    })
  }, [])
  const toggleSaved = useCallback((key) => {
    setState(prev => {
      const next = { ...prev, saved: { ...prev.saved, [key]: !prev.saved[key] } }
      writeStorageV2(next)
      return next
    })
  }, [])

  return { isDone, setDone, toggleDone, isSaved, setSaved, toggleSaved }
}
