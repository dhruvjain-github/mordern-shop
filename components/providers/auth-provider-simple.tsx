'use client'

import React, { createContext, useContext, useState } from 'react'
import { AuthContextType, User } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simple mock authentication
      if (email && password) {
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setUser(mockUser)
        localStorage.setItem('mock-user', JSON.stringify(mockUser))
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // Simple mock registration
      if (email && password && name) {
        const mockUser: User = {
          id: '1',
          email,
          name,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setUser(mockUser)
        localStorage.setItem('mock-user', JSON.stringify(mockUser))
      } else {
        throw new Error('All fields required')
      }
    } catch (error) {
      console.error('Sign up failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('mock-user')
  }

  const signInWithProvider = async (provider: 'google' | 'github') => {
    // Mock OAuth - just set a demo user
    const mockUser: User = {
      id: '1',
      email: `demo@${provider}.com`,
      name: `Demo User`,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setUser(mockUser)
    localStorage.setItem('mock-user', JSON.stringify(mockUser))
  }

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem('mock-user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  // Check for stored user on mount
  React.useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithProvider,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
