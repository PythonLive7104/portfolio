import { useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSiteProfile } from '../context/SiteProfileContext'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm font-medium transition-colors duration-200',
    isActive ? 'text-sky-400' : 'text-zinc-400 hover:text-white',
  ].join(' ')

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { profile } = useSiteProfile()

  const items = useMemo(() => {
    const base: { to: string; label: string }[] = [
      { to: '/', label: 'Home' },
      { to: '/projects', label: 'Projects' },
      { to: '/about', label: 'About' },
    ]
    if (profile?.resume_url) {
      base.push({ to: '/resume', label: 'Resume' })
    }
    base.push({ to: '/contact', label: 'Contact' })
    return base
  }, [profile?.resume_url])

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex min-w-0 max-w-[55%] items-center gap-2 font-semibold tracking-tight text-white transition-opacity hover:opacity-90 sm:max-w-none"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-violet-500/20 ring-1 ring-white/10">
            <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text font-mono text-sm text-transparent">
              {'</>'}
            </span>
          </span>
          <span className="truncate text-sm sm:text-base">SolomonPortfolio</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {items.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 shadow-[0_8px_24px_-8px_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-zinc-100"
          >
            Let&apos;s talk
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-300 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-zinc-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {items.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-3 py-2.5 text-center text-sm font-medium text-zinc-950"
            >
              Let&apos;s talk
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
