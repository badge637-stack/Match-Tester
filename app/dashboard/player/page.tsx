'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function PlayerDashboard() {
  const supabase = createClientComponentClient()

  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [position, setPosition] = useState<string | null>(null)

  useEffect(() => {
    const loadPlayer = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        setLoading(false)
        return
      }

      const userId = session.user.id

      const { data, error } = await supabase
        .from('players')
        .select(`
          position,
          profiles (
            display_name
          )
        `)
        .eq('profile_id', userId)
        .single()

      if (!error && data) {
        setPosition(data.position ?? null)
        setDisplayName(data.profiles?.display_name ?? null)
      }

      setLoading(false)
    }

    loadPlayer()
  }, [supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading player dashboard…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="border-b border-white/20 pb-6">
          <h1 className="text-4xl font-bold">
            {displayName ?? 'Player'}
          </h1>
          <p className="text-white/70 mt-1">Player Dashboard</p>
          <p className="mt-3 inline-block rounded bg-white/10 px-3 py-1 text-sm">
            Position: <span className="font-semibold">{position ?? '—'}</span>
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <StatCard title="Appearances" value="—" />
          <StatCard title="Goals" value="—" />
          <StatCard title="Points" value="—" />
          <StatCard title="MOTM" value="—" />

        </div>
      </div>
    </div>
  )
}

/* ---------- Small reusable stat card ---------- */

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/5 p-6">
      <p className="text-sm text-white/70">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  )
}
