'use client'

import React from 'react'
import Link from 'next/link'
import categoriesData from '@/data/categories.json'

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing products across all your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoriesData.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                {category.subcategories.length} subcategories
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
