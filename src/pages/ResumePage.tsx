import { useSiteProfile } from '../context/SiteProfileContext'

export function ResumePage() {
  const { profile, ready } = useSiteProfile()
  /** Absolute URL from the API so the PDF is loaded from Django; framing requires X-Frame-Options exempt on /media/ (see config/urls.py). */
  const url = profile?.resume_url?.trim() || null

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-wider text-sky-400/90">Resume</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">CV</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          View the latest PDF below. Use your browser controls to download or print if needed.
        </p>

        {!ready ? (
          <div
            className="mt-10 min-h-[70vh] animate-pulse rounded-2xl border border-white/10 bg-zinc-900/40"
            aria-hidden
          />
        ) : url ? (
          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.07]"
              >
                Open PDF in new tab
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 ring-1 ring-white/[0.04]">
              <object
                data={url}
                type="application/pdf"
                title="Resume PDF"
                className="block w-full bg-zinc-950"
                style={{ minHeight: '75vh' }}
              >
                <p className="p-6 text-sm text-zinc-400">
                  PDF preview is not available in this browser. Use &quot;Open PDF in new tab&quot; above.
                </p>
              </object>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-12 text-center text-zinc-400">
            <p>No resume has been uploaded yet.</p>
            <p className="mt-2 text-sm text-zinc-500">
              Add a PDF under <span className="font-mono text-zinc-400">Site profile → Resume</span> in Django
              admin.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
