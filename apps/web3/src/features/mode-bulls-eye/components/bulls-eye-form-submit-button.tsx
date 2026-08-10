import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { SwapXyroToken } from 'shared/icons'
import { TetherToken, XyroLoadingSpinner } from 'shared/ui'
import { ButtonWithWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import styles from '../mode-bulls-eye.module.scss'

interface Props {
  betAmount: number
  disabled?: boolean
  loading?: boolean
  dataTestId?: DataTestIDs | ''
}
export const BullsEyeBetFormSubmitButton: React.FC<Props> = ({
  disabled,
  loading,
  betAmount,
  dataTestId = ''
}) => {
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  if (loading)
    return (
      <Button
        className={styles.bullsEyeBetConfirm}
        disabled={disabled}
      >
        <XyroLoadingSpinner
          iconSize='0'
          variant='dark'
        />
      </Button>
    )

  return (
    <ButtonWithWalletConnection
      className={styles.bullsEyeBetConfirm}
      disabled={disabled}
      data-testid={dataTestId}
    >
      <Text
        size={'2'}
        weight={'bold'}
        className='color-black'
      >
        PLACE
      </Text>

      <Flex
        align='center'
        gap={'1'}
      >
        {currentBullsEyeSmartContract?.smartContractForXyroToken ?
          <SwapXyroToken
            width={'2.5rem'}
            height={'2.5rem'}
          />
        : <TetherToken
            className='color-black'
            size='2.5rem'
          />
        }

        <Text
          weight={'medium'}
          size={'3'}
          className='color-black'
        >
          {betAmount}
        </Text>
      </Flex>
    </ButtonWithWalletConnection>
  )
}
