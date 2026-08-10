import { FC, useEffect, useMemo } from 'react'
import { Tabs, Flex, Box } from '@radix-ui/themes'
import { GameStatus, Maybe, SetupsGameFragment } from '__generated__/graphql'
import { setupsChartAnnotationsVar } from 'features/mode-setups/store/setups-chart-annotations'
import { Milliseconds } from 'shared/types'
import { RadixText } from 'shared/ui'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { useChartAnnotationsManager } from '../../../price-graph/hooks/use-chart-annotations-manager'
import { SetupsGamePlayerList } from '../setups-game-player-list/setups-game-player-list'
import { SetupsPriceGraph } from './setups-price-graph'
import styles from '../../mode-setups.module.scss'

/* eslint-disable complexity */
interface Props {
  game: Maybe<SetupsGameFragment>
}
export const SetupsGameViewTabs: FC<Props> = ({ game }) => {
  const {
    status,
    endAt,
    stopPredictAt,
    id: gameId,
    stopLoss,
    takeProfit,
    startPrice
  } = game || {}

  const { annotations: chartAnnotations, setAnnotations } =
    useChartAnnotationsManager(setupsChartAnnotationsVar)

  const annotations = useMemo(() => {
    return [
      stopLoss ? { name: 'stopLoss' as const, value: stopLoss } : null,
      takeProfit ? { name: 'takeProfit' as const, value: takeProfit } : null,
      startPrice ? { name: 'entryPoint' as const, value: startPrice } : null
    ].filter(isNotNullOrUndef)
  }, [stopLoss, takeProfit, startPrice])

  useEffect(() => {
    setAnnotations({
      horizontal: annotations
    })
  }, [annotations, setAnnotations])

  const isGameFinished = status === GameStatus.Close
  const gameEndsAt = endAt ? (endAt as Milliseconds) : null
  const gameStopBetsAt = stopPredictAt ? (stopPredictAt as Milliseconds) : null

  return (
    <Tabs.Root
      defaultValue='chart'
      asChild
    >
      <Flex
        direction={'column'}
        className={styles.setupsGameViewTabs}
        p='4'
      >
        <Tabs.List
          size='2'
          color='gray'
        >
          <Tabs.Trigger value='chart'>
            <RadixText size={'6'}>Chart</RadixText>
          </Tabs.Trigger>

          <Tabs.Trigger value='winners'>
            <RadixText size={'6'}>
              {isGameFinished ? 'Winners' : 'Players'}
            </RadixText>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content
          value='chart'
          asChild
        >
          <Box
            mt='4'
            className={styles.setupsPriceGraphWrapper}
          >
            <SetupsPriceGraph
              game={game}
              annotations={chartAnnotations}
            />
          </Box>
        </Tabs.Content>

        <Tabs.Content value='winners'>
          {gameId && <SetupsGamePlayerList game={game} />}
        </Tabs.Content>
      </Flex>

      {/* TODO: add Winner Modal for the Game View */}
      {/* <WinnerModal isUserPlayed={true} participantsList={[]} title='WINNERS' /> */}
    </Tabs.Root>
  )
}
