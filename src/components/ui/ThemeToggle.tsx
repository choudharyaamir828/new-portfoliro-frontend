import { AnimatePresence, motion } from 'framer-motion'
import { Moon, SunMedium } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '../../lib/utils/cn'

type ThemeMode = 'dark' | 'light'

const THEME_STORAGE_KEY = 'portfolio-theme'

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'light' ? 'light' : 'dark'
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const isLight = theme === 'light'

  return (
    <button
      type="button"
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={isLight}
      onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
      className={cn(
        'relative inline-flex h-12 w-24 items-center rounded-[1.35rem] border p-1 shadow-panel backdrop-blur-xl transition duration-300',
        isLight
          ? 'border-[#d8b8ea] bg-[#eadcf5]/90'
          : 'border-white/10 bg-[#1e2230]/90',
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[1.35rem] transition duration-300',
          isLight
            ? 'bg-[linear-gradient(90deg,rgba(255,0,214,0.28),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.18),transparent)]'
            : 'bg-[linear-gradient(90deg,rgba(70,255,176,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]',
        )}
      />
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={cn(
          'relative z-10 grid h-10 w-10 place-items-center rounded-full border shadow-[0_10px_30px_rgba(0,0,0,0.28)]',
          isLight
            ? 'ml-auto border-[#d36cff]/55 bg-white text-slate-900'
            : 'mr-auto border-[#2effa3]/45 bg-[#101521] text-white',
        )}
      >
        <span
          className={cn(
            'pointer-events-none absolute inset-0 rounded-full',
            isLight
              ? 'bg-[conic-gradient(from_180deg_at_50%_50%,#ffd23f,#ff4fd8,#8f7cff,#2effa3,#ffd23f)] opacity-80'
              : 'bg-[conic-gradient(from_180deg_at_50%_50%,#ff4fd8,#8f7cff,#2effa3,#ffd23f,#ff4fd8)] opacity-80',
          )}
        />
        <span className="absolute inset-[2px] rounded-full bg-inherit" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            {isLight ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  )
}

export default ThemeToggle
