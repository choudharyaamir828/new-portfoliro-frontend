import { useSearchParams } from 'react-router-dom'

import ErrorState from '../../components/ui/ErrorState'
import NeonButton from '../../components/ui/NeonButton'
import { useProjects } from '../../lib/hooks/useProjects'
import type { TechCategory } from '../../lib/api/types'
import ProjectCard from './ProjectCard'

const ProjectGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = (searchParams.get('tech_stack__category') ?? '') as TechCategory | ''
  const search = searchParams.get('search') ?? ''
  const { data, error, isLoading, refetch } = useProjects({
    page_size: 50,
    search,
    tech_stack__category: category,
  })

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-lg border border-border-glow bg-bg-elevated/70"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={() => void refetch()} />
  }

  const projects = data?.results ?? []

  if (projects.length === 0) {
    return (
      <div className="glass rounded-lg px-6 py-16 text-center">
        <h2 className="font-display text-4xl font-bold uppercase text-neon-magenta text-glow">
          No Projects Found
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-text-secondary">
          The current filters returned an empty signal. Reset and scan the full archive.
        </p>
        <NeonButton className="mt-8" variant="secondary" onClick={() => setSearchParams({})}>
          Reset Filters
        </NeonButton>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 md:[&>*:nth-child(3n+2)]:mt-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectGrid
