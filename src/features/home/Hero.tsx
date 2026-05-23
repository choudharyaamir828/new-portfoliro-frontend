import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Braces,
  Database,
  Download,
  FolderKanban,
  ShieldCheck,
  ServerCog,
  TerminalSquare,
  Workflow,
} from 'lucide-react'
import { Suspense, lazy } from 'react'

import Badge from '../../components/ui/Badge'
import GlowText from '../../components/ui/GlowText'
import GlassCard from '../../components/ui/GlassCard'
import Loader from '../../components/ui/Loader'
import NeonButton from '../../components/ui/NeonButton'
import { useProfile } from '../../lib/hooks/useProfile'
import { resolveMediaUrl, siteConfig } from '../../lib/utils/constants'

const HeroScene = lazy(() => import('../../components/three/HeroScene'))

const Hero = () => {
  const { data: profile } = useProfile()
  const fullName = profile?.full_name || siteConfig.defaultName
  const title = profile?.title || siteConfig.defaultTitle
  const bio = profile?.bio || siteConfig.defaultBio
  const resumeUrl = resolveMediaUrl(profile?.resume)
  const characters = fullName.split('')
  const accentWords = ['Python', 'Django / FastAPI', 'REST APIs', 'Automation']
  const metrics = [
    { label: 'Core Focus', value: 'Backend Architecture' },
    { label: 'Delivery', value: 'Clean Production Code' },
    { label: 'Strength', value: 'API + Automation' },
  ]
  const servicePillars = [
    { icon: <ServerCog className="h-4 w-4" />, label: 'Scalable backend services' },
    { icon: <Database className="h-4 w-4" />, label: 'Database design and optimization' },
    { icon: <Braces className="h-4 w-4" />, label: 'Automation scripts and integrations' },
  ]
  const floatingCards = [
    { icon: <Workflow className="h-4 w-4" />, label: 'Queue workers', value: 'Celery + Redis' },
    { icon: <ShieldCheck className="h-4 w-4" />, label: 'Auth ready', value: 'JWT / RBAC' },
    { icon: <BarChart3 className="h-4 w-4" />, label: 'Observability', value: 'Logs + metrics' },
  ]
  const codeLines = [
    'from fastapi import FastAPI',
    'app = FastAPI(title="python-portfolio")',
    '@app.get("/health")',
    'def health_check():',
    '    return {"status": "running"}',
  ]

  return (
    <section className="cosmic-bg noise-overlay relative min-h-screen overflow-hidden pt-16">
      <div className="mesh-bg grid-fade absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_36%,rgba(255,212,59,0.12),transparent_28%),radial-gradient(circle_at_22%_30%,rgba(75,139,190,0.2),transparent_32%),linear-gradient(180deg,rgba(7,17,31,0.3),rgba(7,17,31,0.94))]" />
      <div className="hero-beam left-[-8rem] top-24" />
      <div className="hero-beam bottom-[-10rem] right-[-5rem] h-[28rem] w-[28rem] opacity-70" />
      <div className="spotlight-ring left-[6%] top-24 h-40 w-40 blur-[1px]" />
      <div className="spotlight-ring bottom-24 right-[8%] h-64 w-64" />
      <div className="orbit-dot left-[10%] top-40 hidden lg:block" />

      <div className="pointer-events-none absolute inset-0 opacity-55 lg:hidden">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="z-10">
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-glow-cyan" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-text-secondary">
              Python engineer for APIs, data flows, and backend systems
            </span>
          </motion.div>

          <motion.p
            className="mb-5 font-mono text-xs uppercase tracking-[0.32em] text-neon-cyan"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            // PYTHON DEVELOPER PORTFOLIO
          </motion.p>

          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-neon-magenta to-transparent" />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-neon-magenta">
              Building reliable backend products
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-[clamp(3.4rem,9vw,7.8rem)] font-bold leading-[0.86] tracking-[-0.04em]">
            {characters.map((character, index) => (
              <motion.span
                key={`${character}-${index}`}
                className="inline-block"
                initial={{ opacity: 0, y: 28, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: index * 0.026,
                  duration: 0.36,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {character === ' ' ? '\u00A0' : character}
              </motion.span>
            ))}
          </h1>

          <GlowText as="p" className="mt-5 text-2xl sm:text-[2.7rem]" shimmer variant="cyan">
            {title}
          </GlowText>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.34 }}
          >
            {bio}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.34 }}
          >
            {accentWords.map((word, index) => (
              <Badge key={word} tone={index === 1 ? 'magenta' : index === 2 ? 'violet' : 'cyan'} className="px-4 py-2">
                {word}
              </Badge>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.34 }}
          >
            <NeonButton to="/projects" leftIcon={<FolderKanban className="h-4 w-4" />} className="rounded-full px-6">
              View Work
            </NeonButton>
            {resumeUrl ? (
              <NeonButton href={resumeUrl} variant="secondary" leftIcon={<Download className="h-4 w-4" />} className="rounded-full px-6">
                Download CV
              </NeonButton>
            ) : (
              <NeonButton to="/contact" variant="secondary" className="rounded-full px-6">
                Contact Me
              </NeonButton>
            )}
          </motion.div>

          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {metrics.map((metric, index) => (
              <GlassCard
                key={metric.label}
                className="panel-sheen rounded-[1.5rem] border-white/10 bg-white/[0.04] px-5 py-4"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-text-muted">
                  {metric.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-text-primary">
                  <span
                    className={index === 1 ? 'text-neon-magenta' : index === 2 ? 'text-neon-violet' : 'text-neon-cyan'}
                  >
                    {metric.value}
                  </span>
                </p>
              </GlassCard>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 grid gap-3 sm:max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.35 }}
          >
            {servicePillars.map((pillar, index) => (
              <motion.div
                key={pillar.label}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-text-secondary"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.56 + index * 0.06, duration: 0.32 }}
                whileHover={{ x: 6, borderColor: 'rgba(75,139,190,0.4)', backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
                  {pillar.icon}
                </span>
                <span>{pillar.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden h-[min(76vh,760px)] lg:block">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <Suspense fallback={<Loader centered label="Booting hero" />}>
              <HeroScene />
            </Suspense>
          </div>
          <div className="dashboard-grid pointer-events-none absolute inset-0 rounded-[2rem] border border-white/8 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-60 mix-blend-overlay" />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_0_120px_rgba(6,13,24,0.85)]" />

          <div className="absolute -left-4 top-24 z-10 flex w-52 flex-col gap-3">
            {floatingCards.map((card, index) => (
              <motion.div
                key={card.label}
                className="rounded-[1.25rem] border border-white/10 bg-bg-glass px-4 py-3 shadow-panel backdrop-blur-xl"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24 + index * 0.08, duration: 0.35 }}
                style={{ animationDelay: `${index * 0.4}s` }}
                whileHover={{ x: 6, y: -4 }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
                    {card.icon}
                  </span>
                  <div>
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.26em] text-text-muted">
                      {card.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-text-primary">{card.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute inset-x-8 top-2 z-10"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
          >
            <GlassCard className="rounded-[1.8rem] border-white/10 bg-[#0b1728]/90 p-0 backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.26em] text-text-muted">
                  <TerminalSquare className="h-4 w-4 text-neon-cyan" />
                  live_backend.py
                </div>
              </div>

              <div className="grid gap-6 p-6">
                <div className="signal-line rounded-[1.4rem] border border-neon-cyan/20 bg-[#08111d] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-neon-cyan">
                      Backend Snapshot
                    </p>
                    <span className="rounded-full bg-neon-magenta/15 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.22em] text-neon-magenta">
                      healthy
                    </span>
                  </div>
                  <div className="space-y-3 font-mono text-sm text-text-secondary">
                    {codeLines.map((line, index) => (
                      <div key={line} className="flex gap-3">
                        <span className="w-4 text-text-muted">{index + 1}</span>
                        <span className={index === 0 || index === 2 ? 'text-neon-magenta' : index === 1 ? 'text-neon-cyan' : 'text-text-primary'}>
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4"
                    whileHover={{ y: -5, borderColor: 'rgba(75,139,190,0.35)' }}
                  >
                    <p className="font-mono text-[0.64rem] uppercase tracking-[0.26em] text-text-muted">Primary Stack</p>
                    <p className="mt-3 text-xl font-semibold text-text-primary">Python, FastAPI, Django</p>
                  </motion.div>
                  <motion.div
                    className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4"
                    whileHover={{ y: -5, borderColor: 'rgba(255,212,59,0.35)' }}
                  >
                    <p className="font-mono text-[0.64rem] uppercase tracking-[0.26em] text-text-muted">What I Build</p>
                    <p className="mt-3 text-xl font-semibold text-text-primary">APIs, automation, dashboards</p>
                  </motion.div>
                </div>

                <motion.div
                  className="rounded-[1.4rem] border border-neon-magenta/15 bg-neon-magenta/8 p-4"
                  whileHover={{ scale: 1.01, borderColor: 'rgba(255,212,59,0.34)' }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[0.64rem] uppercase tracking-[0.26em] text-neon-magenta">
                        Deployment Mindset
                      </p>
                      <p className="mt-2 text-lg font-semibold text-text-primary">
                        Reliable services with clean code structure
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-neon-magenta" />
                  </div>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-text-muted sm:flex">
        <span>Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-border-glow">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 animate-float rounded-full bg-neon-cyan shadow-glow-cyan" />
        </span>
        <ArrowDown className="h-3 w-3 text-neon-cyan" />
      </div>
    </section>
  )
}

export default Hero
