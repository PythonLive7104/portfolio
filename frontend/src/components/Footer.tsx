import { Link } from 'react-router-dom'
import { useSiteProfile } from '../context/SiteProfileContext'

const year = new Date().getFullYear()

export function Footer() {
  const { profile, ready } = useSiteProfile()

  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 font-semibold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-violet-500/20 ring-1 ring-white/10">
                <span className="font-mono text-xs text-sky-400">{'</>'}</span>
              </span>
              SolomonPortfolio
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
              Full-stack engineer building SaaS products with React, Django, and Django REST Framework —
              from polished UX to resilient APIs.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Navigate</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>
                <Link to="/projects" className="transition-colors hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-white">
                  About
                </Link>
              </li>
              {profile?.resume_url ? (
                <li>
                  <Link to="/resume" className="transition-colors hover:text-white">
                    Resume
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Social</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {profile?.github_url ? (
                <li>
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
              ) : null}
              {profile?.linkedin_url ? (
                <li>
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
              ) : null}
              {profile?.contact_email ? (
                <li>
                  <a href={`mailto:${profile.contact_email}`} className="transition-colors hover:text-white">
                    Email
                  </a>
                </li>
              ) : null}
              {ready &&
              profile &&
              !profile.github_url &&
              !profile.linkedin_url &&
              !profile.contact_email ? (
                <li className="text-zinc-600">Add links in Django admin → Site profile.</li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>© {year} — Crafted for SaaS teams.</p>
        </div>
      </div>
    </footer>
  )
}
