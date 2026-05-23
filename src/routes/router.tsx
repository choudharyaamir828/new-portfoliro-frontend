import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Loader from '../components/ui/Loader'
import NeonButton from '../components/ui/NeonButton'
import PageTransition from '../components/layout/PageTransition'

const HomePage = lazy(() => import('../features/home/HomePage'))
const AboutPage = lazy(() => import('../features/about/AboutPage'))
const ProjectsPage = lazy(() => import('../features/projects/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('../features/projects/ProjectDetailPage'))
const SkillsPage = lazy(() => import('../features/skills/SkillsPage'))
const ContactPage = lazy(() => import('../features/contact/ContactPage'))

const NotFoundPage = () => (
  <PageTransition>
    <section className="grid min-h-screen place-items-center overflow-hidden px-4 pt-24 text-center grid-bg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.14),transparent_34%)]" />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-neon-cyan">
          Signal Lost
        </p>
        <h1 className="relative my-5 font-display text-[clamp(6rem,22vw,18rem)] font-bold leading-none text-neon-magenta text-glow">
          <span className="absolute inset-0 animate-glitch text-neon-cyan" aria-hidden="true">
            404
          </span>
          404
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-text-secondary">
          The route dropped out of range. Recalibrate back to the main signal.
        </p>
        <NeonButton to="/">Return Home</NeonButton>
      </div>
    </section>
  </PageTransition>
)

const PortfolioRoutes = () => {
  const location = useLocation()

  return (
    <Suspense fallback={<Loader centered label="Loading route" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default PortfolioRoutes
