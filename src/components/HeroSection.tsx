import { Link } from 'react-router-dom'

export interface HeroSectionProps {
  profileImageUrl?: string | null
  profileImageAlt?: string
}

export function HeroSection({ profileImageUrl, profileImageAlt }: HeroSectionProps) {
  const hasPortrait = Boolean(profileImageUrl)

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={
            hasPortrait
              ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] lg:items-center lg:gap-x-12 lg:gap-y-10'
              : undefined
          }
        >
          <div className={hasPortrait ? 'min-w-0 max-w-3xl' : 'max-w-3xl'}>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-sky-300/90 shadow-[var(--shadow-glow)] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Available for SaaS &amp; product engineering
            </p>
            <h1 className="mt-8 bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              I build scalable products with React, Django, and DRF — and provide deployment support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Full-stack developer focused on subscription SaaS — crisp frontends, observable APIs, and
              integrations that hold up in production. From first pixel to first webhook, shipped with
              care.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/30"
              >
                View work
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06]"
              >
                Start a conversation
              </Link>
            </div>
          </div>

          {hasPortrait ? (
            <div className="mt-14 flex justify-center lg:mt-0 lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky-500/20 via-transparent to-violet-600/20 blur-2xl" />
                <div className="gradient-border relative overflow-hidden rounded-3xl bg-zinc-900/40 p-1 ring-1 ring-white/[0.06]">
                  <img
                    src={profileImageUrl!}
                    alt={profileImageAlt?.trim() || 'Profile photo'}
                    className="aspect-[4/5] w-full rounded-[1.35rem] object-cover sm:aspect-square"
                    width={640}
                    height={640}
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { k: 'Stack', v: 'React · Django · DRF' },
            { k: 'Focus', v: 'B2B SaaS & billing' },
            { k: 'Delivery', v: 'API-first, observable' },
          ].map((item) => (
            <div
              key={item.k}
              className="gradient-border rounded-2xl bg-zinc-900/30 p-5 ring-1 ring-white/[0.04] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{item.k}</p>
              <p className="mt-2 text-sm font-medium text-zinc-200">{item.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
