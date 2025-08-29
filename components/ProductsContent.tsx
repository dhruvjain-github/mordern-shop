'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Filter, Star, ShoppingCart, Grid, List } from 'lucide-react'
import { useCart } from '@/components/providers/cart-provider'
import SearchBar from '@/components/SearchBar'
import ProductImage from '@/components/ProductImage'
import categoriesData from '@/data/categories.json'
import { Product } from '@/types'

export default function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [searchQuery, selectedCategory, sortBy, priceRange, showInStockOnly])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery.trim()) params.append('q', searchQuery)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (sortBy) params.append('sortBy', sortBy)
      if (priceRange.min > 0) params.append('minPrice', priceRange.min.toString())
      if (priceRange.max < 10000) params.append('maxPrice', priceRange.max.toString())
      if (showInStockOnly) params.append('inStock', 'true')

      const queryString = params.toString()
      const url = `/api/products${queryString ? `?${queryString}` : ''}`
      const response = await fetch(url)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product: Product) => {
    addItem(product)
  }

  const getSubcategories = (category: string) => {
    if (category === 'all') return []
    const categoryData = categoriesData.find(cat => cat.id === category)
    return categoryData?.subcategories || []
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery.trim() || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    const matchesStock = !showInStockOnly || product.inStock
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex-1 max-w-lg">
            <SearchBar 
              onSearch={setSearchQuery} 
              placeholder="Search products..." 
              initialValue={searchQuery}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categoriesData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showInStockOnly}
                    onChange={(e) => setShowInStockOnly(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
          {searchQuery && (
            <span className="ml-2">
              for "<span className="font-semibold">{searchQuery}</span>"
            </span>
          )}
        </p>
      </div>

      {/* Products Grid/List */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setPriceRange({ min: 0, max: 10000 })
              setShowInStockOnly(false)
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  productId={product.id}
                  category={product.category}
                  className={`w-full object-cover ${
                    viewMode === 'list' ? 'h-full' : 'h-48'
                  }`}
                />
              </div>
              
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    {!product.inStock && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {product.brand}
                  </p>
                  
                  {viewMode === 'list' && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
                
                <div className={`flex items-center justify-between ${
                  viewMode === 'list' ? 'mt-auto' : ''
                }`}>
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      product.inStock
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {viewMode === 'list' ? 'Add to Cart' : ''}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
