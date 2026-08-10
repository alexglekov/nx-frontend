import { ElementRef, FormEventHandler, forwardRef } from 'react'
import { Button } from '@radix-ui/themes'
import { BaseButton } from '@radix-ui/themes/dist/cjs/components/base-button'
import styles from '../../sign-up.module.scss'

interface Props extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  children: React.ReactNode
  onClick?: FormEventHandler<HTMLButtonElement>
  disabled?: boolean
  isLoading?: boolean
  type?: 'submit' | 'button'
}
export const WizardSubmitButton = forwardRef<ElementRef<typeof Button>, Props>(
  (props, ref) => {
    const { children, onClick, disabled, isLoading, type, ...restProps } = props

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) =>
      e.key === 'Enter' && onClick?.(e)

    return (
      <Button
        {...restProps}
        ref={ref}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={styles.logInButton}
        disabled={disabled || isLoading}
        type={type}
        color='yellow'
        size={'4'}
        mt={'6'}
      >
        {children}
      </Button>
    )
  }
)
