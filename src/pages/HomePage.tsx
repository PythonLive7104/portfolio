import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CapabilitiesSection } from '../components/CapabilitiesSection'
import { CTASection } from '../components/CTASection'
import { HeroSection } from '../components/HeroSection'
import { ProjectGrid } from '../components/ProjectGrid'
import { TechStackGrid } from '../components/TechStackGrid'
import { TestimonialCard } from '../components/TestimonialCard'
import { useSiteProfile } from '../context/SiteProfileContext'
import {
  fetchFeaturedProjects,
  fetchHomeTechStack,
  fetchTestimonials,
  isUsingMockData,
  resolvedApiBase,
} from '../lib/apiClient'
import { mediaUrlForClient } from '../lib/mediaUrl'
import type { ProjectListItem, TechBadge, Testimonial } from '../types/api'

export function HomePage() {
  const { profile: siteProfile } = useSiteProfile()
  const [featured, setFeatured] = useState<ProjectListItem[]>([])
  const [homeTech, setHomeTech] = useState<TechBadge[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoadError(null)
      try {
        const [projects, tech, quotes] = await Promise.all([
          fetchFeaturedProjects(3),
          fetchHomeTechStack(),
          fetchTestimonials(),
        ])
        if (!cancelled) {
          setFeatured(projects)
          setHomeTech(tech)
          setTestimonials(quotes)
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : 'Failed to load content')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <HeroSection
        profileImageUrl={mediaUrlForClient(siteProfile?.profile_image_url ?? null)}
        profileImageAlt={siteProfile?.profile_image_alt}
      />
      <TechStackGrid items={homeTech} />
      {loadError && (
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <p className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            {loadError}. API base in this build:{' '}
            <span className="font-mono text-amber-50/90">{resolvedApiBase}</span>
            {isUsingMockData
              ? ' (mock data mode).'
              : '. On the server, set VITE_API_URL=/api (same origin as nginx) — not localhost or backend.'}
          </p>
        </div>
      )}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Featured projects</h2>
              <p className="mt-3 max-w-xl text-zinc-400">
                Selected case studies across billing, operations, and client portals — each built with React
                frontends and Django/DRF backends.
              </p>
            </div>
            <Link
              to="/projects"
              className="text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              View all →
            </Link>
          </div>
          <div className="mt-12">
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[420px] animate-pulse rounded-2xl border border-white/5 bg-zinc-900/50"
                  />
                ))}
              </div>
            ) : (
              <ProjectGrid projects={featured} />
            )}
          </div>
        </div>
      </section>
      <CapabilitiesSection />
      <section className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="testimonials-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            What partners say
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Testimonials mirror how you might load `Testimonial` records from DRF — typed and ready to swap for
            API data.
          </p>
          {loading ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl border border-white/5 bg-zinc-900/50" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </>
  )
}
