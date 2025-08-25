'use client'

import React, { useState } from 'react'
import { generatePlaceholderImage, getSingleReliableImage } from '@/utils/imageUtils'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  productId: string
  category?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function ProductImage({ 
  src, 
  alt, 
  className = '', 
  productId, 
  category,
  width = 400, 
  height = 300,
  priority = false 
}: ProductImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [fallbackLevel, setFallbackLevel] = useState(0)

  // Fallback chain for reliable image loading
  const fallbackSources = [
    src, // Original source
    getSingleReliableImage(productId, category, width, height), // Lorem Picsum
    `https://placehold.co/${width}x${height}/e5e7eb/374151?text=Product`, // Placehold.co
    generatePlaceholderImage(width, height, 'Product') // SVG data URL (always works)
  ]

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    const nextLevel = fallbackLevel + 1
    
    if (nextLevel < fallbackSources.length) {
      target.src = fallbackSources[nextLevel]
      setFallbackLevel(nextLevel)
    }
  }

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
      )}
      
      <img
        src={fallbackSources[fallbackLevel]}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ 
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
}
