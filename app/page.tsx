'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [matchId, setMatchId] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const signIn = async () => {
    setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) setMessage(error.message)
    else setMessage('Signed in successfully')
  }

  const finishMatch = async () => {
    setMessage(null)
    const { error } = await supabase.rpc('finish_match', {
      match_uuid: matchId,
    })

    if (error) setMessage(error.message)
    else setMessage('Match finished successfully')
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Match Tester</h1>

      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button onClick={signIn}>Sign in</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Match UUID"
          value={matchId}
          onChange={e => setMatchId(e.target.value)}
        />
        <br />
        <button onClick={finishMatch}>Finish match</button>
      </div>

      {message && <p>{message}</p>}
    </main>
  )
}
