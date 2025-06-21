import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Extend Window interface to include Lenis
declare global {
  interface Window {
    lenis?: Lenis | null
  }
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check if Lenis is already initialized
    if (window.lenis) {
      lenisRef.current = window.lenis
      return
    }

    // Initialize Lenis with minimal configuration
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Make Lenis instance globally available
    window.lenis = lenisRef.current

    // RAF function
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        window.lenis = null
      }
    }
  }, [])

  return lenisRef.current
} 