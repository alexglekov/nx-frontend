import { ElementRef, forwardRef } from 'react'
import { Badge, Button, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import styles from './xyro-badge.module.scss'

interface Props extends React.ComponentPropsWithoutRef<typeof Badge> {
  children?: React.ReactNode
}
export const XyroBadge = forwardRef<ElementRef<typeof Button>, Props>(
  ({ children, className, ...props }, ref) => {
    const classNames = cn(styles.xyroBadge, className)

    return (
      <Badge
        {...props}
        ref={ref}
        radius='large'
        variant='solid'
        className={classNames}
      >
        <Flex
          py='1'
          px='2'
          gap='1'
        >
          {children}
        </Flex>
      </Badge>
    )
  }
)
