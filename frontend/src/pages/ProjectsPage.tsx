import { useEffect, useState } from 'react'
import { ProjectGrid } from '../components/ProjectGrid'
import { fetchProjects } from '../lib/apiClient'
import type { ProjectListItem } from '../types/api'

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await fetchProjects()
        if (!cancelled) setProjects(data)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-wider text-sky-400/90">Portfolio</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          A curated set of SaaS builds from recent collaborations — swap this grid for a DRF list endpoint when your
          CMS is live.
        </p>
        <div className="mt-14">
          {error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[420px] animate-pulse rounded-2xl border border-white/5 bg-zinc-900/50" />
              ))}
            </div>
          ) : (
            <ProjectGrid projects={projects} />
          )}
        </div>
      </div>
    </div>
  )
}
