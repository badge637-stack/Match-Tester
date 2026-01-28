'use client'

import { useAuth } from '../lib/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/welcome')
    }
  }, [user, loading, router])

  if (loading) {
    return <p style={{ padding: 24 }}>Loading…</p>
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Project 90</h1>
      <p>Home (temporary)</p>
    </main>
  )
}
