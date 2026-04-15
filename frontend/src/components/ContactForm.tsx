import { type FormEvent, useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sent')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8"
    >
      {status === 'sent' ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-6 text-center text-sm text-emerald-200">
          Thanks — your message is queued locally. Connect this form to your Django endpoint when ready.
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none ring-0 transition-[border,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/50 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]"
                placeholder="Jordan Lee"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition-[border,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/50 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]"
                placeholder="you@company.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Company <span className="font-normal text-zinc-600">(optional)</span>
            </label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition-[border,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/50 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]"
              placeholder="Acme SaaS Inc."
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition-[border,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/50 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]"
              placeholder="Goals, stack, timeline, and links to any briefs or designs."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 sm:w-auto sm:px-10"
          >
            Send message
          </button>
        </>
      )}
    </form>
  )
}
