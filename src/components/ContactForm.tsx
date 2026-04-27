import { type FormEvent, useState } from 'react'

function contactEndpoint(): string {
  const base = (import.meta.env.VITE_CONTACT_API_BASE ?? '').trim().replace(/\/$/, '')
  return `${base}/api/contact`
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const company = String(fd.get('company') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()

    setStatus('sending')
    setErrorMessage(null)

    try {
      const res = await fetch(contactEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company: company || undefined, message }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error ?? `Request failed (${res.status})`)
        return
      }

      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage('Network error — is the contact API running?')
    }
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className="space-y-5 rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8"
    >
      {status === 'sent' ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-6 text-center text-sm text-emerald-200">
          Thanks — your message was sent. I&apos;ll get back to you soon.
        </div>
      ) : (
        <>
          {status === 'error' && errorMessage ? (
            <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          ) : null}
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
                disabled={status === 'sending'}
                className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none ring-0 transition-[border,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/50 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)] disabled:opacity-60"
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
                disabled={status === 'sending'}
                className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition-[border,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/50 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)] disabled:opacity-60"
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
              disabled={status === 'sending'}
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition-[border,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/50 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)] disabled:opacity-60"
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
              disabled={status === 'sending'}
              className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition-[border,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/50 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)] disabled:opacity-60"
              placeholder="Goals, stack, timeline, and links to any briefs or designs."
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </>
      )}
    </form>
  )
}
