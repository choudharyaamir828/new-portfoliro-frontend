import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/utils/cn'

export type GlowTextVariant = 'cyan' | 'magenta' | 'rainbow'

export type GlowTextProps = HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements
  children: ReactNode
  shimmer?: boolean
  variant?: GlowTextVariant
}

const variants: Record<GlowTextVariant, string> = {
  cyan: 'from-neon-cyan to-text-primary',
  magenta: 'from-neon-magenta to-text-primary',
  rainbow: 'from-neon-cyan via-neon-magenta to-neon-lime',
}

const GlowText = ({
  as = 'span',
  children,
  className,
  shimmer = false,
  variant = 'rainbow',
  ...props
}: GlowTextProps) => {
  const Component = as as React.ElementType

  return (
    <Component
      className={cn(
        'bg-gradient-to-r bg-clip-text font-display font-bold text-transparent text-glow',
        variants[variant],
        shimmer && 'animate-gradient-shift bg-[length:200%_200%]',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default GlowText
