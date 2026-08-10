import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Box, Flex } from '@radix-ui/themes'
import { useFragment } from '__generated__'
import {
  GameStatus,
  PredictStatus,
  SetupsGameFragment
} from '__generated__/graphql'
import { GET_SETUPS_GAME_PREDICTS } from 'api/mode-setups'
import { FRAGMENT_SETUPS_PREDICT } from 'api/mode-setups/fragment-setups-predicts'
import { Maybe, Milliseconds, Seconds } from 'shared/types'
import { DotTitle, TimeframeCountdown } from 'shared/ui'
import { PlayerListByPoolsSkeleton } from '../setups-game-view/player-list-by-pools-skeleton'
import { NoPredictsMessage } from './no-predicts-message'
import { PlayerListByPools } from './player-list-by-pools'
import { SetupsPlayer } from './setups-player'
import styles from '../../mode-setups.module.scss'

// eslint-disable-next-line complexity, max-statements
export const SetupsGamePlayerList = ({
  game
}: {
  game: Maybe<SetupsGameFragment>
}) => {
  const { id: gameId, status: gameStatus, timeframe, endAt } = game || {}

  const {
    data: data,
    loading,
    refetch: refetchBets
  } = useQuery(GET_SETUPS_GAME_PREDICTS, {
    skip: !gameId,
    variables: {
      id: gameId || '',
      pagination: {
        skip: 0,
        take: 20
      }
    }
  })

  const predicts = useFragment(
    FRAGMENT_SETUPS_PREDICT,
    data?.getSetupPredicts.predicts
  )?.toSorted((a, b) => (b?.amount ?? 0) - (a?.amount ?? 0))

  const stopLossPool = game?.stopLossPool

  const takeProfitPool = game?.takeProfitPool

  useEffect(() => {
    refetchBets()
  }, [takeProfitPool?.predictsCount, stopLossPool?.predictsCount, refetchBets])

  const timeToFinish = endAt || 0

  const timerTitle = 'Time until game ends'
  const isGameFinished = gameStatus === GameStatus.Close
  const betsTitle = isGameFinished ? 'Top winners' : 'Top players'
  const betsTimeframeRounded = timeframe ? Math.round(timeframe) : 0

  const isCountdownShown = Boolean((endAt || 0) > Date.now())

  if (loading) return <PlayerListByPoolsSkeleton />

  if (!predicts) return <NoPredictsMessage />

  return (
    <Flex
      direction={'column'}
      // shrink='1'
      // grow='1'
    >
      <Flex
        direction={'column'}
        gap='5'
        mt='3'
      >
        {isCountdownShown && (
          <TimeframeCountdown
            endAt={timeToFinish as Milliseconds}
            timeframe={betsTimeframeRounded as Seconds}
          >
            <DotTitle
              withDot={false}
              color='gray'
              size='3'
            >
              {timerTitle}:
            </DotTitle>
          </TimeframeCountdown>
        )}

        {!isGameFinished ?
          <PlayerListByPools bets={predicts} />
        : <Box>
            <DotTitle
              withDot={false}
              color={'gray'}
              size='5'
            >
              {betsTitle}:
            </DotTitle>

            <ol className={styles.betPlayerList}>
              {predicts.length === 0 && <NoPredictsMessage />}

              {predicts
                ?.filter(p => p.status === PredictStatus.Won)
                ?.map((bet, i) => (
                  <SetupsPlayer
                    key={bet.id}
                    bet={bet}
                    place={i + 1}
                  />
                ))}
            </ol>
          </Box>
        }
      </Flex>
    </Flex>
  )
}
