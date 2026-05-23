export const endpoints = {
  ABOUT: '/about/',
  PROJECTS: '/projects/',
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}/`,
  SKILLS: '/skills/',
  CONTACT: '/contact/',
} as const
