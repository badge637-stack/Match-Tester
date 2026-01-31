'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

function AuthInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role = searchParams.get('role') // 'player' | 'fan'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAuth = async (type: 'signin' | 'signup') => {
    setError(null)
    setLoading(true)

    const result =
      type === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })

    if (result.error) {
      setError(result.error.message)
      setLoading(false)
      return
    }

    // save role on the user
    if (role) {
      await supabase.auth.updateUser({
        data: { role },
      })
    }

    // 🔴 CRITICAL FIX:
    // wait until Supabase confirms the session exists
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      router.replace('/')
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{role === 'player' ? 'Player' : 'Fan'} sign in</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button disabled={loading} onClick={() => handleAuth('signin')}>
        Sign in
      </button>

      <br />

      <button disabled={loading} onClick={() => handleAuth('signup')}>
        Create account
      </button>
    </main>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<p style={{ padding: 24 }}>Loading…</p>}>
      <AuthInner />
    </Suspense>
  )
}
