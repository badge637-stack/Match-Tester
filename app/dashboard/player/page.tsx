'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function PlayerDashboard() {
  const { user, loading } = useAuth()

  const [displayName, setDisplayName] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchName = async () =>
