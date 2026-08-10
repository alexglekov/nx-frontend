import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import { SetupsGamePoolFragment } from '__generated__/graphql'
import classnames from 'classnames'
import { DotTitle } from 'shared/ui'
import { BetsPoolCalloutType } from 'shared/ui/bets-pool-callout'
import { BetsPoolCallout } from 'shared/ui/bets-pool-callout/bets-pool-callout'
import { PoolInfo } from '../pool-info'
import styles from '../../mode-setups.module.scss'

interface Props {
  pools: [SetupsGamePoolFragment, SetupsGamePoolFragment]
}
export const SetupsBetPools: FC<Props> = ({ pools }) => {
  const [stopLossPool, takeProfitPool] = pools

  if (pools.every(pool => pool.predictsCount === 0))
    return <BetsPoolCallout messageType={BetsPoolCalloutType.noPlayers} />

  return (
    <Flex gap='2'>
      <SetupsBetPool
        pool={takeProfitPool}
        type={'TP'}
      />
      <SetupsBetPool
        pool={stopLossPool}
        type={'SL'}
      />
    </Flex>
  )
}

export const SetupsBetPool = ({
  pool,
  type
}: {
  pool: SetupsGamePoolFragment
  type: 'TP' | 'SL'
}) => {
  return (
    <Flex
      className={classnames(styles.betPoolInfo)}
      direction={'column'}
      p={'5'}
      width={'100%'}
      gap='2'
    >
      <DotTitle
        color='gray'
        withDot={false}
      >
        {type} Pool size:
      </DotTitle>

      <Flex
        gap='2'
        align={'center'}
      >
        <PoolInfo pool={pool} />
      </Flex>
    </Flex>
  )
}
