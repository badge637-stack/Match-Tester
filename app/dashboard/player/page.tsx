'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'
export default function PlayerDashboard() {
  const { user, loading } = useAuth()

  return (
    <div>
      Player dashboard
    </div>
  )
}
