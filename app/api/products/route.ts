import { NextRequest, NextResponse } from 'next/server'
import { Product, SearchFilters } from '@/types'
import productsData from '@/data/products.json'

// Type assertion for our JSON data
const products = productsData as any[]

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract search parameters
    const query = searchParams.get('q')?.toLowerCase().trim() || ''
    const category = searchParams.get('category')?.toLowerCase().trim() || ''
    const sortBy = searchParams.get('sortBy') || 'name'
    const minPrice = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999')
    const inStock = searchParams.get('inStock') === 'true'
    
    let filteredProducts = [...products]
    
    // Filter by search query (search in name, description, brand, category, tags)
    if (query) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query) ||
        (product.tags && product.tags.some((tag: string) => tag.toLowerCase().includes(query)))
      )
    }
    
    // Filter by category (only if category is specified and not empty)
    if (category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase().includes(category) ||
        product.subcategory.toLowerCase().includes(category)
      )
    }
    
    // Filter by price range
    if (minPrice > 0 || maxPrice < 999999) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      )
    }
    
    // Filter by stock status
    if (inStock) {
      filteredProducts = filteredProducts.filter(product => product.inStock === true)
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
      default:
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    
    return NextResponse.json({
      products: filteredProducts,
      total: filteredProducts.length,
      applied_filters: {
        query: query || null,
        category: category || null,
        sortBy,
        minPrice,
        maxPrice,
        inStock
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
