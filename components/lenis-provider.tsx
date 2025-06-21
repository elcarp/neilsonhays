'use client'

import { useLenis } from '@/app/hooks/useLenis'
import { ReactNode } from 'react'

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  // Initialize Lenis - this will enable smooth scrolling
  useLenis()

  return <>{children}</>
} 