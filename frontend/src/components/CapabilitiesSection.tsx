const caps = [
  {
    title: 'API & platform design',
    summary:
      'REST APIs that stay maintainable as your product grows — explicit contracts, predictable errors, and room for web and mobile clients.',
    details: [
      'Django REST Framework: nested serializers, pagination, filtering, and OpenAPI-friendly structure when you need it.',
      'Auth patterns: session + JWT for SPAs, API keys for integrations, scoped permissions per workspace.',
      'Rate limiting, request IDs, and structured logging so incidents are traceable, not guessed.',
      'Database modeling with migrations, indexes, and query patterns tuned for list screens and exports.',
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'SaaS delivery',
    summary:
      'Shipping software as a service means more than CRUD: tenants, roles, and auditability under real business rules.',
    details: [
      'Multi-tenant data isolation and organization hierarchies (teams, seats, invites) without leaking context.',
      'Role-based access control, impersonation safeguards, and audit trails for compliance-minded buyers.',
      'Feature flags and gradual rollout hooks so you can ship safely to subsets of customers.',
      'Background jobs (e.g. Celery) for emails, reports, and long-running imports without blocking the UI.',
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: 'AI integration',
    summary:
      'Practical AI features: augment workflows without handing your data to black-box prompts or silent failures.',
    details: [
      'LLM-backed summaries, classification, and drafting with clear user review steps and fallbacks.',
      'Retrieval-style patterns: chunking, metadata filters, and source attribution so answers stay grounded.',
      'Cost and latency awareness: caching, batching, and model selection appropriate to the task.',
      'Privacy posture: PII handling, retention limits, and environment separation for dev vs production.',
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: 'Payments & billing',
    summary:
      'Revenue-critical flows: subscriptions, invoices, and payouts need correctness first, dashboards second.',
    details: [
      'Stripe Billing and Customer Portal patterns for upgrades, downgrades, and proration.',
      'Connect and marketplace-style splits when your product moves money between parties.',
      'Webhooks processed idempotently with replay safety, signature verification, and reconciliation reports.',
      'Usage metering and plan limits surfaced in-product, with admin tooling for support overrides.',
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
]

export function CapabilitiesSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 ring-1 ring-white/[0.04]" aria-labelledby="capabilities-heading">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="capabilities-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Capabilities
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:text-lg">
            End-to-end ownership across the SaaS surface area — from customer-facing UX to money-moving integrations.
            Below is how that shows up in concrete engagements: architecture decisions, delivery habits, and the kind of
            systems you can run in production.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {caps.map((c) => (
            <div
              key={c.title}
              className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-zinc-900/30 p-6 transition-all duration-300 hover:border-sky-500/20 hover:bg-zinc-900/50 sm:p-7"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/15 to-violet-500/15 text-sky-300 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
                {c.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.summary}</p>
                <ul className="mt-4 space-y-2.5 border-t border-white/[0.06] pt-4">
                  {c.details.map((line) => (
                    <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-zinc-500">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-500/80" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
