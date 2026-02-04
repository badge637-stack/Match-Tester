'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function PlayerDashboard() {
  const { user } = useAuth()

  const [displayName, setDisplayName] = useState<string>('Player')
  const [position, setPosition] = useState<string>('—')

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      // Get profile (name)
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single()

      if (profile?.display_name) {
        setDisplayName(profile.display_name)
      }

      // Get player (position)
      const { data: player } = await supabase
        .from('players')
        .select('position')
        .eq('profile_id', user.id)
        .single()

      if (player?.position) {
        setPosition(player.position)
      }
    }

    fetchData()
  }, [user])

  // If auth hasn’t resolved yet
  if (!user) {
    return (
      <div className="p-6 text-white">
        No user session
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gray-900 rounded-xl p-6 shadow">
          <h1 className="text-3xl font-bold">{displayName}</h1>
          <p className="text-gray-400">Player Dashboard</p>
          <p className="mt-2">
            Position: <span className="font-semibold">{position}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Appearances" />
          <StatCard label="Goals" />
          <StatCard label="Points" />
          <StatCard label="MOTM" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label }: { label: string }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 text-center">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold mt-1">—</p>
    </div>
  )
}
