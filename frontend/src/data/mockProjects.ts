import type { ProjectDetail, SiteProfile, TechBadge, Testimonial } from '../types/api'

export const mockSiteProfile: SiteProfile = {
  profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=640&fit=crop',
  profile_image_alt: 'Portrait placeholder for local mock data',
  resume_url: null,
  github_url: 'https://github.com',
  linkedin_url: 'https://linkedin.com',
  contact_email: 'hello@example.com',
}

export const techStackHome: TechBadge[] = [
  { id: '1', label: 'React', category: 'frontend' },
  { id: '2', label: 'TypeScript', category: 'frontend' },
  { id: '3', label: 'Tailwind CSS', category: 'frontend' },
  { id: '4', label: 'Django', category: 'backend' },
  { id: '5', label: 'Django REST Framework', category: 'backend' },
  { id: '6', label: 'PostgreSQL', category: 'data' },
  { id: '7', label: 'Redis', category: 'data' },
  { id: '8', label: 'Stripe', category: 'payments' },
  { id: '9', label: 'OpenAI API', category: 'ai' },
  { id: '10', label: 'Docker', category: 'ops' },
  { id: '11', label: 'Celery', category: 'backend' },
  { id: '12', label: 'AWS / Vercel', category: 'ops' },
]

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Shipped our billing portal and admin dashboards ahead of schedule. The API design with DRF made our mobile team productive on day one.',
    author_name: 'Sarah Chen',
    author_role: 'Head of Product',
    author_company: 'Northline Analytics',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
  },
  {
    id: 't2',
    quote:
      'Exceptional full-stack craftsmanship — React UX that feels premium and a Django backend that scales. Exactly what we needed for our SaaS pivot.',
    author_name: 'Marcus Webb',
    author_role: 'CTO',
    author_company: 'LedgerFlow',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop',
  },
  {
    id: 't3',
    quote:
      'Clear communication, strong system design, and pragmatic AI integrations. Our customers noticed the polish immediately.',
    author_name: 'Elena Vasquez',
    author_role: 'Founder',
    author_company: 'Studio Meridian',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
  },
]

export const mockProjects: ProjectDetail[] = [
  {
    id: 'p1',
    slug: 'northline-billing',
    title: 'Northline Billing Suite',
    short_description:
      'Multi-tenant SaaS billing dashboards with Stripe Connect, usage metering, and role-based admin.',
    image_url:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=750&fit=crop',
    tech_stack: [
      { id: 't1', label: 'React' },
      { id: 't2', label: 'Django' },
      { id: 't3', label: 'DRF' },
      { id: 't4', label: 'Stripe' },
      { id: 't5', label: 'PostgreSQL' },
    ],
    live_demo_url: 'https://example.com',
    github_url: 'https://github.com',
    featured: true,
    order: 1,
    overview:
      'A production-ready billing and subscription management platform for B2B SaaS teams. Centralizes invoices, usage reports, and payout flows with Stripe Connect.',
    problem:
      'The client had fragmented billing tools, manual invoice reconciliation, and no unified view for finance and customer success.',
    solution:
      'Built a React SPA on a versioned DRF API with tenant isolation, automated Stripe webhooks, and real-time usage aggregation backed by PostgreSQL.',
    features: [
      'Tenant-scoped RBAC and audit logs',
      'Stripe Connect Express onboarding',
      'Usage-based metering with async workers',
      'Exportable revenue reports and CSV pipelines',
      'Embed-ready admin APIs for internal tools',
    ],
    screenshots: [
      {
        id: 's1',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1000&fit=crop',
        caption: 'Revenue overview & cohort trends',
      },
      {
        id: 's2',
        url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=1000&fit=crop',
        caption: 'Tenant admin & role management',
      },
      {
        id: 's3',
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=1000&fit=crop',
        caption: 'Subscription lifecycle & webhooks',
      },
    ],
  },
  {
    id: 'p2',
    slug: 'ledgerflow-ops',
    title: 'LedgerFlow Operations Hub',
    short_description:
      'Internal ops console for approvals, SLA tracking, and AI-assisted ticket triage.',
    image_url:
      'https://images.unsplash.com/photo-1553877522-432693d613ea?w=1200&h=750&fit=crop',
    tech_stack: [
      { id: 't1', label: 'React' },
      { id: 't2', label: 'Django' },
      { id: 't3', label: 'DRF' },
      { id: 't4', label: 'OpenAI' },
      { id: 't5', label: 'Redis' },
    ],
    live_demo_url: 'https://example.com',
    github_url: 'https://github.com',
    featured: true,
    order: 2,
    overview:
      'Operations hub that unifies approvals, SLA dashboards, and LLM-assisted summarization for support queues.',
    problem:
      'Ops teams were juggling spreadsheets and multiple tools; response times varied and context was lost across handoffs.',
    solution:
      'Delivered a single React workspace backed by DRF, Redis-backed task queues, and safe AI prompts with human-in-the-loop review.',
    features: [
      'Kanban + SLA timers with websocket updates',
      'LLM summaries with citation of source tickets',
      'Granular Django permissions per department',
      'DRF throttling and structured logging',
    ],
    screenshots: [
      {
        id: 's1',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=1000&fit=crop',
        caption: 'Queue overview',
      },
      {
        id: 's2',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=1000&fit=crop',
        caption: 'Team workload',
      },
    ],
  },
  {
    id: 'p3',
    slug: 'meridian-portal',
    title: 'Meridian Client Portal',
    short_description:
      'Client-facing portal with document vaults, e-sign hooks, and activity feeds.',
    image_url:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=750&fit=crop',
    tech_stack: [
      { id: 't1', label: 'React' },
      { id: 't2', label: 'Django' },
      { id: 't3', label: 'DRF' },
      { id: 't4', label: 'PostgreSQL' },
    ],
    live_demo_url: 'https://example.com',
    github_url: 'https://github.com',
    featured: true,
    order: 3,
    overview:
      'Secure portal for creative agencies to share deliverables, collect approvals, and track client activity.',
    problem:
      'Email chains and shared drives led to version conflicts and weak audit trails for compliance-focused clients.',
    solution:
      'Implemented signed URLs, immutable activity logs, and a React interface optimized for mobile executives.',
    features: [
      'Per-client spaces with branded themes',
      'Versioned asset library with previews',
      'Activity feed backed by append-only events',
      'Ready for DRF JWT + session hybrid auth',
    ],
    screenshots: [
      {
        id: 's1',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=1000&fit=crop',
        caption: 'Client dashboard',
      },
    ],
  },
]
