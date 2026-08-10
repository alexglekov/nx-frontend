import { ElementRef, forwardRef } from 'react'
import { Button } from '@radix-ui/themes'
import { BaseButton } from '@radix-ui/themes/dist/cjs/components/base-button'
import { DataTestIDs } from 'shared/constants'
import { RadixText } from 'shared/ui'
import { WizardMode } from '../types'

interface ButtonProps {
  children: React.ReactNode
  mode?: WizardMode
  dataTestID?: DataTestIDs
}
export const AuthDialogOpenButton = forwardRef<
  ElementRef<typeof BaseButton>,
  ButtonProps
>((props, ref) => {
  return (
    <Button
      ref={ref}
      my={'0'}
      mx={'2'}
      size={'3'}
      color={'yellow'}
      variant={props.mode === WizardMode.signIn ? 'ghost' : 'solid'}
      {...props}
      data-testid={props.dataTestID || ''}
    >
      <RadixText
        weight={'bold'}
        size={'2'}
      >
        {props.children}
      </RadixText>
    </Button>
  )
})
