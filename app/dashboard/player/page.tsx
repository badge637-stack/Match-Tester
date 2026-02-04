'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function PlayerDashboard() {
  const { user, loading } = useAuth()

  const [displayName, setDisplayName] = useState<string | null>(null)
  const [position, setPosition] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          display_name,
          players:players_profile_id_fkey (
            position
          )
        `)
        .eq('id', user.id)
        .single()

      if (!error && data) {
        setDisplayName(data.display_name)
        setPosition(data.players?.[0]?.position ?? null)
      }
    }

    fetchProfile()
  }, [user])

  if (loading) {
    return <div>Loading…</div>
  }

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-2">
        <h1 className="text-2xl font-bold">
          {displayName ?? 'Player'}
        </h1>

        <p className="text-gray-600">
          Position:{' '}
          <span className="font-medium">
            {position ?? '—'}
          </span>
        </p>
      </div>
    </div>
  )
}
