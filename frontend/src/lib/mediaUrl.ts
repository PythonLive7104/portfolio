/**
 * In development, turn absolute Django media URLs into same-origin paths so Vite can
 * proxy `/media` — PDF iframes often fail cross-origin when the app is on :5173 and files are on :8000.
 */
export function mediaUrlForClient(absoluteOrRelativeUrl: string | null | undefined): string | null {
  if (absoluteOrRelativeUrl == null || absoluteOrRelativeUrl === '') return null
  if (!import.meta.env.DEV) return absoluteOrRelativeUrl

  try {
    const u = new URL(
      absoluteOrRelativeUrl,
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
    )
    if (u.pathname.startsWith('/media/')) {
      return `${u.pathname}${u.search}${u.hash}`
    }
  } catch {
    return absoluteOrRelativeUrl
  }
  return absoluteOrRelativeUrl
}
