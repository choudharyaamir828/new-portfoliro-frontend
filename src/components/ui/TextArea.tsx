import { forwardRef, useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'

import { cn } from '../../lib/utils/cn'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string
  label: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, id, label, rows = 6, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <label className="group block" htmlFor={inputId}>
        <span className="relative block">
          <textarea
            id={inputId}
            ref={ref}
            rows={rows}
            placeholder=" "
            className={cn(
              'peer w-full resize-none rounded-md border bg-bg-elevated px-4 pt-7 font-sans text-sm text-text-primary transition duration-300 placeholder:text-transparent',
              error
                ? 'border-neon-magenta focus:border-neon-magenta focus:shadow-glow-magenta'
                : 'border-border-glow focus:border-neon-cyan focus:shadow-glow-cyan',
              className,
            )}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          <span
            className={cn(
              'pointer-events-none absolute left-4 top-5 font-mono text-xs uppercase tracking-[0.18em] text-text-muted transition-all duration-200',
              'peer-focus:top-3 peer-focus:text-[0.62rem] peer-focus:text-neon-cyan peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[0.62rem]',
              error && 'text-neon-magenta peer-focus:text-neon-magenta',
            )}
          >
            {label}
          </span>
        </span>
        {error ? (
          <span id={`${inputId}-error`} className="mt-2 block font-mono text-xs text-neon-magenta">
            {error}
          </span>
        ) : null}
      </label>
    )
  },
)

TextArea.displayName = 'TextArea'

export default TextArea
