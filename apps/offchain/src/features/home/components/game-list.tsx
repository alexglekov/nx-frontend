import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import { ArrowRightBoldShadow } from 'shared/icons'
import { GameSlider } from 'shared/ui/game-slider/game-slider'
import { RouterPathes } from '../../../shared/constants'
import { useProvidersGamesCatalog } from '../../games/hooks/use-providers-games-catalog'
import styles from '../home.module.scss'

interface Props {
  title: string
  popular?: boolean
}
export const GameList: React.FC<Props> = ({ title, popular = false }) => {
  const { gamesList, loading } = useProvidersGamesCatalog({
    takeAmount: 20,
    sortBy: popular ? 'orderByPopularity' : 'orderByPriority'
  })

  return (
    <Flex
      className={styles.gameList}
      direction={'column'}
      align={'center'}
      gap={'7'}
    >
      <Flex
        width={'100%'}
        align={'center'}
        justify={'between'}
        pr={'2'}
      >
        <Text className={cn(styles.introText, 'color-white')}>{title}</Text>

        <RouterLink
          className={styles.seeMore}
          to={RouterPathes.games}
        >
          <Flex
            className={styles.seeMoreWrapper}
            align={'center'}
          >
            <Text
              size={'2'}
              className={styles.seeMore}
              mr={'2'}
            >
              SEE MORE
            </Text>

            <ArrowRightBoldShadow
              width={'2.5rem'}
              height={'2.5rem'}
            />
          </Flex>
        </RouterLink>
      </Flex>

      <GameSlider
        games={gamesList}
        loading={loading}
      />
    </Flex>
  )
}
