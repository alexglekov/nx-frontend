import { FC } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { AuthButtonWeb3 } from './auth-button-web3'
import styles from '../../sign-up.module.scss'

export const AuthButtons = () => {
  return (
    <Flex
      align='center'
      gap='2'
      my='5'
      width='100%'
    >
      <AuthButtonWeb3 />
    </Flex>
  )
}

interface AuthButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  size?: '1' | '2' | '3' | '4'
  dataTestID?: DataTestIDs | ''
}
export const AuthButton: FC<AuthButtonProps> = ({
  children,
  disabled = false,
  onClick: handleClick,
  size = '4',
  dataTestID = ''
}) => {
  return (
    <Button
      onClick={handleClick}
      className={classnames(styles.authButton, 'color-white')}
      disabled={disabled}
      type='button'
      radius='large'
      size={size}
      data-testid={dataTestID}
    >
      {children}
    </Button>
  )
}
