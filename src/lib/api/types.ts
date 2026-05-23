export interface ApiResponse<T> {
  success: boolean
  data: T
  errors: unknown
}

export interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Profile {
  username: string
  full_name: string
  title: string
  bio: string
  profile_image: string
  resume: string
  email: string
  location: string
  github_url: string
  linkedin_url: string
  instagram_url: string
  created_at: string
  updated_at: string
}

export type TechCategory = 'backend' | 'frontend' | 'database' | 'devops' | 'other'

export interface TechStack {
  id: number
  name: string
  icon: string
  category: TechCategory
}

export interface ProjectImage {
  id: number
  image: string
  caption: string
}

export interface ProjectListItem {
  id: number
  owner_username: string
  title: string
  slug: string
  short_description: string
  featured_image: string
  tech_stack: TechStack[]
  is_featured: boolean
}

export interface ProjectDetail extends ProjectListItem {
  description: string
  live_url: string
  github_url: string
  order: number
  gallery: ProjectImage[]
  created_at: string
  updated_at: string
}

export interface Skill {
  id: number
  name: string
  proficiency: number
  icon: string
}

export interface SkillCategory {
  id: number
  profile_username: string
  name: string
  order: number
  skills: Skill[]
}

export interface ContactInput {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactMessage extends ContactInput {
  id: number
  created_at: string
}

export interface ProjectQueryParams {
  username?: string
  page?: number
  page_size?: number
  is_featured?: boolean
  tech_stack?: string
  tech_stack__category?: TechCategory | ''
  search?: string
  ordering?: 'order' | '-created_at' | 'created_at'
}
