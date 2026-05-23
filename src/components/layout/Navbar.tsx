import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { siteConfig } from '../../lib/utils/constants'
import { cn } from '../../lib/utils/cn'
import NeonButton from '../ui/NeonButton'
import ThemeToggle from '../ui/ThemeToggle'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative py-2 font-mono text-xs uppercase tracking-[0.22em] text-text-secondary transition hover:text-neon-cyan',
      'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-neon-cyan after:shadow-glow-cyan after:transition-transform hover:after:scale-x-100',
      isActive && 'text-neon-cyan after:scale-x-100',
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition duration-300',
        hasScrolled
          ? 'border-b border-white/5 bg-bg-base/70 shadow-panel backdrop-blur-2xl'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 font-display text-xl font-bold uppercase tracking-[0.18em]"
          aria-label="Go to home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-2xl border border-neon-cyan/40 bg-white/5 text-neon-cyan shadow-glow-cyan transition group-hover:-translate-y-0.5 group-hover:border-neon-magenta group-hover:text-neon-magenta">
            <Zap className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="bg-gradient-to-r from-white via-neon-cyan to-neon-magenta bg-clip-text text-transparent text-glow">
            Amir
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  linkClass({ isActive }),
                  'rounded-full px-4',
                  isActive && 'bg-white/6 shadow-[inset_0_0_0_1px_rgba(99,243,255,0.18)]',
                )
              }
              end={item.href === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <NeonButton to="/contact" size="sm" variant="primary" className="rounded-full px-5">
            Hire Me
          </NeonButton>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-border-glow bg-white/5 text-neon-cyan lg:hidden"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 top-16 z-40 grid place-items-center bg-bg-base/95 px-6 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center gap-6"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {siteConfig.navItems.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <NavLink
                    to={item.href}
                    className="font-display text-4xl font-bold uppercase tracking-[0.1em] text-text-primary hover:text-neon-cyan"
                    onClick={() => setIsOpen(false)}
                    end={item.href === '/'}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <ThemeToggle />
              <NeonButton to="/contact" variant="secondary" onClick={() => setIsOpen(false)}>
                Hire Me
              </NeonButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
