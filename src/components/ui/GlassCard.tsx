import { motion, useMotionValue, useTransform, type HTMLMotionProps } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

import { cn } from '../../lib/utils/cn'

export type GlassCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  glow?: boolean
  interactive?: boolean
}

const GlassCard = ({
  children,
  className,
  glow = false,
  interactive = false,
  onMouseLeave,
  onMouseMove,
  style,
  ...props
}: GlassCardProps) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg'])

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      const rect = event.currentTarget.getBoundingClientRect()
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
    }

    onMouseMove?.(event)
  }

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    mouseX.set(0)
    mouseY.set(0)
    onMouseLeave?.(event)
  }

  return (
    <motion.div
      className={cn(
        'glass rounded-lg p-5 transition duration-300',
        glow && 'neon-border',
        interactive && '[transform-style:preserve-3d] hover:-translate-y-1 hover:shadow-glow-cyan',
        className,
      )}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={interactive ? { ...style, rotateX, rotateY } : style}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
