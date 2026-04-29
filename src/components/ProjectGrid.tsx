import type { ProjectListItem } from '../types/api'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: ProjectListItem[]
  emptyMessage?: string
}

export function ProjectGrid({ projects, emptyMessage = 'No projects yet.' }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="rounded-2xl border border-white/10 bg-zinc-900/40 py-16 text-center text-sm text-zinc-500">
        {emptyMessage}
      </p>
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
