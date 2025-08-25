// Utility functions for reliable image handling

export const generatePlaceholderImage = (width: number, height: number, text: string = 'Product') => {
  // Create SVG as data URL - this will always work
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">
        ${text}
      </text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export const getReliableImageSources = (productId: string, width: number = 400, height: number = 300) => {
  const seed = parseInt(productId.replace(/\D/g, ''), 10) || 1
  return [
    // Primary: Lorem Picsum (reliable, static placeholder service)
    `https://picsum.photos/${width}/${height}?random=${seed}`,
    // Fallback 1: placehold.co (reliable placeholder service)
    `https://placehold.co/${width}x${height}/e5e7eb/374151?text=Product+${productId}`,
    // Fallback 2: data URL SVG (always works)
    generatePlaceholderImage(width, height, `Product ${productId}`)
  ]
}

// Reliable placeholder services for different categories
export const productCategoryImages = {
  electronics: 'https://picsum.photos/400/300?random=1',
  clothing: 'https://picsum.photos/400/300?random=2',
  home: 'https://picsum.photos/400/300?random=3',
  groceries: 'https://picsum.photos/400/300?random=4',
  health: 'https://picsum.photos/400/300?random=5',
  sports: 'https://picsum.photos/400/300?random=6',
  automotive: 'https://picsum.photos/400/300?random=7'
}

export const getImageForCategory = (category: string, productId: string, width: number = 400, height: number = 300) => {
  const categoryKey = category.toLowerCase() as keyof typeof productCategoryImages
  const seed = parseInt(productId.replace(/\D/g, ''), 10) || 1
  
  // Return reliable fallback chain based on category
  if (productCategoryImages[categoryKey]) {
    return [
      // Use category-specific image from Lorem Picsum with unique seed
      `https://picsum.photos/${width}/${height}?random=${seed + 100}`, // offset to get different images
      productCategoryImages[categoryKey],
      `https://placehold.co/${width}x${height}/e5e7eb/374151?text=${encodeURIComponent(category)}`,
      generatePlaceholderImage(width, height, `${category} Product`)
    ]
  }
  
  return getReliableImageSources(productId, width, height)
}

// Get a single reliable image URL for immediate use
export const getSingleReliableImage = (productId: string, category?: string, width: number = 400, height: number = 300, variant: number = 0) => {
  const seed = parseInt(productId.replace(/\D/g, ''), 10) || 1
  return `https://picsum.photos/${width}/${height}?random=${seed + variant}`
}
