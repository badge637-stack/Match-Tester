'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/AuthContext'

export default function HomePage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    // Not signed in → go to auth
    if (!user) {
      router.replace('/auth')
      return
    }

    // Signed in but no profile yet
    if (!profile) {
      router.replace('/profile/create')
      return
    }

    // Profile exists but no club selected
    if (!profile.club_id) {
      router.replace('/club/select')
      return
    }
  }, [user, profile, loading, router])

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
