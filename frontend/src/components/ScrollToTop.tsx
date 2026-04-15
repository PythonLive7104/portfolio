import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to top on client-side route changes (Link / navigate). */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // `html { scroll-behavior: smooth }` would animate this; nav should jump to top immediately.
    const root = document.documentElement
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    root.style.removeProperty('scroll-behavior')
  }, [pathname])

  return null
}
