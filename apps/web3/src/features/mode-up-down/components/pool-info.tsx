import { useReactiveVar } from '@apollo/client'
import { Box, Flex, Heading } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { ParticipantsInfo } from 'shared/ui'
import { useGetUpDownContracts } from '../hooks/use-get-up-down-contracts'
import { usePoolInfo } from '../hooks/use-pool-info'
import { upDownGameVar } from '../store/game.store'
import { PoolInfoPayout } from './pool-info-payout'
import { PoolSizeInfo } from './pool-info-size'
import styles from '../mode-up-down.module.scss'

export const PoolInfo = ({
  title,
  isLong
}: {
  title: string
  isLong: boolean
}) => {
  const { currentUpDownSmartContract } = useGetUpDownContracts()
  const game = useReactiveVar(upDownGameVar)
  const { participantListMessage, betPool } = usePoolInfo(isLong)
  const isShowPayout = !game?.myPredict || game.myPredict.isLong === isLong

  return (
    <Flex
      className={styles.poolInfo}
      direction={'column'}
      p={{ initial: '5', sm: '4' }}
    >
      <Flex
        direction={'column'}
        align={'center'}
        pt={'3'}
      >
        <Heading
          as={'h3'}
          className={styles.poolInfoTitle}
          color={isLong ? 'green' : 'pink'}
          mb={'3'}
          size={'6'}
          align={'center'}
        >
          {title}
        </Heading>
      </Flex>

      <PoolSizeInfo
        poolSize={betPool?.poolAmount}
        betsCount={betPool?.predictsCount}
      />

      <ParticipantsInfo
        bets={betPool?.predicts || []}
        messageType={participantListMessage}
        dataTestId={isLong ? upDownUpPlayer : upDownDownPlayer}
        isGameForXyroToken={
          currentUpDownSmartContract?.smartContractForXyroToken
        }
      />

      {isShowPayout && (
        <Box
          className={cn(styles.betPayoutInfoContainer, 'less-than-sm-hidden')}
        >
          <PoolInfoPayout isLong={isLong} />
        </Box>
      )}
    </Flex>
  )
}

const { upDownUpPlayer, upDownDownPlayer } = DataTestIDs
