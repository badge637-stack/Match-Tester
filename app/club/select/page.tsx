'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../lib/AuthContext'

type Club = {
  id: string
  name: string
}

export default function SelectClub() {
  const { user } = useAuth()
  const router = useRouter()

  const [clubs, setClubs] = useState<Club[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.replace('/welcome')
      return
    }

    const loadClubs = async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('id, name, location')
        .order('name')

      if (error) {
        setError('Failed to load clubs')
      } else {
        setClubs(data || [])
      }

      setLoading(false)
    }

    loadClubs()
  }, [user, router])

  const selectClub = async (clubId: string) => {
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({ club_id: clubId })
      .eq('id', user.id)

    if (error) {
      setError('Failed to save club')
      return
    }

    router.replace('/')
  }

  if (loading) {
    return <p style={{ padding: 24 }}>Loading clubs…</p>
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Select your club</h1>

      <input
        placeholder="Search clubs…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: '100%', marginBottom: 16 }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {clubs
          .filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(club => (
            <li key={club.id} style={{ marginBottom: 8 }}>
              <button onClick={() => selectClub(club.id)}>
                {club.name}
                {club.location ? ` (${club.location})` : ''}
              </button>
            </li>
          ))}
      </ul>
    </main>
  )
}
