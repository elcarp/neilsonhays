import { useEffect, useState } from 'react'
import Lenis from 'lenis'

// Extend Window interface to include Lenis
declare global {
  interface Window {
    lenis?: Lenis | null
  }
}

export function useLenisInstance() {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Function to get Lenis instance
    const getLenisInstance = () => {
      const lenisInstance = window.lenis
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