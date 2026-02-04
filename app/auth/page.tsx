'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const signIn = async () => {
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    // 🔑 WAIT until session exists
    const { data } = await supabase.auth.getSession()

    if (data.session) {
      router.replace('/dashboard/player')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Sign in</h1>

        <input
          className="w-full p-2 rounded bg-black border border-gray-700"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-black border border-gray-700"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={signIn}
          className="w-full bg-white text-black py-2 rounded font-semibold"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}
