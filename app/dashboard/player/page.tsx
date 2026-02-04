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

    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from('players')
        .select('position, profiles(display_name)')
        .eq('profile_id', user.id)
        .single()

      if (!error && data) {
        setPosition(data.position ?? null)
        setDisplayName(data.profiles?.display_name ?? null)
      }
    }

    fetchPlayer()
  }, [user])

  if (loading) {
    return <div className="p-6">Loading…</div>
  }

  if (!user) {
    return <div className="p-6">Please sign in</div>
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="bg-gray-900 rounded-xl p-6 shadow">
        <h1 className="text-3xl font-bold">
          {displayName ?? 'Player'}
        </h1>
        <p className="text-gray-400 mt-1">Player Dashboard</p>
        <p className="mt-2 text-lg">
          Position: <span className="font-semibold">{position ?? '—'}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {['Appearances', 'Goals', 'Points', 'MOTM'].map(stat => (
          <div
            key={stat}
            className="bg-gray-900 rounded-xl p-4 text-center"
          >
            <p className="text-sm text-gray-400">{stat}</p>
            <p className="text-2xl font-bold mt-1">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
