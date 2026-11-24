import { Link } from 'react-router-dom'
import { CTASection } from '../components/CTASection'

interface Service {
  id: string
  name: string
  tagline: string
  /** The commercial problem a buyer recognises in their own business. */
  problem: string
  bestFor: string
  includes: string[]
  from: string
  typical: string
}

const services: Service[] = [
  {
    id: 'saas',
    name: 'SaaS & Web Application Development',
    tagline: 'Subscription products, internal platforms, and the MVP that has to win a funding round.',
    problem:
      'You have a product idea or a manual process that has outgrown spreadsheets, and the build keeps stalling because nobody owns the whole stack — auth, billing, permissions, data model and deployment.',
    bestFor: 'Startup founders, agencies with a product idea, operations teams replacing spreadsheets',
    includes: [
      'Multi-tenant architecture with organisations, teams, seats and invites',
      'Authentication, role-based permissions and audit trails',
      'Subscription billing with Stripe or Paystack — upgrades, downgrades, proration, dunning',
      'Admin dashboard and user management built for real support work',
      'Database design, migrations and indexes tuned for list screens and exports',
      'Deployment, CI/CD, monitoring and a handover runbook',
    ],
    from: '$6,000',
    typical: '$6,000 – $20,000 · 4–10 weeks',
  },
  {
    id: 'ai-automation',
    name: 'AI Automation & Integration',
    tagline: 'Agents and workflows that remove recurring manual work, with logs you can audit.',
    problem:
      'Your team re-keys data between tools, answers the same questions repeatedly, and chases approvals by email. Off-the-shelf automation breaks the moment the process has an exception.',
    bestFor: 'SMBs with manual back-office work, agencies, ops and support teams',
    includes: [
      'AI agents scoped to one business task, with tool calling and guardrails',
      'Workflow automation across your existing tools via n8n, webhooks and REST APIs',
      'Claude and OpenAI integrations chosen on cost and latency, not hype',
      'Human-in-the-loop review steps wherever a wrong answer would be expensive',
      'Execution logs, retries and error handling so failures surface instead of hiding',
      'Monitoring dashboard showing what ran, what was skipped, and why',
    ],
    from: '$1,500',
    typical: '$1,500 – $6,000 · 1–4 weeks',
  },
  {
    id: 'ai-software',
    name: 'Custom AI Software',
    tagline: 'Document processing, extraction and reporting systems — the InvoiceParsed pattern, applied to your domain.',
    problem:
      'Information your business runs on is locked in PDFs, scans and email attachments. Staff retype it, errors slip through, and nobody can report on it until someone builds a spreadsheet.',
    bestFor: 'Finance, legal, logistics, insurance and procurement teams',
    includes: [
      'Upload and ingest PDFs, images and scans at volume',
      'Structured extraction with per-field confidence scoring and a review queue',
      'Validation rules and matching against your existing records',
      'Retrieval-augmented search over your document history with source attribution',
      'Reporting, exports and a REST API so downstream systems can consume the output',
      'Privacy posture: retention limits, PII handling, environment separation',
    ],
    from: '$3,000',
    typical: '$3,000 – $9,000 · 3–6 weeks',
  },
  {
    id: 'backend',
    name: 'Backend & API Development',
    tagline: 'Django REST APIs that stay maintainable after you hand them to the next developer.',
    problem:
      'You have a frontend team, a mobile app, or an integration partner waiting on an API — or an existing backend that has become slow, undocumented and risky to change.',
    bestFor: 'Teams with a frontend but no backend, founders inheriting legacy code, integration projects',
    includes: [
      'Django REST Framework APIs with explicit contracts and predictable errors',
      'Authentication and authorisation: session, JWT, API keys, scoped permissions',
      'Payment and third-party API integrations with idempotent, replay-safe webhooks',
      'Database architecture, query optimisation and background jobs with Celery',
      'OpenAPI documentation so your frontend team is never guessing',
      'Backends that serve React and Next.js clients without CORS or auth surprises',
    ],
    from: '$1,500',
    typical: '$1,500 – $5,000 · 2–5 weeks',
  },
  {
    id: 'web',
    name: 'Website Development',
    tagline: 'Fast, well-built business sites — the entry point to a longer engagement.',
    problem:
      'Your site is slow, dated, or does not convert. It was built on a page builder nobody wants to touch, and every change needs the original agency.',
    bestFor: 'Small and mid-sized businesses, consultants, agencies needing a white-label build partner',
    includes: [
      'Business, corporate and portfolio sites in React or Next.js',
      'High-converting landing pages wired to analytics and your CRM',
      'E-commerce builds and payment integration',
      'Redesign and modernisation of an existing site without losing SEO',
      'Core Web Vitals, accessibility and responsive behaviour as standard',
      'A CMS or admin so you can edit content without calling a developer',
    ],
    from: '$600',
    typical: '$600 – $3,500 · 1–3 weeks',
  },
]

