'use client'

import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace('/welcome')
      return
    }

    const checkProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

      if (!data) {
        router.replace('/profile/create')
      }

      setChecking(false)
    }

    checkProfile()
  }, [user, loading, router])

  if (loading || checking) {
    return <p style={{ padding: 24 }}>Loading…</p>
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Project 90</h1>
      <p>Home (temporary)</p>
    </main>
  )
}
