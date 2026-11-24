import { Link } from 'react-router-dom'

const helpItems = [
  'Turn a manual, spreadsheet-driven process into a real product',
  'Launch a SaaS MVP that can take payments on day one',
  'Automate recurring back-office work with AI agents and n8n',
  'Extract business data out of PDFs, scans and email attachments',
  'Build the Django REST API your frontend or mobile team is waiting on',
  'Take over a backend that has become slow, undocumented and risky to change',
]

const services = [
  {
    label: 'SaaS & Web Applications',
    price: 'from $6,000',
    blurb: 'Multi-tenant products with auth, billing, roles and an admin that support can actually use.',
  },
  {
    label: 'AI Automation & Integration',
    price: 'from $1,500',
    blurb: 'Agents and workflows that remove repeat manual work — with logs, retries and human review.',
  },
  {
    label: 'Custom AI Software',
    price: 'from $3,000',
    blurb: 'Document processing, extraction and reporting systems built for a specific business domain.',
  },
  {
    label: 'Backend & API Development',
    price: 'from $1,500',
    blurb: 'Django REST APIs, payment integrations, and webhooks that survive replays and retries.',
  },
  {
    label: 'Website Development',
    price: 'from $600',
    blurb: 'Business sites and landing pages in React or Next.js — fast, accessible, easy to edit.',
  },
]

const whyItems = [
  {
    title: 'I run my own products in production',
    body: 'InvoiceParsed and TryNoBot are live, paying-customer SaaS products I designed, built and operate — not tutorials or portfolio filler.',
  },
  {
    title: 'I have shipped the hard parts before',
    body: 'Subscription billing, multi-tenancy, role-based approvals, idempotent webhooks, sub-10ms scoring paths. The parts that fail quietly in production.',
  },
  {
    title: 'AI where it earns its place',
    body: 'I use Claude and OpenAI for extraction, classification and drafting — with confidence scores, fallbacks and review steps. Not a chatbot bolted onto a page.',
  },
  {
    title: 'I write things down',
    body: 'Scope, architecture decisions, failure modes and a handover runbook. The next developer should not need to call me — though most clients keep me on retainer anyway.',
  },
]

export function HomeOfferSections() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="help-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="help-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            What I help businesses do
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
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 id="services-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Services
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-500">
                Starting points, not final quotes — scope decides the number. Every project is fixed-price
                against a written scope.
              </p>
            </div>
            <Link
              to="/services"
              className="text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              Full services &amp; pricing →
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.label}>
                <Link
                  to="/services"
                  className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 ring-1 ring-white/[0.05] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/25"
                >
                  <p className="font-medium text-white">{s.label}</p>
                  <p className="mt-2 text-lg font-semibold text-sky-300/90">{s.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="why-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="why-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Why work with me
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.06] bg-zinc-900/30 p-6 ring-1 ring-white/[0.04]"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
