import { ContactForm } from '../components/ContactForm'
import { useSiteProfile } from '../context/SiteProfileContext'

export function ContactPage() {
  const { profile } = useSiteProfile()

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-sky-400/90">Contact</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Tell me about what you&apos;re building.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Tell me what the problem is costing you today — in hours, errors, or lost revenue. I&apos;ll reply
              with an honest view of whether I&apos;m the right person for it, a rough price, and what I&apos;d
              need to know to be precise. No pitch deck, no pressure.
            </p>
            <div className="mt-10 space-y-4 rounded-2xl border border-white/[0.06] bg-zinc-900/30 p-6">
              {profile?.contact_email ? (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Email</p>
                  <a
                    href={`mailto:${profile.contact_email}`}
                    className="mt-1 text-sm font-medium text-white hover:text-sky-300"
                  >
                    {profile.contact_email}
                  </a>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Email</p>
                  <p className="mt-1 text-sm text-zinc-500">Use the form and I will reply within one business day.</p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Availability</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-emerald-300/90">
                  <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" aria-hidden />
                  Taking on new projects now
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Most builds start within 1–2 weeks of an agreed scope. Short, well-defined work can usually
                  start sooner.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Response time</p>
                <p className="mt-1 text-sm text-zinc-400">Within one business day, every time.</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Working hours</p>
                <p className="mt-1 text-sm text-zinc-400">
                  WAT (UTC+1) — full overlap with UK and EU hours, and with US mornings.
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
