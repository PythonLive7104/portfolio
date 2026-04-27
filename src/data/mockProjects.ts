import type { ProjectDetail, SiteProfile, TechBadge, Testimonial } from '../types/api'

export const mockSiteProfile: SiteProfile = {
  profile_image_url: '/images/profile_mailiondev.jpg',
  profile_image_alt: 'Portrait placeholder for local mock data',
  resume_url: null,
  github_url: 'https://github.com/PythonLive7104',
  linkedin_url: 'https://www.linkedin.com/in/olatunjisolomon/',
  contact_email: 'olatunjiayomi18@gmail.com',
}

export const techStackHome: TechBadge[] = [
  { id: '1', label: 'React', category: 'frontend' },
  { id: '2', label: 'TypeScript', category: 'frontend' },
  { id: '3', label: 'Tailwind CSS', category: 'frontend' },
  { id: '4', label: 'Django', category: 'backend' },
  { id: '5', label: 'Django REST Framework', category: 'backend' },
  { id: '6', label: 'PostgreSQL', category: 'data' },
  { id: '7', label: 'Redis', category: 'data' },
  { id: '8', label: 'Stripe/Paystack', category: 'payments' },
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
    author_name: 'Michael',
    author_role: 'Product Manager',
    author_company: 'MailionDev',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
  },
  {
    id: 't2',
    quote:
      'Exceptional full-stack craftsmanship — React UX that feels premium and a Django backend that scales. Exactly what we needed for our SaaS pivot.',
    author_name: 'Adewale',
    author_role: 'CTO',
    author_company: '',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop',
  },
  {
    id: 't3',
    quote:
      'Clear communication, strong system design, and pragmatic AI integrations. Our customers noticed the polish immediately.',
    author_name: 'David',
    author_role: 'Founder',
    author_company: 'CompetitorIQ',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
  },
]

