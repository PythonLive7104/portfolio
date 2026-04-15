/**
 * Central place for Django REST Framework calls.
 *
 * Set `VITE_API_URL` (e.g. in `.env.development`) to use your API.
 * If it is unset, the app uses bundled mock data from `data/mockProjects`.
 */

import type { ProjectDetail, ProjectListItem, SiteProfile, TechBadge, Testimonial } from '../types/api'
import { mockProjects, mockSiteProfile, mockTestimonials, techStackHome } from '../data/mockProjects'

const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const USE_MOCK = !API_BASE

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
  // No rows with Featured checked in admin — show newest list order so the section is not empty.
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
