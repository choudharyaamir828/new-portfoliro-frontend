import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import GlassCard from '../../components/ui/GlassCard'
import { useProjects } from '../../lib/hooks/useProjects'
import { useSkills } from '../../lib/hooks/useSkills'

type AnimatedNumberProps = {
  suffix?: string
  target: number
}

const AnimatedNumber = ({ suffix = '', target }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    const startedAt = performance.now()
    const duration = 900
    let frame = 0

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

const StatsStrip = () => {
  const { data: projects } = useProjects({ page_size: 1 })
  const { data: skills } = useSkills()
  const skillCount = skills?.reduce((total, category) => total + category.skills.length, 0) ?? 0

  const metrics = [
    { label: 'Projects', target: projects?.count ?? 10, suffix: '+' },
    { label: 'Skills Mapped', target: skillCount || 18, suffix: '+' },
    { label: 'API Endpoints', target: 5, suffix: '' },
    { label: '3D Scenes', target: 3, suffix: '' },
  ]

  return (
    <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/8 bg-gradient-to-r from-white/[0.06] via-transparent to-white/[0.03] p-[1px]">
        <GlassCard className="rounded-[calc(2rem-1px)] border-none bg-bg-base/60">
          <div className="grid gap-6 md:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-6 md:border-r-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                whileHover={{ y: -6, borderColor: 'rgba(75,139,190,0.35)' }}
              >
                <p
                  className={`font-display text-4xl font-bold text-glow ${
                    index === 1
                      ? 'text-neon-magenta'
                      : index === 2
                        ? 'text-neon-violet'
                        : index === 3
                          ? 'text-neon-amber'
                          : 'text-neon-cyan'
                  }`}
                >
                  <AnimatedNumber target={metric.target} suffix={metric.suffix} />
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  )
}

export default StatsStrip
