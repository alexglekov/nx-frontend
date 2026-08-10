import { useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { useParams } from 'react-router-dom'
import { GameSlider } from 'shared/ui/game-slider/game-slider'
import { useProvidersGamesCatalog } from '../../games/hooks/use-providers-games-catalog'
import { useGetGameById } from '../hooks/use-get-game-by-id'
import { useGetGameUrl } from '../hooks/use-get-game-url'
import { currentActiveGameVar } from '../store'
import { GameToolButtons } from './game-tool-buttons'
import { GameWindow } from './game-window'
import styles from '../game.module.scss'

export const Game: React.FC = () => {
  const { gameId } = useParams()

  const { refetch, loading: gameLoading } = useGetGameById(gameId)

  const game = useReactiveVar(currentActiveGameVar)

  const gameProvider = game?.provider

  const { gameUrl, loading: gameUrlLoading } = useGetGameUrl(
    gameId,
    gameProvider
  )
  const gameCategory = game?.category || 'slots'

  const gameName = game?.name
  const gameCategoryToShow =
    gameCategory.slice(0, 1).toUpperCase() + gameCategory.slice(1)

  const gameDescription = game?.description || 'No data'
  const rtpValue = `${game?.payouts}%` || 'N/A'
  const minBet = game?.levels[0] || 'N/A'
  const maxBet = game?.levels[game?.levels.length - 1] || 'N/A'

  const { gamesList: recommendedGames } = useProvidersGamesCatalog({
    takeAmount: 20
  })

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'6'}
    >
      <GameWindow
        gameName={game?.name}
        gameIframeUrl={gameUrl}
        loading={gameUrlLoading || gameLoading}
      />

      <Flex
        direction={'column'}
        gap={'4'}
      >
        <Flex
          align={'center'}
          gap={'5'}
          justify={'between'}
        >
          <Text
            size={'8'}
            weight={'bold'}
          >
            {gameName}
          </Text>

          <GameToolButtons refetchGame={refetch} />
        </Flex>

        <Flex
          width={'100%'}
          direction={{ initial: 'column', sm: 'row' }}
          justify={'between'}
        >
          <Text
            size={'3'}
            className={styles.descriptionGameText}
          >
            {gameDescription}
          </Text>

          <Flex gap={'5'}>
            <Box className={styles.separator} />

            <Flex
              direction={'column'}
              gap={'3'}
              className={styles.descriptionGame}
            >
              <DescriptionItem
                title={'Game Provider'}
                value={gameProvider || 'N/A'}
              />

              <DescriptionItem
                title={'Game Type'}
                value={gameCategoryToShow}
              />

              <DescriptionItem
                title={'RTP'}
                value={rtpValue}
              />

              <DescriptionItem
                title={'Min Bet'}
                value={minBet}
              />

              <DescriptionItem
                title={'Max Bet'}
                value={maxBet}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        gap={'5'}
      >
        <Text size={'7'}>Recommended Games</Text>

        <GameSlider games={recommendedGames} />
      </Flex>
    </Flex>
  )
}

interface DescriptionItemProps {
  title: string
  value: string
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({ title, value }) => (
  <Flex
    align={'center'}
    gap={'3'}
  >
    <Text
      size={'3'}
      className={cn(styles.descriptionItemText, 'color-gray')}
    >
      {title}:
    </Text>

    <Text
      size={'3'}
      weight='bold'
    >
      {value}
    </Text>
  </Flex>
)
