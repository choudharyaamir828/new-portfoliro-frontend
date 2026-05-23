import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

import { cn } from '../../lib/utils/cn'

export type NeonButtonVariant = 'primary' | 'secondary' | 'ghost'
export type NeonButtonSize = 'sm' | 'md' | 'lg'

type BaseProps = {
  children: ReactNode
  className?: string
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  size?: NeonButtonSize
  variant?: NeonButtonVariant
}

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    to?: never
  }

type RouterLinkProps = BaseProps &
  Omit<LinkProps, 'className' | 'children'> & {
    href?: never
    to: LinkProps['to']
  }

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
    to?: never
  }

export type NeonButtonProps = AnchorProps | RouterLinkProps | ButtonProps

const variants: Record<NeonButtonVariant, string> = {
  primary:
    'border-neon-cyan bg-neon-cyan text-bg-base shadow-glow-cyan hover:border-neon-magenta hover:bg-neon-magenta hover:shadow-glow-magenta',
  secondary:
    'border-neon-magenta bg-transparent text-neon-magenta hover:bg-neon-magenta hover:text-bg-base hover:shadow-glow-magenta',
  ghost:
    'border-border-glow bg-transparent text-text-primary hover:border-neon-cyan hover:text-neon-cyan hover:shadow-glow-cyan',
}

const sizes: Record<NeonButtonSize, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

const Spinner = () => (
  <span
    aria-hidden="true"
    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
  />
)

const NeonButton = (props: NeonButtonProps) => {
  const {
    children,
    className,
    isLoading = false,
    leftIcon,
    rightIcon,
    size = 'md',
    variant = 'primary',
    ...rest
  } = props

  const content = (
    <>
      {isLoading ? <Spinner /> : leftIcon}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {!isLoading && rightIcon}
    </>
  )

  const baseClassName = cn(
    'scanline-hover inline-flex items-center justify-center gap-2 rounded-md border font-mono font-medium uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )

  if ('href' in rest && rest.href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    return (
      <a className={baseClassName} {...anchorProps}>
        {content}
      </a>
    )
  }

  if ('to' in rest && rest.to !== undefined) {
    const linkProps = rest as Omit<LinkProps, 'className' | 'children'> & { to: LinkProps['to'] }
    return (
      <Link className={baseClassName} {...linkProps}>
        {content}
      </Link>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button className={baseClassName} disabled={isLoading || buttonProps.disabled} {...buttonProps}>
      {content}
    </button>
  )
}

export default NeonButton
