import { CTASection } from '../components/CTASection'

export function AboutPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-wider text-violet-400/90">About</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          I build software that has to survive contact with real customers.
        </h1>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-zinc-400">
            <p>
              I&apos;m an AI software developer working with startups, agencies and established businesses in the
              US, UK, Canada and Australia. My work sits where SaaS, business automation and applied AI meet —
              Python and Django on the backend, React and Next.js on the front, and Claude or OpenAI wherever a
              model genuinely does the job better than code.
            </p>
            <p>
              The difference between a demo and a product is everything that happens after launch: billing edge
              cases, permission boundaries, webhook replays, a bookkeeper who pastes a scanned PDF you never
              anticipated. I build for that second category, because I run my own products and live with those
              decisions.
            </p>
            <p>
              <span className="text-zinc-300">InvoiceParsed</span> extracts invoices, receipts and statements into
              structured data and matches them against purchase orders before payment.{' '}
              <span className="text-zinc-300">TryNoBot</span> scores every visitor to an ad landing page in under
              ten milliseconds to stop advertisers paying for bot clicks. Both are live, both take payment, and
              both taught me more about production software than any amount of client work alone.
            </p>
            <p>
              I work in fixed-price phases against a written scope, send progress you can click rather than status
              updates, and document the edges before handover. Most clients stay on after the first project —
              which is the only review metric I actually trust.
            </p>
          </div>
          <div className="relative">
            <div className="gradient-border relative overflow-hidden rounded-2xl bg-zinc-900/40 p-8 ring-1 ring-white/[0.05]">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-500/10 blur-[80px]" />
              <h2 className="text-lg font-semibold text-white">Principles</h2>
              <ul className="mt-6 space-y-4 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="font-mono text-sky-400">01</span>
                  <span>Ship thin vertical slices — observable end-to-end early.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-sky-400">02</span>
                  <span>Own the schema contract between client and server.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-sky-400">03</span>
                  <span>Prefer boring, reliable infra over novelty for its own sake.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-sky-400">04</span>
                  <span>Document the edges: webhooks, migrations, failure modes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CTASection
        title="Have a roadmap item that needs a senior hand?"
        description="Engagements are scoped for clarity — fractional, project-based, or retained for product iterations."
      />
    </div>
  )
}
