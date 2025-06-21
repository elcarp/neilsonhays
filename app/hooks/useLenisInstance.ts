import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export function useLenisInstance() {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Get the Lenis instance from the window object
    // This assumes Lenis is initialized globally
    const lenisInstance = (window as any).lenis as Lenis
    if (lenisInstance) {
      setLenis(lenisInstance)
    }
  }, [])

  return lenis
} 