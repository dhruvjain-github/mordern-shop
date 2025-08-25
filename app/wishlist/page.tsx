'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Star } from 'lucide-react'

export default function WishlistPage() {
  const [wishlistItems] = useState([]) // In a real app, this would be from context/state

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Save items you love for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No items in wishlist</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start browsing products and add them to your wishlist.
            </p>
            <div className="mt-6">
              <a
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Browse Products
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Wishlist items would be rendered here */}
          </div>
        )}
      </div>
    </div>
  )
}
