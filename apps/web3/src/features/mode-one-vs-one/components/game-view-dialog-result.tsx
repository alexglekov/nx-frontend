import { FC, useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { OneVsOneExactPricePredict, PredictStatus } from '__generated__/graphql'
import cn from 'classnames'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { SwapXyroToken } from 'shared/icons'
import { TetherToken } from 'shared/ui'
import { zeroAddress } from 'viem'
import { oneVsOneCurrentGameVar } from '../store/game-store'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  predict: OneVsOneExactPricePredict
}

export const GameViewDialogResult: FC<Props> = ({
  predict: { pnl, status }
}) => {
  const oneVsOneCurrentGame = useReactiveVar(oneVsOneCurrentGameVar)
  const { smartContractAddress: xyroSmartContractAddress } =
    useGetSmartContract('XyroToken')

  const tokenContractAddress = oneVsOneCurrentGame?.token || zeroAddress
  const isGameForXyroToken = xyroSmartContractAddress === tokenContractAddress

  const isWinner = useMemo(() => status === PredictStatus.Won, [status])

  const title = useMemo(() => (isWinner ? 'YOU WON' : 'YOU LOSS'), [isWinner])

  const absPnl = useMemo(() => Math.abs(pnl), [pnl])

  return (
    <Flex
      align={'center'}
      className={styles.gameViewDialogResult}
      justify={'between'}
      p={'5'}
    >
      <Text
        size={'4'}
        weight={'bold'}
        className={cn(styles.gameViewDialogResultTitle, {
          [styles.gameViewDialogResultTitleWinner]: isWinner
        })}
      >
        {title}
      </Text>

      <Flex
        align={'center'}
        gap={'1'}
      >
        {isGameForXyroToken ?
          <SwapXyroToken
            width={'4rem'}
            height={'4rem'}
          />
        : <TetherToken size='4rem' />}

        <Text size={'6'}>{absPnl}</Text>
      </Flex>
    </Flex>
  )
}
