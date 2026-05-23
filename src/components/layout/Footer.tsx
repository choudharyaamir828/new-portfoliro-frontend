import { Camera, Code2, Mail, Network } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useProfile } from '../../lib/hooks/useProfile'
import { siteConfig } from '../../lib/utils/constants'

const Footer = () => {
  const { data: profile } = useProfile()
  const year = new Date().getFullYear()
  const socials = [
    { href: profile?.github_url, icon: Code2, label: 'GitHub' },
    { href: profile?.linkedin_url, icon: Network, label: 'LinkedIn' },
    { href: profile?.instagram_url, icon: Camera, label: 'Instagram' },
    { href: profile?.email ? `mailto:${profile.email}` : undefined, icon: Mail, label: 'Email' },
  ].filter((item) => item.href)

  return (
    <footer className="border-t border-border-glow bg-bg-elevated/70 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <Link
            to="/"
            className="font-display text-2xl font-bold uppercase tracking-[0.12em] text-neon-cyan text-glow"
          >
            Amir
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-text-secondary">
            {profile?.title || siteConfig.defaultTitle}. Interfaces, APIs, and 3D experiences tuned
            for real users.
          </p>
        </div>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-neon-magenta">
            Navigation
          </p>
          <div className="grid gap-2">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-text-secondary transition hover:text-neon-cyan"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-neon-magenta">
            Signals
          </p>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-md border border-border-glow text-text-secondary transition hover:-translate-y-0.5 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-glow-cyan"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border-glow pt-6 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
        © {year} · Built with React + Three.js
      </div>
    </footer>
  )
}

export default Footer
