import { CTASection } from '../components/CTASection'

export function AboutPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-wider text-violet-400/90">About</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Building dependable SaaS with a design-led mindset.
        </h1>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-zinc-400">
            <p>
              I&apos;m a full-stack developer who splits time between expressive React interfaces and disciplined
              Django services. SaaS is my focus — subscription logic, team permissions, integrations, and the long
              tail of production concerns that turn a prototype into a business.
            </p>
            <p>
              On the frontend I care about perceived performance, accessible patterns, and interfaces that feel as
              polished as the products you admire. On the backend I lean on Django REST Framework for clear
              boundaries, explicit serializers, and APIs that mobile and web clients can trust.
            </p>
            <p>
              Whether you need a greenfield build, a rewrite, or targeted upgrades to your billing and ops stack,
              I work in tight feedback loops with product and design.
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
