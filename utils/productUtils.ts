import productsData from '@/data/products.json'
import { getSingleReliableImage } from '@/utils/imageUtils'

export interface EnhancedProduct {
  id: string
  name: string
  description: string
  price: number
  category: string
  subcategory: string
  image: string
  fallbackImage: string
  inStock: boolean
  quantity: number
  rating: number
  reviews: number
  brand: string
  specifications?: Record<string, string>
  tags?: string[]
}

// Enhance products with reliable fallback images
export const getEnhancedProducts = (): EnhancedProduct[] => {
  return productsData.map((product: any) => ({
    ...product,
    // Use reliable image as primary (Lorem Picsum based on product ID)
    image: getSingleReliableImage(product.id, product.category),
    // Add reliable fallback
    fallbackImage: getSingleReliableImage(product.id, product.category, 300, 200)
  }))
}

export const getProductById = (id: string): EnhancedProduct | null => {
  const products = getEnhancedProducts()
  return products.find(product => product.id === id) || null
}

export const searchProducts = (filters: {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: string
}): EnhancedProduct[] => {
  let products = getEnhancedProducts()
  
  // Apply filters
  if (filters.query) {
    const query = filters.query.toLowerCase()
    products = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.subcategory.toLowerCase().includes(query) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }
  
  if (filters.category) {
    products = products.filter(product =>
      product.category.toLowerCase().includes(filters.category!.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(filters.category!.toLowerCase())
    )
  }
  
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    products = products.filter(product => {
      const price = product.price
      const minPrice = filters.minPrice || 0
      const maxPrice = filters.maxPrice || 999999
      return price >= minPrice && price <= maxPrice
    })
  }
  
  if (filters.inStock) {
    products = products.filter(product => product.inStock === true)
  }
  
  // Apply sorting
  switch (filters.sortBy) {
    case 'price-asc':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      products.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      products.sort((a, b) => b.rating - a.rating)
      break
    case 'name':
    default:
      products.sort((a, b) => a.name.localeCompare(b.name))
      break
  }
  
  return products
}
