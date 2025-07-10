'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface IBlurImage {
  height?: number | `${number}`
  width?: number | `${number}`
  src: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  className?: string
  alt?: string
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive'
  [key: string]: unknown
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  objectFit,
  alt,
  layout,
  ...rest
}: IBlurImage) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <>
      <Image
        className={cn(
          'transition duration-300 transform',
          isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100',
          className
        )}
        onLoadingComplete={() => setLoading(false)}
        src={src}
        width={width}
        height={height}
        objectFit={objectFit}
        loading='lazy'
        decoding='async'
        blurDataURL={src}
        layout={layout}
        alt={alt ? alt : 'Avatar'}
        {...rest}
      />
    </>
  )
} 