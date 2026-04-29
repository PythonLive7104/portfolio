import { Link } from 'react-router-dom'
import type { ProjectListItem } from '../types/api'

interface ProjectCardProps {
  project: ProjectListItem
}

function CaseStudyBlock({
  label,
  children,
  clampClass = 'line-clamp-2',
}: {
  label: string
  children: React.ReactNode
  clampClass?: string
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{label}</p>
      <div className={`mt-1 text-sm leading-relaxed text-zinc-400 ${clampClass}`}>{children}</div>
    </div>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasCaseStudy =
    typeof project.problem === 'string' &&
    project.problem.length > 0 &&
    typeof project.solution === 'string' &&
    project.solution.length > 0

  const featurePreview = project.features?.slice(0, 3) ?? []

  return (
    <article className="group relative">
      <div className="gradient-border relative h-full overflow-hidden rounded-2xl bg-zinc-900/40 ring-1 ring-white/[0.05] transition-all duration-500 hover:-translate-y-1 hover:ring-sky-500/20">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image_url}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((t) => (
              <span
                key={t.id}
                className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-200 backdrop-blur-md"
              >
                {t.label}
              </span>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] text-zinc-400 backdrop-blur-md">
                +{project.tech_stack.length - 4}
              </span>
            )}
          </div>
        </div>
        <div className="relative p-5">
          <h3 className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-sky-300">
            {project.title}
          </h3>

          {hasCaseStudy ? (
            <div className="mt-4 space-y-3">
              <CaseStudyBlock label="Problem">{project.problem}</CaseStudyBlock>
              <CaseStudyBlock label="What I built">{project.solution}</CaseStudyBlock>
              {featurePreview.length > 0 ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Key features</p>
                  <ul className="mt-2 space-y-1.5">
                    {featurePreview.map((f) => (
                      <li key={f} className="flex gap-2 text-sm leading-snug text-zinc-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-500/80" aria-hidden />
                        <span className="line-clamp-2">{f}</span>
                      </li>
                    ))}
                  </ul>
                  {(project.features?.length ?? 0) > 3 ? (
                    <p className="mt-1 text-xs text-zinc-600">
                      +{(project.features?.length ?? 0) - 3} more in case study
                    </p>
                  ) : null}
                </div>
              ) : null}
              {project.result ? (
                <CaseStudyBlock label="Result" clampClass="line-clamp-2">
                  {project.result}
                </CaseStudyBlock>
              ) : null}
            </div>
          ) : (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">{project.short_description}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
              onClick={(e) => e.stopPropagation()}
            >
              Live demo
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <Link
              to={`/projects/${project.slug}`}
              className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              Case study
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
