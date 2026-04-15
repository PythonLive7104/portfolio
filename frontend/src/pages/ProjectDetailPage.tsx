import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProjectBySlug } from '../lib/apiClient'
import type { ProjectDetail } from '../types/api'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<ProjectDetail | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!slug) {
        setProject(null)
        return
      }
      const data = await fetchProjectBySlug(slug)
      if (!cancelled) setProject(data)
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (project === undefined) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-zinc-800" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-zinc-900" />
      </div>
    )
  }

  if (project === null) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-semibold text-white">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-block text-sm font-medium text-sky-400 hover:text-sky-300">
          ← Back to projects
        </Link>
      </div>
    )
  }

  return (
    <article className="pb-24">
      <header className="border-b border-white/[0.06] bg-zinc-950/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
          >
            ← All projects
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech_stack.map((t) => (
              <span
                key={t.id}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300"
              >
                {t.label}
              </span>
            ))}
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">{project.short_description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.02]"
            >
              Live demo
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden bg-zinc-900">
        {project.image_url ? (
          <>
            <img src={project.image_url} alt="" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
          </>
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-zinc-500">
            No hero image — add “Image” on the project or an image under Screenshots in admin.
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-16 max-w-none">
          <ContentBlock title="Overview" body={project.overview} />
          <ContentBlock title="Problem" body={project.problem} />
          <ContentBlock title="Solution" body={project.solution} />

          <section className="mt-14">
            <h2 className="text-xl font-semibold text-white">Features</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-semibold text-white">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech_stack.map((t) => (
                <span
                  key={t.id}
                  className="rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200"
                >
                  {t.label}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-xl font-semibold text-white">Screenshots</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.screenshots.map((s) => (
                <figure
                  key={s.id}
                  className="overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/40 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <img src={s.url} alt={s.caption ?? ''} className="aspect-video w-full object-cover" />
                  {s.caption && (
                    <figcaption className="border-t border-white/[0.06] px-4 py-3 text-sm text-zinc-400">
                      {s.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}

function ContentBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">{body}</p>
    </section>
  )
}
