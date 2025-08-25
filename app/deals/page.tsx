'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Tag, Percent } from 'lucide-react'

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <Tag className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Deals & Offers
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Great deals and special offers coming soon!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
