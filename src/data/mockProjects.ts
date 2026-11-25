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
  { id: '2', label: 'Next.js', category: 'frontend' },
  { id: '3', label: 'TypeScript', category: 'frontend' },
  { id: '4', label: 'Tailwind CSS', category: 'frontend' },
  { id: '5', label: 'Python', category: 'backend' },
  { id: '6', label: 'Django', category: 'backend' },
  { id: '7', label: 'Django REST Framework', category: 'backend' },
  { id: '8', label: 'Celery', category: 'backend' },
  { id: '9', label: 'Claude API', category: 'ai' },
  { id: '10', label: 'OpenAI API', category: 'ai' },
  { id: '11', label: 'RAG', category: 'ai' },
  { id: '12', label: 'AI agents', category: 'ai' },
  { id: '13', label: 'n8n', category: 'automation' },
  { id: '14', label: 'Webhooks', category: 'automation' },
  { id: '15', label: 'PostgreSQL', category: 'data' },
  { id: '16', label: 'Redis', category: 'data' },
  { id: '17', label: 'Stripe / Paystack', category: 'payments' },
  { id: '18', label: 'Docker', category: 'ops' },
  { id: '19', label: 'CI/CD', category: 'ops' },
  { id: '20', label: 'AWS / Vercel', category: 'ops' },
]

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'The API design with DRF made the team productive on day one.',
    author_name: 'Helen Obi',
    author_role: 'Product Manager',
    author_company: 'MailionDev',
    avatar_url: '',
  },
  {
    id: 't2',
    quote:
      'Exactly what we needed for our SaaS pivot. We found your work pleasing and satisfactory.',
    author_name: 'John',
    author_role: 'CTO',
    author_company: '',
    avatar_url: '',
  },
  {
    id: 't3',
    quote:
      'Our customers noticed the polish immediately. Thank you for your work.',
    author_name: 'Mr. David',
    author_role: 'Founder',
    author_company: 'CompetitorIQ',
    avatar_url: '',
  },
]

