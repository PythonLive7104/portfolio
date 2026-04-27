import { Link } from 'react-router-dom'

interface CTASectionProps {
  title?: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export function CTASection({
  title = 'Ready to ship your next SaaS milestone?',
  description = 'Tell me about your product, timeline, and stack. I respond within one business day.',
  primaryLabel = 'Get in touch',
  primaryTo = '/contact',
  secondaryLabel = 'Browse projects',
  secondaryTo = '/projects',
}: CTASectionProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-zinc-900/80 to-violet-600/10 p-10 sm:p-14 lg:p-16">
          <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sky-500/20 blur-[100px]" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={primaryTo}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {primaryLabel}
              </Link>
              <Link
                to={secondaryTo}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
