/**
 * Data layer: default is bundled mock JSON (Vercel / static hosting, no server cost).
 *
 * **Optional hosted API:** set `VITE_USE_API=true` and `VITE_API_URL=https://your-api.example.com/api`.
 *
 * **Local dev with a backend:** set `VITE_API_URL=http://127.0.0.1:8000/api` in `.env.development`
 * (do not set `VITE_USE_API` in dev — a non-empty URL enables the API in development).
 */

import type { ProjectDetail, ProjectListItem, SiteProfile, TechBadge, Testimonial } from '../types/api'
import { mockProjects, mockSiteProfile, mockTestimonials, techStackHome } from '../data/mockProjects'

const raw = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/$/, '')

function computeUseMock(): boolean {
  if (import.meta.env.VITE_USE_MOCK === 'true') return true
  if (import.meta.env.VITE_USE_MOCK === 'false') return false
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_USE_API !== 'true' || raw === ''
  }
  return raw === ''
}

/** Bundled mock data when true; otherwise fetch from `API_BASE`. */
const USE_MOCK = computeUseMock()

const API_BASE = USE_MOCK ? '' : raw || 'http://127.0.0.1:8000/api'

export const isUsingMockData = USE_MOCK
/** For error messages / debugging */
export const resolvedApiBase = API_BASE || '(mock)'

function apiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE}${p}`
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path))
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${path}`)
  }
  return res.json()
}

interface PaginatedWrapper<T> {
  count?: number
  next?: string | null
  previous?: string | null
  results: T[]
}

function normalizeList<T>(data: PaginatedWrapper<T> | T[]): T[] {
  if (Array.isArray(data)) return data
  return data.results ?? []
}

export async function fetchProjects(): Promise<ProjectListItem[]> {
  if (USE_MOCK) {
    return [...mockProjects].sort((a, b) => a.order - b.order)
  }
  const data = await getJson<PaginatedWrapper<ProjectListItem>>('/projects/')
  return normalizeList(data)
}

export async function fetchFeaturedProjects(limit = 3): Promise<ProjectListItem[]> {
  if (USE_MOCK) {
    const all = await fetchProjects()
    return all.filter((p) => p.featured).slice(0, limit)
  }
  const featuredData = await getJson<PaginatedWrapper<ProjectListItem>>('/projects/?featured=true')
  const featured = normalizeList(featuredData)
  if (featured.length > 0) {
    return featured.slice(0, limit)
  }
  const allData = await getJson<PaginatedWrapper<ProjectListItem>>('/projects/')
  const all = normalizeList(allData)
    .slice()
    .sort((a, b) => a.order - b.order)
  return all.slice(0, limit)
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  if (USE_MOCK) {
    return mockProjects.find((p) => p.slug === slug) ?? null
  }
  try {
    return await getJson<ProjectDetail>(`/projects/${encodeURIComponent(slug)}/`)
  } catch {
    return null
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (USE_MOCK) {
    return mockTestimonials
  }
  const data = await getJson<{ results: Testimonial[] }>('/testimonials/')
  return data.results ?? []
}

export async function fetchHomeTechStack(): Promise<TechBadge[]> {
  if (USE_MOCK) {
    return techStackHome
  }
  const data = await getJson<{ results: TechBadge[] }>('/home-tech/')
  return data.results ?? []
}

export async function fetchSiteProfile(): Promise<SiteProfile> {
  if (USE_MOCK) {
    return mockSiteProfile
  }
  return getJson<SiteProfile>('/site-profile/')
}
