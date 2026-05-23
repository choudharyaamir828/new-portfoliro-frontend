import { cn } from '../../lib/utils/cn'

export type LoaderProps = {
  centered?: boolean
  label?: string
}

const Loader = ({ centered = false, label = 'Loading signal' }: LoaderProps) => (
  <div
    className={cn(
      'flex items-center justify-center gap-4 text-neon-cyan',
      centered && 'min-h-[50vh]',
    )}
    role="status"
  >
    <span className="relative h-8 w-8 animate-spin rounded-md border border-neon-cyan shadow-glow-cyan before:absolute before:inset-1 before:rounded-sm before:border before:border-neon-magenta after:absolute after:left-1/2 after:top-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-neon-lime" />
    <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
      {label}
    </span>
  </div>
)

export default Loader
