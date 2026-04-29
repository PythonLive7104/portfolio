const helpItems = [
  'Launch SaaS MVPs in weeks, not months',
  'Integrate payments (Stripe, Paystack)',
  'Add AI features that actually work in production',
  'Scale backend systems without breaking',
]

const services = [
  { label: 'SaaS MVP Build', price: '$1,000+' },
  { label: 'AI Integration', price: '$500+' },
  { label: 'Backend/API Systems', price: '$700+' },
]

const whyItems = [
  "I've built real SaaS products (not just tutorials)",
  'I understand billing, subscriptions, and real-world systems',
  'I ship fast using AI tools like Cursor',
  'I deploy and manage production systems',
]

export function HomeOfferSections() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="help-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="help-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            🚀 What I help businesses do:
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {helpItems.map((line) => (
              <li
                key={line}
                className="flex gap-3 rounded-2xl border border-white/[0.06] bg-zinc-900/30 px-5 py-4 text-zinc-300 ring-1 ring-white/[0.04]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="services-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            💼 Services
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-500">
            Starting ranges — final scope depends on your product. Helps align expectations early.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {services.map((s) => (
              <li
                key={s.label}
                className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 ring-1 ring-white/[0.05]"
              >
                <p className="font-medium text-white">{s.label}</p>
                <p className="mt-2 text-lg font-semibold text-sky-300/90">{s.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="why-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="why-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Why work with me?
          </h2>
          <ul className="mt-8 space-y-4">
            {whyItems.map((line) => (
              <li key={line} className="flex gap-3 text-base leading-relaxed text-zinc-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
