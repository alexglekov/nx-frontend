import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { GameStatus } from '__generated__/graphql'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { SwapXyroToken } from 'shared/icons'
import { userVar } from 'shared/store/user'
import { Maybe, OneVsOneGameCustomType } from 'shared/types'
import { TetherToken } from 'shared/ui'
import { formatDate } from 'shared/utils/format-date'
import { zeroAddress } from 'viem'
import { getActualPnl } from '../utils/get-actual-pnl'
import styles from '../mode-one-vs-one.module.scss'

const FIELDS_MAP = [
  {
    name: 'endAt',
    title: 'Expire',
    formatter: (value?: Maybe<number>) => (value ? formatDate(value) : '-')
  },
  {
    name: 'startPrice',
    title: 'Starting price',
    formatter: (value?: Maybe<number>, game?: OneVsOneGameCustomType) =>
      value && game ? `$${value.toFixed(game.asset.precision)}` : '-'
  }
] as const

interface Props {
  game: OneVsOneGameCustomType
}

export const GameViewDialogFields: FC<Props> = ({ game }) => {
  const user = useReactiveVar(userVar)

  const { smartContractAddress: xyroSmartContractAddress } =
    useGetSmartContract('XyroToken')

  const tokenContractAddress = game.token || zeroAddress

  const isGameForXyroToken = xyroSmartContractAddress === tokenContractAddress

  const pnl = getActualPnl(game, user)

  return (
    <Flex
      className={styles.gameViewDialogFields}
      direction={'column'}
      gap={'3'}
    >
      {FIELDS_MAP.map(({ name, title, formatter }) => (
        <Flex
          justify={'between'}
          align={'center'}
          key={name}
        >
          <Text
            className={styles.fieldTitle}
            size={'2'}
          >
            {title}:
          </Text>

          <Text
            className={styles.fieldValue}
            size={'2'}
          >
            {formatter(game[name], game)}
          </Text>
        </Flex>
      ))}

      {game.status === GameStatus.Close && (
        <Flex
          justify={'between'}
          align={'center'}
        >
          <Text
            className={styles.fieldTitle}
            size={'2'}
          >
            Profit and lose:
          </Text>
          <Text
            className={styles.fieldValue}
            size={'2'}
            color={pnl > 0 ? 'green' : 'red'}
          >
            {pnl}
          </Text>
        </Flex>
      )}

      <Separator
        my={'3'}
        size={'4'}
      />

      <Flex
        justify={'between'}
        align={'center'}
      >
        <Text className={styles.fieldTitle}>Amount:</Text>

        <Flex align={'center'}>
          {isGameForXyroToken ?
            <SwapXyroToken
              width={'3rem'}
              height={'3rem'}
            />
          : <TetherToken size='3rem' />}
          <Text size={'6'}>{game.ownerPredict.amount}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
