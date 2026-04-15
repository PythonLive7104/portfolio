import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'

export function MainLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <ScrollToTop />
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none fixed -left-40 top-0 h-[420px] w-[420px] rounded-full bg-sky-500/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-40 top-1/3 h-[380px] w-[380px] rounded-full bg-violet-600/15 blur-[120px]"
        aria-hidden
      />
      <Navbar />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
