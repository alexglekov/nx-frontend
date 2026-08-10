import { FC } from 'react'
import { Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { XyroLoading } from 'shared/ui'
import { ButtonWithWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import styles from '../approved-balance.module.scss'

interface Props {
  handleButtonClick: () => Promise<void>
  loading: boolean
  disabled: boolean
}

export const ApprovedBalanceRakebackClaimButton: FC<Props> = ({
  handleButtonClick,
  disabled,
  loading
}) => {
  return (
    <ButtonWithWalletConnection
      className={cn(styles.approvedBalanceRakebackClaimButton)}
      onClick={handleButtonClick}
      data-testid={DataTestIDs.buttonClaimRakeback}
      size={'4'}
      disabled={disabled}
    >
      <XyroLoading loading={loading}>
        <Text
          size={'2'}
          weight={'bold'}
        >
          CLAIM
        </Text>
      </XyroLoading>
    </ButtonWithWalletConnection>
  )
}
