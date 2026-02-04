'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function PlayerDashboard() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading…</div>
  }

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>
  }

  return (
    <div>
      Player dashboard
    </div>
  )
}
