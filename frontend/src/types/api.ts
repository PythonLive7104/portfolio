/**
 * Shapes aligned with typical Django REST Framework serializers.
 * Replace mock usage with `lib/apiClient` once your backend is live.
 */

export interface SiteProfile {
  profile_image_url: string | null
  profile_image_alt: string
  /** Absolute URL to uploaded PDF resume, or null if none. */
  resume_url: string | null
  /** Full URLs; empty when unset in admin. */
  github_url: string
  linkedin_url: string
  contact_email: string
}

export interface TechBadge {
  id: string
  label: string
  /** Optional category for filtering/grouping from API */
  category?: string
}

export interface Testimonial {
  id: string
  quote: string
  author_name: string
  author_role: string
  author_company: string
  avatar_url: string | null
}

export interface ProjectListItem {
  id: string
  slug: string
  title: string
  short_description: string
  image_url: string
  tech_stack: TechBadge[]
  live_demo_url: string
  github_url: string
  featured: boolean
  order: number
}

export interface ProjectDetail extends ProjectListItem {
  overview: string
  problem: string
  solution: string
  features: string[]
  screenshots: { id: string; url: string; caption: string | null }[]
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