const retainers = [
  {
    name: 'Paid discovery',
    price: '$500 – $1,500',
    cadence: 'one-off, 3–5 days',
    blurb:
      'Before a large build: requirements, architecture, data model, risks and a fixed-price proposal. Credited against the project if you proceed.',
  },
  {
    name: 'Maintenance & support',
    price: '$400 – $1,500',
    cadence: 'per month',
    blurb:
      'Dependency updates, monitoring, bug fixes, backups and a guaranteed response time. For products already in production.',
  },
  {
    name: 'Development retainer',
    price: '$2,500 – $8,000',
    cadence: 'per month',
    blurb:
      'A reserved block of days each month for continuous feature work. Priority scheduling, no re-scoping, no proposal round-trips.',
  },
]

export function ServicesPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-wider text-violet-400/90">Services</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Software that solves a commercial problem, priced on the value it returns.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Five ways I work with clients. Every engagement starts with the business problem — what it
          currently costs you in hours, errors or lost revenue — and is scoped against that, not against
          a list of features.
        </p>

        <div className="mt-16 space-y-6">
          {services.map((s, i) => (
            <section
              key={s.id}
              className="gradient-border rounded-2xl bg-zinc-900/30 p-6 ring-1 ring-white/[0.05] transition-colors duration-300 hover:bg-zinc-900/50 sm:p-8"
              aria-labelledby={`${s.id}-heading`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-sky-400/80">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 id={`${s.id}-heading`} className="text-xl font-semibold text-white sm:text-2xl">
                      {s.name}
                    </h2>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-zinc-300">{s.tagline}</p>

                  <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/20 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      The problem it solves
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.problem}</p>
                  </div>

                  <p className="mt-5 text-sm text-zinc-500">
                    <span className="font-medium text-zinc-400">Best for:</span> {s.bestFor}
                  </p>
                </div>

                <div className="lg:w-[46%] lg:shrink-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    What&apos;s included
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {s.includes.map((line) => (
                      <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                        <span
                          className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-sky-500/80"
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-white/[0.06] pt-5">
                    <span className="text-2xl font-semibold text-white">from {s.from}</span>
                    <span className="text-sm text-zinc-500">{s.typical}</span>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-20" aria-labelledby="retainers-heading">
          <h2 id="retainers-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Ongoing work
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Most projects are worth more to both sides as a relationship than as a one-off build.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {retainers.map((r) => (
              <div
                key={r.name}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 ring-1 ring-white/[0.05]"
              >
                <p className="font-medium text-white">{r.name}</p>
                <p className="mt-3 text-xl font-semibold text-sky-300/90">{r.price}</p>
                <p className="text-xs uppercase tracking-wide text-zinc-500">{r.cadence}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{r.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-white/[0.06] bg-zinc-900/30 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">How pricing works</h2>
          <div className="mt-5 grid gap-x-10 gap-y-4 text-sm leading-relaxed text-zinc-400 sm:grid-cols-2">
            <p>
              <span className="font-medium text-zinc-300">Fixed price by default.</span> You know the
              number before work starts. Scope is written down, and changes to it are quoted separately
              rather than absorbed silently.
            </p>
            <p>
              <span className="font-medium text-zinc-300">Hourly where scope is genuinely unknown</span> —
              legacy debugging, incident work, or exploratory integration against an undocumented API.
            </p>
            <p>
              <span className="font-medium text-zinc-300">Two revision rounds included</span> per
              milestone, against the agreed scope. Further rounds are billed — this keeps projects
              finishing rather than drifting.
            </p>
            <p>
              <span className="font-medium text-zinc-300">Staged payments.</span> A deposit to start,
              then payments against milestones you have seen working, not against calendar dates.
            </p>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Ranges above reflect typical scope for clients in the US, UK, Canada and Australia. Smaller
            budgets are worth a conversation — a tighter first phase often beats a compromised full build.
          </p>
        </section>

        <div className="mt-10">
          <Link
            to="/projects"
            className="text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            See how this works in practice — case studies →
          </Link>
        </div>
      </div>

      <CTASection
        title="Tell me what the problem is costing you."
        description="A short call, then a written scope and fixed price. No obligation, and no pressure to buy the largest version."
      />
    </div>
  )
}
