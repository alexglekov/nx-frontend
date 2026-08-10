import { Dispatch, SetStateAction, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { balanceVar } from 'shared/store/balance-store'
import { TetherToken } from 'shared/ui'
import { SetupsBetAmountField } from './setups-bet-amount-field'
import styles from '../../mode-setups.module.scss'

const FAST_BET_AMOUNTS = ['1', '5', '10', '25', '50']

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  amount: string
  setAmount: Dispatch<SetStateAction<string>>
}

export const SetupsBetAmount: React.FC<Props> = ({
  onChange,
  amount,
  setAmount
}) => {
  const balance = useReactiveVar(balanceVar)
  const summaryBalance = balance.usdtBalance + balance.treasuryDeposit

  return (
    <Flex
      direction={'column'}
      align={'center'}
      className={styles.amountControlsWrapper}
      width={'100%'}
      gap={'3'}
    >
      <Flex
        direction={'column'}
        gap={'2'}
        align={'start'}
        justify={'center'}
        width={'100%'}
      >
        <Text
          size={'2'}
          align='left'
          weight={'medium'}
        >
          1. Choose your amount:
        </Text>

        <Flex
          gap={'2'}
          align={'center'}
          width={'100%'}
        >
          {FAST_BET_AMOUNTS.map(el => {
            const isSelected = amount === el

            return (
              <Flex
                className={cn(styles.betAmountBtn, {
                  [styles.betAmountBtnActive]: isSelected
                })}
                onClick={() => setAmount(el)}
                gap={'1'}
                key={el}
                align={'center'}
                justify={'center'}
                p={'2'}
                width={'100%'}
                data-testid={DataTestIDs.setupsBidAmountSelectors}
              >
                <TetherToken
                  size='2rem'
                  color={isSelected ? 'black' : 'yellow'}
                />
                <Text
                  size={'2'}
                  weight={'regular'}
                  className={isSelected ? 'color-black' : 'color-white'}
                >
                  {el}
                </Text>
              </Flex>
            )
          })}
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        gap={'2'}
        align={'center'}
        justify={'center'}
        width={'100%'}
      >
        <SetupsBetAmountField
          amount={amount}
          setAmount={setAmount}
          maxAmount={summaryBalance}
          onChange={onChange}
        />
      </Flex>
    </Flex>
  )
}
