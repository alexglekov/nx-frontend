import { Box, Heading, ScrollArea } from "@radix-ui/themes"
import { SetupsPredictFragment } from '__generated__/graphql'
import { NoPredictsMessage } from '../setups-game-player-list/no-predicts-message'
import { SetupsPlayer } from '../setups-game-player-list/setups-player'
import styles from '../../mode-setups.module.scss'

export const BetList = ({
  type,
  bets
}: {
  type: 'UP' | 'DOWN'
  bets: SetupsPredictFragment[]
}) => {
  const color =
    (type === 'UP' && 'green') || (type === 'DOWN' && 'pink') || 'gray'

  return (
    <Box px='3'>
      <Heading
        as='h4'
        color={color}
        size='4'
      >
        {type} POOL
      </Heading>

      <ScrollArea className={styles.playerListScrollArea}>
        <ol className={styles.playerList}>
          {bets.length === 0 && <NoPredictsMessage />}

          {bets.map(bet => (
            <SetupsPlayer
              key={bet.id}
              bet={bet}
            />
          ))}
        </ol>
      </ScrollArea>
    </Box>
  )
}