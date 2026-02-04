'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Player = {
  name: string
  position: string | null
}

export default function PlayerDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    const loadPlayer = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth')
        return
      }

      const { data, error } = await supabase
        .from('players')
        .select('name, position')
        .eq('profile_id', session.user.id)
        .single()

      if (!error) {
        setPlayer(data)
      }

      setLoading(false)
    }

    loadPlayer()
  }, [router])

  if (loading) {
    return <div className="p-6 text-white">Loading…</div>
  }

  if (!player) {
    return <div className="p-6 text-white">No player record found</div>
  }

  return (
    <main className="p-6 text-white space-y-4">
      <h1 className="text-3xl font-bold">{player.name}</h1>
      <p className="text-lg">Player Dashboard</p>

      <div className="mt-4">
        <p className="font-semibold">Position</p>
        <p>{player.position ?? '—'}</p>
      </div>

      <div>
        <p className="font-semibold">Appearances</p>
        <p>—</p>
      </div>

      <div>
        <p className="font-semibold">Goals</p>
        <p>—</p>
      </div>

      <div>
        <p className="font-semibold">Points</p>
        <p>—</p>
      </div>

      <div>
        <p className="font-semibold">MOTM</p>
        <p>—</p>
      </div>
    </main>
  )
}
