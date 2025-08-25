'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Grid3X3 } from 'lucide-react'
import categoriesData from '@/data/categories.json'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse products by category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoriesData.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 p-6"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.subcategories.length} subcategories
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Grid3X3 className="w-5 h-5 mr-2" />
            View All Products
          </Link>
        </div>
      </div>
    </div>
  )
}
