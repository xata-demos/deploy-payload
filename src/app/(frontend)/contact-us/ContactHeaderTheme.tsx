'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useEffect } from 'react'

export function ContactHeaderTheme() {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')

    return () => setHeaderTheme(null)
  }, [setHeaderTheme])

  return null
}