export const mockProjects: ProjectDetail[] = [
  {
    id: 'p1',
    slug: 'BounceHunter',
    title: 'BounceHunter Landing page',
    short_description:
      'Email bounce rate analysis and optimization',
    image_url:
      '/images/BounceHunter1.jpg',
    tech_stack: [
      { id: 't2', label: 'Django' },
      { id: 't3', label: 'Redis' },
      { id: 't4', label: 'Paystack' },
      { id: 't5', label: 'PostgreSQL' },
      { id: 't6', label: 'EmailListVerify API' },
    ],
    live_demo_url: 'https://bouncehunter.net',
    github_url: 'https://github.com/PythonLive7104/bouncehunter',
    featured: true,
    order: 1,
    overview:
      'This is a landing page for BounceHunter, a tool that helps you analyze and optimize your email bounce rate.',
    problem:
      'Email bounce rate is a major issue for many businesses. It can lead to lost revenue, low open rates, and poor customer engagement.',
    solution:
      'Built a React SPA on a versioned Django API with EmailListVerify API, Redis, and PostgreSQL.',
    features: [
      'Deliverability check with EmailListVerify API',
      'Bounce rate analysis and optimization',
      'Email verification and validation',
      'Email tracking and analytics',
      'Email reporting and insights',
    ],
    screenshots: [
      {
        id: 's1',
        url: '/images/BounceHunter1.jpg',
        caption: 'Landing Page',
      },
      {
        id: 's2',
        url: '/images/BounceHunter2.jpg',
        caption: 'Features Page',
      },
      {
        id: 's3',
        url: '/images/BounceHunter3.jpg',
        caption: 'Subscription Page',
      },
      {
        id: 's4',
        url: '/images/BounceHunter4.jpg',
        caption: 'Registration Page',
      },
      {
        id: 's5',
        url: '/images/BounceHunter5.jpg',
        caption: 'Login Page',
      },
      {
        id: 's6',
        url: '/images/BounceHunter6.jpg',
        caption: 'Dashboard Page',
      },
    ],
  },
  {
    id: 'p2',
    slug: 'Jobcrafts',
    title: 'JobcraftsAI',
    short_description:
      'This is a job search platform that uses AI to help you optimize your job search.',
    image_url:
      '/images/JobCrafts-homepage.jpg',
    tech_stack: [
      { id: 't1', label: 'React' },
      { id: 't2', label: 'Django' },
      { id: 't3', label: 'DRF' },
      { id: 't4', label: 'OpenAI' },
      { id: 't5', label: 'Redis' },
      { id: 't6', label: 'PostgreSQL' },
      { id: 't7', label: 'Paystack' },
    ],
    live_demo_url: 'https://jobcraftsai.net',
    github_url: 'https://github.com/PythonLive7104/jobcraftsAI',
    featured: true,
    order: 2,
    overview:
      'This product is a job search platform that uses AI to help you optimize your job search.',
    problem:
      'Many job seekers struggle to find the right job for them. They often waste time searching for jobs that are not a good fit.',
    solution:
      'Built a React SPA on a versioned Django API with OpenAI, Redis, and PostgreSQL.',
    features: [
      'Optimize resume for job applications',
      'ATS score analysis and optimization',
      'Job interview preparation and practice',
      'LinkedIn profile optimization and analysis',
      'LinkedIn image generation',
      'Job search analytics and insights',
      'Shareable personal portfolio and resume',
    ],
    screenshots: [
      {
        id: 's1',
        url: '/images/JobCrafts-homepage2.jpg',
        caption: 'Features Page',
      },
      {
        id: 's2',
        url: '/images/JobCrafts-homepage3.jpg',
        caption: 'Pro features Page',
      },
      {
        id: 's3',
        url: '/images/JobCrafts-homepage4.jpg',
        caption: 'Resume upload',
      },
      {
        id: 's4',
        url: '/images/JobCrafts-homepage5.jpg',
        caption: 'Resume analysisa and optimization',
      },
      {
        id: 's5',
        url: '/images/JobCrafts-homepage6.jpg',
        caption: 'Cover letter generation',
      },
    ],
  },
  {
    id: 'p3',
    slug: 'CompetitorIQ',
    title: 'CompetitorIQ',
    short_description:
      'Client tool for competitor analysis and intelligence.',
    image_url:
      '/images/competitor1.jpg',
    tech_stack: [
      { id: 't1', label: 'React' },
      { id: 't2', label: 'Django' },
      { id: 't3', label: 'DRF' },
      { id: 't4', label: 'PostgreSQL' },
      { id: 't7', label: 'Redis' },
      { id: 't8', label: 'OpenAI' },
      { id: 't10', label: 'Paystack' },
      { id: 't11', label: 'Proxy API' },
      { id: 't12', label: 'Scraper API' },
    ],
    live_demo_url: 'https://github.com/PythonLive7104/competitorIQ',
    github_url: 'https://github.com/PythonLive7104/competitorIQ',
    featured: true,
    order: 3,
    overview:
      'An advanced tool for competitor analysis and intelligence.',
    problem:
      'Many businesses struggle to analyze and understand their competitors. They often waste time searching for information that is not available.',
    solution:
      'Built a React SPA on a versioned Django API with Proxy API, Scraper API, and PostgreSQL.',
    features: [
      'Competitor analysis and intelligence',
      'Competitor tracking and monitoring',
      'Competitor benchmarking and analysis',
      'Competitor news and analysis',
      'Competitor insights and analysis',
      'Competitor analytics and insights',
      'Competitor reporting and insights',
      'Competitor analytics and insights',
    ],
    screenshots: [
      {
        id: 's1',
        url: '/images/competitor2.jpg',
        caption: 'Competitor analysis',
      },
      {
        id: 's2',
        url: '/images/competitor3.jpg',
        caption: 'Competitor tracking',
      },
      {
        id: 's3',
        url: '/images/competitor4.jpg',
        caption: 'Competitor benchmarking',
      },
      {
        id: 's4',
        url: '/images/competitor5.jpg',
        caption: 'Competitor news',
      },

    ],
  },
]
