import { Camera, Code2, Network } from 'lucide-react'

import type { Profile } from '../../lib/api/types'

export type SocialLinksProps = {
  profile?: Profile
}

const SocialLinks = ({ profile }: SocialLinksProps) => {
  const links = [
    { href: profile?.github_url, icon: Code2, label: 'GitHub' },
    { href: profile?.linkedin_url, icon: Network, label: 'LinkedIn' },
    { href: profile?.instagram_url, icon: Camera, label: 'Instagram' },
  ].filter((link) => link.href)

  if (links.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="grid h-11 w-11 place-items-center rounded-md border border-border-glow text-text-secondary transition hover:-translate-y-0.5 hover:rotate-3 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-glow-cyan"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
