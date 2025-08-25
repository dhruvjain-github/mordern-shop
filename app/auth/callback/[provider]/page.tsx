'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'

export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { checkAuth } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const error = searchParams.get('error')
      const provider = window.location.pathname.split('/').pop()

      if (error) {
        console.error('OAuth error:', error)
        router.push('/auth/login?error=oauth_failed')
        return
      }

      if (code && provider) {
        try {
          // Exchange code for token
          const response = await fetch(`/api/auth/oauth/${provider}/callback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          })

          if (response.ok) {
            const { token } = await response.json()
            localStorage.setItem('auth-token', token)
            await checkAuth()
            router.push('/')
          } else {
            router.push('/auth/login?error=oauth_failed')
          }
        } catch (error) {
          console.error('OAuth callback error:', error)
          router.push('/auth/login?error=oauth_failed')
        }
      } else {
        router.push('/auth/login')
      }
    }

    handleCallback()
  }, [searchParams, router, checkAuth])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Completing sign in...</p>
      </div>
    </div>
  )
}
