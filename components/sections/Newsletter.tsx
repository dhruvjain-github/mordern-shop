'use client'

import React, { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <Mail className="w-16 h-16 mx-auto mb-4 text-primary-200" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Get the latest updates on new products, exclusive deals, and special offers. 
              Join thousands of happy customers!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 rounded-lg border border-primary-400 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-300 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email.trim()}
                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {status === 'success' && (
            <div className="mt-4 p-3 bg-green-500 bg-opacity-20 border border-green-300 rounded-lg">
              <p className="text-green-100">
                🎉 Thank you for subscribing! Check your email for confirmation.
              </p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">Exclusive Deals</h3>
              <p className="text-primary-200 text-sm">Be the first to know about our special offers</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">New Arrivals</h3>
              <p className="text-primary-200 text-sm">Get notified when new products arrive</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Style Tips</h3>
              <p className="text-primary-200 text-sm">Receive curated styling and shopping advice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
