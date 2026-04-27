import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchSiteProfile } from '../lib/apiClient'
import type { SiteProfile } from '../types/api'

type SiteProfileContextValue = {
  profile: SiteProfile | null
  /** True after the initial fetch settles (success or failure). */
  ready: boolean
}

const SiteProfileContext = createContext<SiteProfileContextValue | null>(null)

export function SiteProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<SiteProfile | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchSiteProfile()
      .then((p) => {
        if (!cancelled) setProfile(p)
      })
      .catch(() => {
        if (!cancelled) setProfile(null)
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <SiteProfileContext.Provider value={{ profile, ready }}>{children}</SiteProfileContext.Provider>
  )
}

export function useSiteProfile(): SiteProfileContextValue {
  const ctx = useContext(SiteProfileContext)
  if (!ctx) {
    throw new Error('useSiteProfile must be used within SiteProfileProvider')
  }
  return ctx
}
