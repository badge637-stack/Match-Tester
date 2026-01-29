'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.replace('/welcome')
      return
    }

    const checkProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('club_id')
        .eq('id', user.id)
        .single()

      if (error || !data) {
        router.replace('/profile/create')
        return
      }

      if (!data.club_id) {
        router.replace('/club/select')
        return
      }

      setLoading(false)
    }

    checkProfile()
  }, [user, router])

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
