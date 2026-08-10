import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import {
  balanceDepositDialogOpenedVar,
  balanceWithdrawDialogOpenVar
} from 'features/balance-transactions/store/balance-transactions-dialogs.store'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { OperationFailIcon, OperationSuccessIcon } from 'shared/icons'
import styles from '../../balance-transactions.module.scss'

interface Props {
  status: 'statusSuccess' | 'statusFail'
}
export const BalanceTransactionsDialogStatusStep: React.FC<Props> = ({
  status
}) => {
  const navigate = useNavigate()

  const isSuccessTransaction = status === 'statusSuccess'

  const titleText =
    isSuccessTransaction ? 'Success!' : 'Something went wrong...'

  const handleButtonClick = () => {
    balanceDepositDialogOpenedVar(false)
    balanceWithdrawDialogOpenVar(false)

    navigate(RouterPathes.accountMyAccount)
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
      width={'100%'}
      gap={'6'}
      direction={'column'}
    >
      {isSuccessTransaction ?
        <OperationSuccessIcon
          width={'7.5rem'}
          height={'7.5rem'}
        />
      : <OperationFailIcon
          width={'7.5rem'}
          height={'7.5rem'}
        />
      }

      <Flex
        align={'center'}
        justify={'center'}
        direction={'column'}
        gap={'2'}
        maxWidth={'35rem'}
      >
        <Text
          className='color-white'
          weight={'bold'}
          size={'5'}
        >
          {titleText}
        </Text>

        {isSuccessTransaction && (
          <Text
            className='color-gray-light'
            align={'center'}
            size={'2'}
          >
            Awaiting transaction confirmation... This may take a few minutes.
          </Text>
        )}
      </Flex>

      <Button
        className={cn(styles.goToBalanceButton, {
          [styles.goToBalanceButtonSuccess]: isSuccessTransaction
        })}
        onClick={handleButtonClick}
      >
        <Text
          className={isSuccessTransaction ? 'color-black' : 'color-white'}
          size={'2'}
          weight={'bold'}
        >
          GO TO BALANCE
        </Text>
      </Button>
    </Flex>
  )
}
