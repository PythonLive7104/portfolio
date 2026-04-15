import { ContactForm } from '../components/ContactForm'

export function ContactPage() {
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
              Share your goals, stack, and timeline. This form is intentionally frontend-only — map fields to a
              Django view or DRF serializer when you connect your API.
            </p>
            <div className="mt-10 space-y-4 rounded-2xl border border-white/[0.06] bg-zinc-900/30 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Email</p>
                <a href="mailto:hello@example.com" className="mt-1 text-sm font-medium text-white hover:text-sky-300">
                  hello@example.com
                </a>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Availability</p>
                <p className="mt-1 text-sm text-zinc-400">New projects starting Q2 — limited slots.</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
