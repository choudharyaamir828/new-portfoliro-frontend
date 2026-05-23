import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/utils/cn'

export type BadgeTone = 'cyan' | 'magenta' | 'violet'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  tone?: BadgeTone
}

const tones: Record<BadgeTone, string> = {
  cyan: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan',
  magenta: 'border-neon-magenta/40 bg-neon-magenta/10 text-neon-magenta',
  violet: 'border-neon-violet/40 bg-neon-violet/10 text-violet-200',
}

const Badge = ({ children, className, tone = 'cyan', ...props }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em]',
      tones[tone],
      className,
    )}
    {...props}
  >
    {children}
  </span>
)

export default Badge
