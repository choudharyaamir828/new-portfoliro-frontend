import { Code2, ExternalLink, MoveLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import PageTransition from '../../components/layout/PageTransition'
import Badge from '../../components/ui/Badge'
import ErrorState from '../../components/ui/ErrorState'
import GlassCard from '../../components/ui/GlassCard'
import Loader from '../../components/ui/Loader'
import NeonButton from '../../components/ui/NeonButton'
import { useProject } from '../../lib/hooks/useProject'
import { resolveMediaUrl } from '../../lib/utils/constants'
import ProjectGallery from './ProjectGallery'

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

const ProjectDetailPage = () => {
  const { slug } = useParams()
  const { data: project, error, isLoading, refetch } = useProject(slug)

  if (isLoading) {
    return <Loader centered label="Loading project" />
  }

  if (error || !project) {
    return (
      <PageTransition>
        <section className="min-h-screen px-4 pt-32 sm:px-6 lg:px-8">
          <ErrorState onRetry={() => void refetch()} />
        </section>
      </PageTransition>
    )
  }

  const imageUrl = resolveMediaUrl(project.featured_image)

  return (
    <PageTransition>
      <article className="min-h-screen pb-24 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan hover:text-neon-magenta"
          >
            <MoveLeft className="h-4 w-4" />
            All Projects
          </Link>
        </div>

        <header className="relative min-h-[56vh] overflow-hidden border-y border-border-glow bg-bg-elevated">
          {imageUrl ? (
            <img src={imageUrl} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-bg-base/10" />
          <div className="relative mx-auto flex min-h-[56vh] max-w-7xl items-end px-4 pb-12 sm:px-6 lg:px-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-neon-cyan">
                // PROJECT DETAIL
              </p>
              <h1 className="mt-4 max-w-5xl font-display text-5xl font-bold leading-tight sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
                {project.short_description}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8">
          <div className="cyber-prose text-base">
            {project.description.split('\n').map((paragraph) =>
              paragraph.trim() ? <p key={paragraph}>{paragraph}</p> : null,
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <GlassCard glow>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-neon-magenta">
                Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <Badge key={tech.id} tone="cyan">
                    {tech.name}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 grid gap-3">
                {project.live_url ? (
                  <NeonButton
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    rightIcon={<ExternalLink className="h-4 w-4" />}
                  >
                    Live URL
                  </NeonButton>
                ) : null}
                {project.github_url ? (
                  <NeonButton
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                    rightIcon={<Code2 className="h-4 w-4" />}
                  >
                    GitHub
                  </NeonButton>
                ) : null}
              </div>

              <dl className="mt-8 space-y-4 border-t border-border-glow pt-6">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                    Created
                  </dt>
                  <dd className="mt-1 text-text-primary">{formatDate(project.created_at)}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                    Featured
                  </dt>
                  <dd className="mt-1 text-text-primary">{project.is_featured ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
            </GlassCard>
          </aside>
        </div>

        <ProjectGallery images={project.gallery} />
      </article>
    </PageTransition>
  )
}

export default ProjectDetailPage
