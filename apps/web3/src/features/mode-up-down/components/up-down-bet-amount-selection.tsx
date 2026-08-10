import { FC, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { SmartContractEntity } from '__generated__/graphql'
import cn from 'classnames'
import { UP_DOWN_GAME_ROOM_PRICE_RANGES } from 'shared/constants'
import { TetherToken } from 'shared/ui'
import { SwapXyroToken } from '../../../shared/icons'
import { betAmountVar } from '../store/amount.store'
import { upDownGameVar } from '../store/game.store'
import {
  upDownContractsVar,
  upDownCurrentContractVar
} from '../store/up-down-contract-addresses.store'
import styles from '../mode-up-down.module.scss'

interface ButtonsProps {
  canBet: boolean
}
// eslint-disable-next-line max-statements
export const UpDownBetAmountSelection: FC<ButtonsProps> = ({ canBet }) => {
  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)
  const upDownSmartContractAddresses = useReactiveVar(upDownContractsVar)

  const currentContractId = upDownSmartContractAddresses.indexOf(
    currentUpDownSmartContract as SmartContractEntity
  )

  const isCurrentContractForXyroToken =
    currentUpDownSmartContract?.smartContractForXyroToken

  const upDownBetAmounts =
    UP_DOWN_GAME_ROOM_PRICE_RANGES?.[currentContractId] || []

  const betAmount = useReactiveVar(betAmountVar)
  const game = useReactiveVar(upDownGameVar)
  const userBet = game?.myPredict || null

  useEffect(() => {
    if (userBet && betAmount && upDownBetAmounts.indexOf(betAmount) !== -1) {
      betAmountVar(betAmount)
    } else {
      betAmountVar(upDownBetAmounts?.[0])
    }
  }, [currentUpDownSmartContract])

  const handleBetAmount = (amount: string) => {
    if (!amount) return
    betAmountVar(Number(amount))
  }

  useEffect(() => {
    if (!userBet) return

    betAmountVar(userBet.amount)
  }, [userBet])

  return (
    <Flex
      width={'100%'}
      height={'100%'}
      gap={'3'}
      direction={'column'}
      className={styles.betAmountButtons}
    >
      <Flex
        align={'center'}
        justify={'center'}
      >
        <Text
          size={{ initial: '2', sm: '1' }}
          weight={{ initial: 'medium', sm: 'light' }}
          className='color-white'
        >
          Choose your amount:
        </Text>
      </Flex>

      <ToggleGroup.Root
        className={styles.betsList}
        type='single'
        disabled={!canBet}
        value={String(betAmount)}
        onValueChange={handleBetAmount}
      >
        <Flex
          gap='2'
          justify={'center'}
          flexGrow={'1'}
          width={'100%'}
        >
          {upDownBetAmounts.map(amount => (
            <BetAmountSelectionButton
              key={amount}
              amount={String(amount)}
              gameForXyroToken={isCurrentContractForXyroToken}
            />
          ))}
        </Flex>
      </ToggleGroup.Root>

      <Separator
        size={'4'}
        mt={'2'}
        className={'greater-than-xs-hidden'}
      />

      <Text
        align={'center'}
        className={cn('greater-than-xs-hidden')}
        size={'2'}
        weight={'medium'}
      >
        Where the <b>BTC</b> price would go:
      </Text>
    </Flex>
  )
}

const BetAmountSelectionButton = ({
  amount,
  gameForXyroToken
}: {
  amount: string
  gameForXyroToken?: boolean
}) => {
  return (
    <ToggleGroup.Item
      value={amount}
      key={amount}
      asChild
    >
      <Button
        size={{ initial: '4', sm: '3' }}
        radius={'large'}
        className={styles.betAmountButton}
      >
        <Flex
          align={'center'}
          gap={'1'}
        >
          {gameForXyroToken ?
            <SwapXyroToken
              width={'2.5rem'}
              height={'2.5rem'}
            />
          : <TetherToken
              size='2.5rem'
              className='color-yellow'
            />
          }

          <Text
            weight={'light'}
            size={'3'}
          >
            {amount}
          </Text>
        </Flex>
      </Button>
    </ToggleGroup.Item>
  )
}
