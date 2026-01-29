'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

type Team = {
  id: string
  name: string
}

export default function SelectClubPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('id, name')
        .order('name')

      if (error) {
        console.error(error)
        setError('Failed to load clubs')
      } else {
        setTeams(data ?? [])
      }

      setLoading(false)
    }

    fetchTeams()
  }, [user])

  const handleSelect = async (teamId: string) => {
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({ club_id: teamId })
      .eq('id', user.id)

    if (error) {
      alert('Failed to save club')
      return
    }

    router.replace('/')
  }

  if (!user) {
    return <p style={{ padding: 24 }}>Not signed in</p>
  }

  if (loading) {
    return <p style={{ padding: 24 }}>Loading clubs…</p>
  }

  if (error) {
    return <p style={{ padding: 24 }}>{error}</p>
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Select your club</h1>

      {teams.length === 0 && (
        <p>No clubs found. Add teams in Supabase.</p>
      )}

      <ul style={{ marginTop: 16 }}>
        {teams.map(team => (
          <li key={team.id} style={{ marginBottom: 8 }}>
            <button
              onClick={() => handleSelect(team.id)}
              style={{
                padding: '8px 12px',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {team.name}
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
