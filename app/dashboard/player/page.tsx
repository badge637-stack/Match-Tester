'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function PlayerDashboard() {
  const { user, loading } = useAuth()
  const [position, setPosition] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from('players')
        .select('position, profile_id')
        .eq('profile_id', user.id)
        .single()

      console.log('PLAYER QUERY RESULT:', data, error)

      if (data) {
        setPosition(data.position)
      }
    }

    fetchPlayer()
  }, [user])

  if (loading) return <div>Loading…</div>
  if (!user) return <div>Not signed in</div>

  return (
    <div style={{ padding: 24 }}>
      <h1>Player dashboard</h1>
      <p>Auth user id: {user.id}</p>
      <p>Position: {position ?? '—'}</p>
    </div>
  )
}
