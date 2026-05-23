import { AlertTriangle, RefreshCw } from 'lucide-react'

import NeonButton from './NeonButton'

export type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

const ErrorState = ({ message = 'Unable to reach the portfolio API.', onRetry }: ErrorStateProps) => (
  <div className="glass grid place-items-center rounded-lg px-6 py-12 text-center">
    <AlertTriangle className="mb-5 h-10 w-10 text-neon-magenta" aria-hidden="true" />
    <h2 className="mb-3 font-display text-3xl font-bold uppercase text-neon-magenta text-glow">
      System Error
    </h2>
    <p className="mx-auto mb-6 max-w-lg text-sm leading-7 text-text-secondary">{message}</p>
    {onRetry ? (
      <NeonButton variant="secondary" onClick={onRetry} leftIcon={<RefreshCw className="h-4 w-4" />}>
        Retry
      </NeonButton>
    ) : null}
  </div>
)

export default ErrorState
