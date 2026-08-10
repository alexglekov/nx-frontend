/* eslint-disable complexity */
/* eslint-disable max-statements */
import { useCallback } from 'react'
import { OnDataOptions, useReactiveVar, useSubscription } from '@apollo/client'
import {
  GameStatus,
  OneVsOneGame,
  OneVsOneGamesChangedSubscription
} from '__generated__/graphql'
import { SUBSCRIPTION_1VS1_GAMES_CHANGED } from 'api/mode-1vs1/subscription-1vs1-games-changed'
import { userVar } from 'shared/store/user'
import { ExistingGame } from '../types'
import { findExistingGame } from '../utils/find-existing-game'
import { useOneVsOneClosedGames } from './use-one-vs-one-closed-games'
import { useOneVsOneCurrentGames } from './use-one-vs-one-current-games'
import { useOneVsOneExpiredGames } from './use-one-vs-one-expired-games'
import { useOneVsOnePrivateGames } from './use-one-vs-one-private-games'
import { useOneVsOnePublicGames } from './use-one-vs-one-public-games'

interface HandeAcceptedGameProps {
  isUserOwnerOrOpponent: boolean
  game: OneVsOneGame
  existingGame: ExistingGame
}

interface HandleGameStatusChangeProps {
  game: OneVsOneGame
  existingGame: ExistingGame
}

export const useOneVsOneGamesChanged = () => {
  const user = useReactiveVar(userVar)
  const { games: publicGames, refetch: refetchPublic } =
    useOneVsOnePublicGames()

  const { games: privateGames, refetch: refetchPrivate } =
    useOneVsOnePrivateGames()

  const {
    games: currentGames,
    addOneVsOneCurrentGame,
    refetch: refetchCurrent
  } = useOneVsOneCurrentGames()

  const { addOneVsOneClosedGame } = useOneVsOneClosedGames()

  const { games: expiredGames, refetch: refetchExpired } =
    useOneVsOneExpiredGames()

  // NOTE: Handle game, what has been accepted. Refetch table in any case
  const handleAcceptedGame = useCallback(
    ({ existingGame, game, isUserOwnerOrOpponent }: HandeAcceptedGameProps) => {
      if (!isUserOwnerOrOpponent) {
        refetchPublic()
      } else {
        if (game.isAccepted) {
          addOneVsOneCurrentGame(game)
        }

        if (existingGame.type === 'private') {
          refetchPrivate()
        } else {
          refetchPublic()
        }
      }
    },
    [refetchPublic, refetchPrivate, addOneVsOneCurrentGame]
  )

  // NOTE: Handle game, if its status changed, add to store and refetch necessary table type
  const handleGameStatusChange = useCallback(
    ({ game, existingGame }: HandleGameStatusChangeProps) => {
      if (game.status === GameStatus.Close) {
        addOneVsOneClosedGame(game)

        switch (existingGame.type) {
          case 'public':
            refetchPublic()
            break
          case 'private':
            refetchPrivate()
            break
          case 'expired':
            refetchExpired()
            break
          case 'current':
            refetchCurrent()
            break
        }
      } else if (game.status === GameStatus.Reject) {
        addOneVsOneClosedGame(game)
        switch (existingGame.type) {
          case 'private':
            refetchPrivate()
            break
          case 'expired':
            refetchExpired()
            break
        }
      }
    },
    [
      addOneVsOneClosedGame,
      refetchExpired,
      refetchPrivate,
      refetchPublic,
      refetchCurrent
    ]
  )

  const onData = ({
    data: { data } // NOTE: nested data field is from Apollo's API: OnDataOptions > SubscriptionResult
  }: OnDataOptions<OneVsOneGamesChangedSubscription>) => {
    const game = data?.oneVsOneGamesChanged as OneVsOneGame
    if (!game) return

    // NOTE: Check if user owner of the game or opponent in it
    const isUserOwnerOrOpponent =
      game.ownerId === user?.id ||
      game.opponentPredict?.ownerId === user?.id ||
      game.opponent?.id === user?.id

    if (game.isPrivate && !isUserOwnerOrOpponent) return

    // NOTE: Find the game and return it with its store type
    const existingGame = findExistingGame({
      game,
      currentGames,
      expiredGames,
      privateGames,
      publicGames
    })

    if (!existingGame) return

    // NOTE: Check if game was accepted and handle if it was
    if (game.isAccepted !== existingGame.game.isAccepted) {
      handleAcceptedGame({ existingGame, game, isUserOwnerOrOpponent })
      return
    }

    // NOTE: Check if game status changed and handle if it was
    if (game.status !== existingGame.game.status) {
      handleGameStatusChange({ game, existingGame })
      return
    }

    refetchExpired()
  }

  useSubscription(SUBSCRIPTION_1VS1_GAMES_CHANGED, { onData })
}
