'use client'

import { useAuth } from '../../../lib/AuthContext'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateProfile() {
  const { user } = useAuth()
  const router = useRouter()

  const role = user?.user_metadata?.role
  const [displayName, setDisplayName] = useState('')
  const [position, setPosition] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!user || !role) {
    return <p style={{ padding: 24 }}>Loading…</p>
  }

  const saveProfile = async () => {
    const { error } = await supabase.from('profiles').insert({
      id: user.id,
      role,
      display_name: displayName,
      position: role === 'player' ? position : null,
    })

    if (error) {
      setError(error.message)
      return
    }

    router.replace('/')
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Create your profile</h1>

      <input
        placeholder="Display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <br />

      {role === 'player' && (
        <>
          <input
            placeholder="Position (e.g. CM, ST)"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <br />
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={saveProfile}>Save profile</button>
    </main>
  )
}
