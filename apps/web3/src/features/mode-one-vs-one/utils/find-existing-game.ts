import { Maybe, OneVsOneGame } from '__generated__/graphql'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { ExistingGame } from '../types'

interface Props {
  game: OneVsOneGame
  currentGames: OneVsOneGame[]
  expiredGames: OneVsOneGame[]
  publicGames: OneVsOneGame[]
  privateGames: OneVsOneGame[]
}

interface GameType {
  type: 'public' | 'current' | 'private' | 'expired' | 'completed'
  games: (props: Props) => OneVsOneGame[]
}

const gameTypes: GameType[] = [
  { type: 'public', games: (props: Props) => props.publicGames },
  { type: 'current', games: (props: Props) => props.currentGames },
  { type: 'private', games: (props: Props) => props.privateGames },
  { type: 'expired', games: (props: Props) => props.expiredGames }
]

export const findExistingGame = (props: Props): Maybe<ExistingGame> => {
  for (const { type, games } of gameTypes) {
    const foundGame = games(props).find(({ id }) => id === props.game.id)

    if (isNotNullOrUndef(foundGame)) {
      return {
        game: foundGame,
        type
      }
    }
  }

  return null
}
