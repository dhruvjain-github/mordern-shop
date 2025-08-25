'use client'

import React, { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  productId: string
  width?: number
  height?: number
  priority?: boolean
}

export default function ProductImage({ 
  src, 
  alt, 
  className = '', 
  productId, 
  width = 400, 
  height = 300,
  priority = false 
}: ProductImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    
    if (!imageError) {
      // First fallback: use picsum with product ID for consistency
      target.src = `https://picsum.photos/${width}/${height}?random=${productId}`
      setImageError(true)
    } else {
      // Second fallback: use placeholder
      target.src = `https://via.placeholder.com/${width}x${height}/e5e7eb/9ca3af?text=Product+Image`
    }
  }

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
      )}
      
      <img
        src={src}
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
