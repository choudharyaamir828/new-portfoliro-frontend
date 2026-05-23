export const siteConfig = {
  defaultName: 'Portfolio',
  defaultTitle: 'Python Backend Developer',
  defaultBio:
    'I build Python systems that are clean, scalable, and production-ready, from REST APIs and automation workflows to backend platforms.',
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
    { label: 'Contact', href: '/contact' },
  ],
  techCategories: [
    { label: 'All', value: '' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Database', value: 'database' },
    { label: 'DevOps', value: 'devops' },
    { label: 'Other', value: 'other' },
  ],
} as const

export const portfolioUsername = import.meta.env.VITE_PORTFOLIO_USERNAME?.trim() || ''

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export const makeElementId = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const apiOrigin = (() => {
  try {
    return new URL(apiBaseUrl).origin
  } catch {
    return window.location.origin
  }
})()

export const resolveMediaUrl = (path?: string | null) => {
  if (!path) {
    return ''
  }

  if (/^https?:\/\//i.test(path)) {
    return path
  }

  return new URL(path, `${apiOrigin}/`).toString()
}
