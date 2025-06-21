import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export function useLenisInstance() {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Function to get Lenis instance
    const getLenisInstance = () => {
      const lenisInstance = (window as any).lenis as Lenis
      if (lenisInstance) {
        setLenis(lenisInstance)
        return true
      }
      return false
    }

    // Try to get Lenis immediately
    if (!getLenisInstance()) {
      // If not available, retry with a small delay
      const retryInterval = setInterval(() => {
        if (getLenisInstance()) {
          clearInterval(retryInterval)
        }
      }, 100)

      // Cleanup interval after 5 seconds
      setTimeout(() => {
        clearInterval(retryInterval)
      }, 5000)
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  return lenis
} 