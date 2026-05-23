import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/utils/cn'

export type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  eyebrow?: string
  heading?: ReactNode
}

const Section = ({ children, className, eyebrow, heading, id, ...props }: SectionProps) => (
  <section id={id} className={cn('relative px-4 py-20 sm:px-6 lg:px-8', className)} {...props}>
    <div className="mx-auto w-full max-w-7xl">
      {eyebrow || heading ? (
        <div className="mb-10">
          {eyebrow ? (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-neon-cyan">
              {eyebrow}
            </p>
          ) : null}
          {heading}
        </div>
      ) : null}
      {children}
    </div>
  </section>
)

export default Section
