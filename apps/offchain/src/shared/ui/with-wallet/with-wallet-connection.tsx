import React from 'react'
import { Button, Theme } from '@radix-ui/themes'
import { useWallet } from 'shared/hooks/use-wallet'

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  children?: React.ReactNode
}
export const withWalletConnection = <T extends Props>(
  WrappedComponent: React.ComponentType<T>
) => {
  return function (props: Omit<T, keyof Props> & Props) {
    const { isReady, title, handlePrepareWallet } = useWallet()

    const handleButtonClick: React.MouseEventHandler<
      HTMLButtonElement
    > = event => {
      if (isReady && props.onClick) {
        props.onClick(event)
      } else {
        void handlePrepareWallet()
      }
    }

    return (
      <WrappedComponent
        {...(props as T)}
        onClick={handleButtonClick}
        disabled={isReady ? props.disabled : false}
        type={!isReady ? 'button' : undefined}
      >
        {isReady ? props.children : title}
      </WrappedComponent>
    )
  }
}

export const ButtonWithWalletConnection = withWalletConnection(Button)
