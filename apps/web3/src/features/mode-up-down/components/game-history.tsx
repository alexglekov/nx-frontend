import { useReactiveVar } from '@apollo/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Flex, Tooltip } from '@radix-ui/themes'
import { COLOR_GREEN, COLOR_PINK, DataTestIDs } from 'shared/constants'
import { RadixText } from 'shared/ui'
import { HISTORY_LENGTH } from '../constants'
import { historyVar } from '../store/game.store'
import { UpDownHistoryGame } from '../types'
import styles from '../mode-up-down.module.scss'

const ICON_SIZE = 20

export const UpDownHistory = () => {
  const history = useReactiveVar(historyVar) || []
  const firstEightGames =
    history.length > HISTORY_LENGTH ?
      history.slice(1, HISTORY_LENGTH + 1)
    : history

  // TODO: add hover popup with start and end prices
  return (
    <Flex
      justify={'between'}
      align={'center'}
      p={'4'}
      pt={{ initial: '3', sm: '4' }}
      px={{ initial: '4', sm: '5' }}
      gap={{ initial: '2', sm: '3', md: '5' }}
    >
      <RadixText
        color='gray'
        size='1'
      >
        OLD
      </RadixText>

      <Flex
        width={'100%'}
        justify={'between'}
        className={styles.history}
        align={'center'}
      >
        {firstEightGames.map(game => (
          <HistoryItem
            key={game.id}
            game={game}
          />
        ))}
      </Flex>

      <RadixText
        color='gray'
        size='1'
      >
        NEW
      </RadixText>
    </Flex>
  )
}

const HistoryItem = ({ game }: { game: UpDownHistoryGame }) => {
  if (game.isUp === null) return null

  const startAtTime =
    (game.startAt && new Date(game.startAt).toISOString().slice(11, 16)) ??
    'Time unknown'

  return (
    <Tooltip
      content={startAtTime}
      delayDuration={0}
    >
      <Flex
        className={styles.gameResult}
        justify={'center'}
        direction={'column'}
        p={{ initial: '2', sm: '3' }}
        data-testid={game.isUp ? upDownResultIconWon : upDownResultIconLost}
      >
        {game.isUp ?
          <ArrowUpIcon
            color={COLOR_GREEN}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        : <ArrowDownIcon
            color={COLOR_PINK}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        }
      </Flex>
    </Tooltip>
  )
}

const { upDownResultIconLost, upDownResultIconWon } = DataTestIDs
