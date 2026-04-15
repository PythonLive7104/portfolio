import type { Testimonial } from '../types/api'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-violet-500/25 hover:shadow-[0_0_60px_-20px_rgba(167,139,250,0.25)]">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
      <blockquote className="relative text-sm leading-relaxed text-zinc-300">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption className="relative mt-6 flex items-center gap-3">
        {testimonial.avatar_url ? (
          <img
            src={testimonial.avatar_url}
            alt=""
            className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
            {testimonial.author_name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        )}
        <div>
          <div className="font-medium text-white">{testimonial.author_name}</div>
          <div className="text-xs text-zinc-500">
            {testimonial.author_role}, {testimonial.author_company}
          </div>
        </div>
      </figcaption>
    </figure>
  )
}
