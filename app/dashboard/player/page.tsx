'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function PlayerDashboard() {
  const { user, loading } = useAuth()

  const [displayName, setDisplayName] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchName = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single()

      if (!error) {
        setDisplayName(data.display_name)
      }
    }

    fetchName()
  }, [user])

  if (loading) {
    return <div>Loading…</div>
  }

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>
  }

  return (
    <div>
      Player dashboard{displayName ? ` — ${displayName}` : ''}
    </div>
  )
}
