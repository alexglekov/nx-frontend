import { ReactiveVar } from '@apollo/client'
import { OneVsOneGame } from '__generated__/graphql'

interface AddGameProps {
  game: OneVsOneGame
  games: OneVsOneGame[]
  gamesReactiveVar: ReactiveVar<OneVsOneGame[]>
}

export const addOneVsOneGameToStore = ({
  game,
  games,
  gamesReactiveVar
}: AddGameProps) => {
  if (game.id === games[0]?.id) return

  games.length === 5 ?
    gamesReactiveVar([game, ...games.slice(0, games.length - 1)])
  : gamesReactiveVar([game, ...games])
}
