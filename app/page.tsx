'use client'

import { useAuth } from '../lib/AuthContext'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p style={{ padding: 24 }}>Loading…</p>
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Project 90</h1>

      {user ? (
        <p>Signed in as {user.email}</p>
      ) : (
        <p>Not signed in</p>
      )}
    </main>
  )
}
