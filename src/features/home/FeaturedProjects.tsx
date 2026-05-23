import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import Badge from '../../components/ui/Badge'
import ErrorState from '../../components/ui/ErrorState'
import GlassCard from '../../components/ui/GlassCard'
import GlowText from '../../components/ui/GlowText'
import Section from '../../components/ui/Section'
import { useProjects } from '../../lib/hooks/useProjects'
import { resolveMediaUrl } from '../../lib/utils/constants'

const FeaturedProjects = () => {
  const { data, error, isLoading, refetch } = useProjects({ is_featured: true, page_size: 3 })

  return (
    <Section
      id="featured-projects"
      className="relative"
      eyebrow="// 02 / FEATURED"
      heading={
        <GlowText as="h2" className="text-4xl sm:text-5xl">
          Selected Builds
        </GlowText>
      }
    >
      <div className="absolute inset-x-0 top-8 -z-10 h-64 bg-[radial-gradient(circle_at_50%_50%,rgba(99,243,255,0.12),transparent_55%)]" />
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-lg border border-border-glow bg-bg-elevated/70"
            />
          ))}
        </div>
      ) : error ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {(data?.results ?? []).map((project) => {
            const imageUrl = resolveMediaUrl(project.featured_image)

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4 }}
              >
                <Link to={`/projects/${project.slug}`} className="group block">
                <GlassCard
                  interactive
                  glow
                  className="panel-sheen h-full overflow-hidden rounded-[1.75rem] border-white/10 bg-white/[0.04] p-0"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-bg-elevated">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:saturate-150"
                      />
                    ) : (
                      <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <Badge key={tech.id} tone="cyan">
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-text-primary">{project.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">
                      {project.short_description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-neon-cyan">
                      Open Case <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </GlassCard>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </Section>
  )
}

export default FeaturedProjects
