import { ElementRef, forwardRef } from 'react'
import { Link } from '@radix-ui/themes'
import classnames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import { RadixColorType } from 'shared/types'
import styles from './xyro-link.module.scss'

/**
 * A router link without styles
 * TODO: integrate optional styles from Radix UI
 */
interface Props extends React.ComponentPropsWithoutRef<typeof Link> {
  to: string
  children: React.ReactNode
  className?: string
  color?: RadixColorType
}
export const XyroLink = forwardRef<ElementRef<typeof Link>, Props>(
  ({ children, to, className, target, color = 'blue', ...rest }, ref) => {
    return (
      <Link
        {...rest}
        ref={ref}
        color={color}
        underline='hover'
        highContrast
        asChild
      >
        <RouterLink
          className={classnames(className, styles.xyroLink)}
          target={target}
          to={to}
        >
          {children}
        </RouterLink>
      </Link>
    )
  }
)
