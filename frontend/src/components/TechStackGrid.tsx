import type { TechBadge } from '../types/api'

interface TechStackGridProps {
  items: TechBadge[]
  title?: string
  subtitle?: string
}

export function TechStackGrid({
  items,
  title = 'Tech stack',
  subtitle = 'Tools I reach for when shipping production SaaS.',
}: TechStackGridProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-zinc-400">{subtitle}</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((t, i) => (
            <div
              key={t.id}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-4 transition-all duration-300 hover:border-sky-500/30 hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.35)]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-transparent to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-medium text-zinc-100">{t.label}</span>
                {t.category && (
                  <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                    {t.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
