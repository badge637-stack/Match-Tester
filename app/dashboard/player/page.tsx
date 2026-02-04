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

    const fetchData = async () => {
      // Get player row (primary entity for this dashboard)
      const { data: player, error: playerError } = await supabase
        .from('players')
        .select('position')
        .eq('profile_id', user.id)
        .single()

      if (!playerError && player) {
        setPosition(player.position)
      }

      // Get profile display name
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single()

      if (!profileError && profile) {
        setDisplayName(profile.display_name)
      }
    }

    fetchData()
  }, [user])

  if (loading) {
    return <div className="p-6">Loading…</div>
  }

  if (!user) {
    return <div className="p-6">Please sign in to view your dashboard.</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {displayName ?? 'Player'}
            </h1>
            <p className="text-gray-500">Player Dashboard</p>
          </div>

          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {position ?? '—'}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">Appearances</p>
            <p className="text-2xl font-bold text-gray-900">—</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">Goals</p>
            <p className="text-2xl font-bold text-gray-900">—</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">Points</p>
            <p className="text-2xl font-bold text-gray-900">—</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">MOTM</p>
            <p className="text-2xl font-bold text-gray-900">—</p>
          </div>
        </div>

      </div>
    </div>
  )
}
