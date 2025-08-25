'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, Star, Truck } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Your Perfect 
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Shopping Experience
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Premium products across electronics, fashion, beauty, and more. 
                Shop with confidence and style.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300"
              >
                View Deals
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-blue-100 text-sm">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Premium Quality</h3>
                  <p className="text-blue-100 text-sm">Curated products</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Easy Returns</h3>
                  <p className="text-blue-100 text-sm">30-day guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80"
                alt="Shopping experience"
                className="rounded-2xl shadow-2xl w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  // First fallback: different reliable image
                  if (!target.src.includes('placehold')) {
                    target.src = 'https://placehold.co/600x400/3b82f6/ffffff?text=ModernShop'
                  } else {
                    // Second fallback: SVG data URL
                    target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
                          </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grad)"/>
                        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dy=".3em">
                          ModernShop
                        </text>
                      </svg>
                    `)}`
                  }
                }}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.opacity = '1'
                }}
                style={{ opacity: '0', transition: 'opacity 0.5s ease-in-out' }}
                loading="eager"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 z-20 bg-white rounded-lg p-4 shadow-lg transform rotate-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">Verified Products</p>
                  <p className="text-gray-600 text-xs">Quality guaranteed</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 z-20 bg-white rounded-lg p-4 shadow-lg transform -rotate-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🚚</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">Fast Delivery</p>
                  <p className="text-gray-600 text-xs">Same day available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-5 rounded-full transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full transform -translate-x-24 translate-y-24"></div>
    </section>
  )
}
