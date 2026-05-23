import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import Badge from '../../components/ui/Badge'
import GlassCard from '../../components/ui/GlassCard'
import type { ProjectListItem } from '../../lib/api/types'
import { resolveMediaUrl } from '../../lib/utils/constants'

export type ProjectCardProps = {
  project: ProjectListItem
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const imageUrl = resolveMediaUrl(project.featured_image)

  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <GlassCard interactive glow className="h-full overflow-hidden p-0">
        <div className="aspect-[4/3] overflow-hidden bg-bg-elevated">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
              No Image
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech_stack.slice(0, 4).map((tech, index) => (
              <Badge key={tech.id} tone={index % 2 === 0 ? 'cyan' : 'violet'}>
                {tech.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-text-primary">{project.title}</h2>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-neon-cyan transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <p className="mt-3 line-clamp-4 text-sm leading-7 text-text-secondary">
            {project.short_description}
          </p>
        </div>
      </GlassCard>
    </Link>
  )
}

export default ProjectCard
