'use client'

import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()

  return (
    <main style={{ padding: 24 }}>
      <h1>Project 90</h1>
      <p>Your game. Your glory.</p>

      <div style={{ marginTop: 24 }}>
        <button onClick={() => router.push('/auth?role=player')}>
          I’m a player
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => router.push('/auth?role=fan')}>
          I’m a fan
        </button>
      </div>
    </main>
  )
}
