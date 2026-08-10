import { FC } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { OneVsOneGame } from '__generated__/graphql'
import { Participant } from './participant'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  game: OneVsOneGame
}

export const GameParticipants: FC<Props> = ({ game }) => (
  <Flex className={styles.gameParticipants}>
    <Participant
      predict={game.ownerPredict}
      participant={game.owner}
      startPrice={game.startPrice}
      ownerId={game.ownerId}
    />

    <Participant
      predict={game.opponentPredict}
      participant={game.opponent}
      startPrice={game.startPrice}
      ownerId={game.ownerId}
    />

    <Flex
      className={styles.participantsVS}
      align={'center'}
      justify={'center'}
    >
      <Text size={'1'}>VS</Text>
    </Flex>
  </Flex>
)
