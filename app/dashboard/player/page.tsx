'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function PlayerDashboard() {
  const { user, loading } = useAuth()

  const [displayName, setDisplayName] = useState<string | null>(null)
  const [position, setPosition] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          display_name,
          players (
            position
          )
        `)
        .eq('id', user.id)
        .single()

      if (!error && data) {
        setDisplayName(data.display_name)
        setPosition(data.players
