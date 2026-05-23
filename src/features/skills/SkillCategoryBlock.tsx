import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import GlassCard from '../../components/ui/GlassCard'
import type { SkillCategory } from '../../lib/api/types'
import { makeElementId } from '../../lib/utils/constants'

export type SkillCategoryBlockProps = {
  category: SkillCategory
}

const SkillCategoryBlock = ({ category }: SkillCategoryBlockProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-90px' })
  const leadSkill = category.skills[0]

  return (
    <GlassCard
      ref={ref}
      id={makeElementId(category.name)}
      glow
      interactive
      className="skill-panel-bg skill-vignette skill-soft-glow panel-sheen relative overflow-hidden rounded-[2rem] border-white/10 p-0"
    >
      <div className="skill-halo" />
      <div className="relative z-10 grid gap-8 p-6 lg:grid-cols-[19rem_1fr] lg:p-8">
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
            Category {category.order}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">{category.name}</h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-text-secondary">
            Production-grade toolkit with a focus on reliability, maintainability, and fast delivery.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-text-muted">
              Lead capability
            </p>
            <p className="mt-3 text-2xl font-semibold text-text-primary">
              {leadSkill?.name ?? 'No skills yet'}
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-text-muted">
                  Readiness
                </p>
                <p className="mt-1 text-lg font-semibold text-neon-magenta">
                  {leadSkill?.proficiency ?? 0}%
                </p>
              </div>
              <span className="rounded-full border border-neon-cyan/25 bg-neon-cyan/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-neon-cyan">
                Active stack
              </span>
            </div>
          </div>

          <p className="pointer-events-none absolute bottom-0 left-0 font-display text-[4.8rem] font-bold uppercase leading-none text-white/[0.04]">
            {category.name}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {category.skills.map((skill, index) => {
            const activeSegments = Math.max(1, Math.round(skill.proficiency / 10))

            return (
              <motion.div
                key={skill.id}
                className="skill-tile group rounded-[1.7rem] border border-white/8 bg-bg-base/70 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ delay: index * 0.06, duration: 0.38 }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(75,139,190,0.38)',
                  backgroundColor: 'rgba(10, 20, 35, 0.88)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-text-primary transition-colors duration-300 group-hover:text-white">
                      {skill.name}
                    </p>
                    <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                      Capability index
                    </p>
                  </div>
                  <span className="rounded-full border border-neon-magenta/20 bg-neon-magenta/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-magenta transition-colors duration-300 group-hover:border-neon-cyan/30 group-hover:bg-neon-cyan/10 group-hover:text-[#dff4ff]">
                    {skill.proficiency}%
                  </span>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                      Signal strength
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-glow-cyan" />
                  </div>
                  <div className="skill-segments">
                    {Array.from({ length: 10 }, (_, segmentIndex) => (
                      <motion.span
                        key={`${skill.id}-${segmentIndex}`}
                        className="skill-segment"
                        data-active={segmentIndex < activeSegments}
                        initial={{ opacity: 0.25, scaleX: 0.7 }}
                        animate={
                          isInView
                            ? { opacity: 1, scaleX: 1 }
                            : { opacity: 0.25, scaleX: 0.7 }
                        }
                        transition={{ delay: 0.12 + index * 0.05 + segmentIndex * 0.015, duration: 0.28 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 transition-colors duration-300 group-hover:border-white/10 group-hover:bg-white/[0.04]">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                      Delivery confidence
                    </span>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-neon-cyan transition-colors duration-300 group-hover:text-[#dff4ff]">
                      tier {Math.max(1, Math.ceil(skill.proficiency / 25))}
                    </span>
                  </div>
                  <motion.div
                    className="h-1.5 rounded-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-lime"
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? `${skill.proficiency}%` : 0 }}
                    transition={{
                      delay: 0.16 + index * 0.05,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </GlassCard>
  )
}

export default SkillCategoryBlock
