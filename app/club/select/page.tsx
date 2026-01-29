'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../lib/AuthContext'
import { useRouter } from 'next/navigation'

type Club = {
  id: string
  name: string
  location: string | null
}

export default function SelectClub() {
  const { user } = useAuth()
  const router = useRouter()

  const [clubs, setClubs] = useState<Club[]>([])
  const [search, setSearch] = useState('')
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadClubs = async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('id, name, location')
        .order('name')

      if (error) {
        setError(error.message)
      } else {
        setClubs(data ?? [])
      }

      setLoading(false)
    }

    loadClubs()
  }, [])

  if (!user) {
    return <p style={{ padding: 24 }}>Loading…</p>
  }

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  )

  const confirmClub = async () => {
    if (!selectedClub) return

    const { error } = await supabase
      .from('profiles')
      .update({ club_id: selectedClub.id })
      .eq('id', user.id)

    if (error) {
      setError(error.message)
      return
    }

    router.replace('/')
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Select your club</h1>

      <input
        placeholder="Search club name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: 16 }}>
        {loading && <p>Loading clubs…</p>}

        {!loading &&
          filteredClubs.map((club) => (
            <div key={club.id} style={{ marginBottom: 8 }}>
              <label>
                <input
                  type="radio"
                  name="club"
                  checked={selectedClub?.id === club.id}
                  onChange={() => setSelectedClub(club)}
                />
                {' '}
                {club.name}
                {club.location ? ` (${club.location})` : ''}
              </label>
            </div>
          ))}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        disabled={!selectedClub}
        onClick={confirmClub}
        style={{ marginTop: 16 }}
      >
        Join club
      </button>
    </main>
  )
}