export const mockProjects: ProjectDetail[] = [
  {
    id: 'p4',
    slug: 'invoiceparsed',
    title: 'InvoiceParsed',
    short_description:
      'AI extraction for invoices, receipts and bank statements — with purchase-order matching and approvals for finance teams.',
    image_url: '/images/invoiceparsed-cover.png',
    tech_stack: [
      { id: 't1', label: 'Django' },
      { id: 't2', label: 'DRF' },
      { id: 't3', label: 'AI extraction' },
      { id: 't4', label: 'PostgreSQL' },
      { id: 't5', label: 'Redis' },
      { id: 't6', label: 'Celery' },
      { id: 't7', label: 'REST API' },
      { id: 't8', label: 'Webhooks' },
    ],
    live_demo_url: 'https://invoiceparsed.com',
    github_url: '',
    featured: true,
    order: 1,
    overview:
      'A production SaaS that turns any invoice into clean data in seconds. Upload a PDF or photo and get vendor, line items, taxes and totals as structured JSON or CSV — then match each invoice against its purchase order before it gets paid.',
    problem:
      'Finance teams still retype invoices into spreadsheets — on this product\u2019s own numbers, around six hours a week of a bookkeeper\u2019s time. Worse, a spreadsheet cannot enforce invoice-to-PO matching, the oldest control in accounts payable, so price rises and over-invoicing get approved and paid before anyone notices.',
    solution:
      'Built an AI extraction pipeline that reads messy scans, multi-page documents and unusual layouts, returning every field with a 0–100% confidence score for review. On top of extraction sits real accounts-payable control: supplier records, purchase orders with a separate approval step, and line-by-line invoice matching against tolerances the customer sets.',
    features: [
      'Field-perfect extraction: vendor, invoice number, dates, line items, subtotal, tax and total',
      'PDF and image support across messy scans, multi-page invoices and unusual layouts',
      'One-click export to Excel (.xlsx), QuickBooks-compatible CSV, or strict JSON',
      'Per-field confidence scoring so low-certainty values get reviewed, not trusted blindly',
      'Invoice-to-PO matching flags price rises, over-invoicing and unordered lines before payment',
      'Supplier records with spend totals per vendor and currency, and duplicate detection on tax ID',
      'Purchase orders with line items, taxes and delivery dates — raising an order is separate from approving it',
      'Eight-role permission model; a discrepancy can only be accepted by an approver, with a written reason kept on record',
      'REST API and webhooks so finance systems can pull extractions without a human in the loop',
      'Multi-currency detection and private-by-design processing — no training on customer documents',
    ],
    result:
      'Around five seconds average processing at 95%+ field accuracy on clear digital PDFs, with three-way invoice-to-PO checks. Shipped as a four-tier commercial product from a free plan up to $99/mo, with API and webhook access for finance ops teams.',
    screenshots: [
      {
        id: 's1',
        url: '/images/invoiceparsed-extract.png',
        caption:
          'Extraction from a creased receipt photographed on a desk — every field returned with its own confidence score. Due date and payment terms read 0% because they are genuinely absent from the document: missing data is flagged for review, not invented.',
      },
    ],
  },
  {
    id: 'p5',
    slug: 'trynobot',
    title: 'TryNoBot',
    short_description:
      'Click-fraud protection for paid ad landing pages — every visitor scored 0–100 in real time, with the signals behind each decision.',
    image_url: '/images/trynobot-cover.png',
    tech_stack: [
      { id: 't1', label: 'Django' },
      { id: 't2', label: 'DRF' },
      { id: 't3', label: 'PostgreSQL' },
      { id: 't4', label: 'Redis' },
      { id: 't5', label: 'JA3/JA4' },
      { id: 't6', label: 'nginx' },
      { id: 't7', label: 'Cloudflare' },
      { id: 't8', label: 'Node' },
    ],
    live_demo_url: 'https://trynobot.com',
    github_url: '',
    featured: true,
    order: 2,
    overview:
      'Real-time bot and click-fraud detection for advertisers. A drop-in script scores every visitor to your ad landing pages from 0 to 100, catching proxies, datacenter traffic and automation before they drain the campaign budget — and showing the exact signals behind every verdict.',
    problem:
      'Advertisers pay for clicks that were never people. Bots, proxies and datacenter traffic quietly consume Google, Meta, TikTok and Microsoft ad budgets, and most protection tools block traffic without explaining why — which leaves the advertiser unable to dispute a charge or tune a rule with any confidence.',
    solution:
      'Built a real-time scoring service behind an async tracking tag: 40+ signals per visit and session, JA3/JA4 TLS fingerprinting beneath the user agent, and live proxy/VPN and recent-abuse reputation checks, resolving to one of four verdicts in under 10ms. Server-side snippets for PHP, Django, nginx, Cloudflare and Node let the decision run before the page ever renders.',
    features: [
      'Explainable 0–100 risk score on every click, with the exact signals that drove it',
      'Server-side shield — drop-in snippet for PHP, Django, nginx, Cloudflare or Node blocks bots pre-render',
      'JA3/JA4 TLS fingerprinting to identify clients beneath a spoofed user agent',
      'Live IP reputation with real-time proxy, VPN and recent-abuse checks',
      'Silent browser check that catches headless automation with no click from the visitor',
      'Real-time traffic feed with classification and rule actions: allow, review, block or tag',
      'Campaign analytics across traffic quality, sources, geos and devices',
      'Conversion tracking that attributes revenue back to traffic quality, not just volume',
      'Folder Guard locks sensitive paths such as /admin, /wp-login and /downloads',
      'Filtering funnel showing what was checked, what reached the page, and why the rest was turned away',
    ],
    result:
      'Sub-10ms decisions over 40+ signals per visit, four verdicts (human, suspicious, bot, fraud) and coverage across eight ad networks. A free, no-account exposure check doubles as the top of the acquisition funnel, with a 7-day trial behind it.',
    screenshots: [
      {
        id: 's1',
        url: '/images/trynobot-dashboard.png',
        caption: 'Workspace dashboard — ad spend protected, traffic quality and fraud counts over the selected window',
      },
      {
        id: 's2',
        url: '/images/trynobot-funnel.png',
        caption: 'Filtering funnel — what the engine did with each visit, plus visitors and traffic quality over time',
      },
    ],
  },
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
    order: 5,
    overview:
      'This is a landing page for BounceHunter, a tool that helps you analyze and optimize your email bounce rate.',
    problem:
      'Email bounce rate is a major issue for many businesses. It can lead to lost revenue, low open rates, and poor customer engagement.',
    solution:
      'Built a SaaS landing page with Django, EmailListVerify API, Redis, and PostgreSQL.',
    features: [
      'Deliverability check with EmailListVerify API',
      'Bounce rate analysis and optimization',
      'Email verification and validation',
      'Email tracking and analytics',
      'Email reporting and insights',
    ],
    result:
      'Landing, auth, and dashboard flows tied to Paystack — teams get actionable bounce visibility without babysitting spreadsheets.',
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
      'AI job platform that helps users optimize resumes and increase interview chances — built with OpenAI + subscription billing.',
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
    order: 3,
    overview:
      'AI-assisted resume and interview prep with subscription tiers — OpenAI workflows plus Paystack for recurring revenue.',
    problem:
      'Many job seekers struggle to find the right job for them. They often waste time searching for jobs that are not a good fit.',
    solution:
      'Built a Django API with OpenAI, Redis, and PostgreSQL and used React for the frontend.',
    features: [
      'Optimize resume for job applications',
      'ATS score analysis and optimization',
      'Job interview preparation and practice',
      'LinkedIn profile optimization and analysis',
      'LinkedIn image generation',
      'Job search analytics and insights',
      'Shareable personal portfolio and resume',
    ],
    result:
      'End-to-end SaaS with gated Pro features and billing — users ship stronger applications while subscriptions stay predictable in production.',
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
    order: 4,
    overview:
      'An advanced tool for competitor analysis and intelligence.',
    problem:
      'Many businesses struggle to analyze and understand their competitors. They often waste time searching for information that is not available.',
    solution:
      'Built a Django API with Proxy API, Scraper API, and PostgreSQL and used React for the frontend.',
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
    result:
      'Unified competitor workspace with AI summaries and Paystack-backed plans — research time drops while intelligence stays current.',
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
