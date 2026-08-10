/* eslint-disable max-statements */
import { useEffect } from 'react'
import { useLazyQuery, useReactiveVar, useSubscription } from '@apollo/client'
import {
  GameStatus,
  GetOneVsOneGameQuery,
  Maybe,
  MeFragment,
  OneVsOneGame,
  OneVsOneGameChangedSubscription
} from '__generated__/graphql'
import { GET_1VS1_GAME } from 'api/mode-1vs1/get-1vs1-game'
import { SUBSCRIPTION_1VS1_CHANGED } from 'api/mode-1vs1/subscription-1vs1-changed'
import { useChartAnnotationsManager } from 'features/price-graph/hooks/use-chart-annotations-manager'
import { ModeChartAnnotations } from 'features/price-graph/types'
import { userVar } from 'shared/store/user'
import { OneVsOneGameCustomType } from 'shared/types'
import { oneVsOneCurrentGameVar } from '../store/game-store'
import { oneVsOneModalChartAnnotationsVar } from '../store/one-vs-one-modal-chart-annotation'

export function useGame1vs1Loader(gameId: string) {
  const user = useReactiveVar(userVar)
  const { setAnnotations } = useChartAnnotationsManager(
    oneVsOneModalChartAnnotationsVar
  )

  const [
    loadExact,
    {
      data: exactPriceData,
      loading: loadingExact,
      error: errorExact,
      refetch: refetchExact
    }
  ] = useLazyQuery<GetOneVsOneGameQuery>(GET_1VS1_GAME, {
    variables: {
      getOneVsOneGame: gameId
    }
  })

  useSubscription<OneVsOneGameChangedSubscription>(SUBSCRIPTION_1VS1_CHANGED, {
    fetchPolicy: 'no-cache',
    skip: !gameId,
    variables: {
      gameId
    },
    onData: opts => {
      oneVsOneCurrentGameVar(
        opts.data?.data?.oneVsOneGameChanged as OneVsOneGame
      )
    }
  })

  useEffect(() => {
    loadExact()
  }, [gameId])

  const game = exactPriceData?.getOneVsOneGame as OneVsOneGame | undefined

  useEffect(() => {
    oneVsOneCurrentGameVar(game as OneVsOneGameCustomType)
  }, [game])

  useEffect(() => {
    if (game?.startPrice) {
      const startPriceAnnotation = {
        name: 'upDownPredict' as const,
        value: game.startPrice
      }

      let verticalAnnotations: ModeChartAnnotations[] | undefined

      if (game.status !== GameStatus.Open && game.stopPredictAt && game.endAt) {
        const startGameAnnotation = {
          name: 'oneVsOneStart' as const,
          value: game.ownerPredict.price || 0,
          timestamp: game.stopPredictAt
        }

        const endGameAnnotation = {
          name: 'oneVsOneEndVertical' as const,
          value: game.opponentPredict?.price || 0,
          timestamp: game.endAt
        }

        verticalAnnotations = [startGameAnnotation, endGameAnnotation]
      }

      const endGamePriceAnnotation = game.endPrice && {
        name: 'oneVsOneEnd',
        value: game.endPrice
      }

      const ownPredictAnnotation = getOwnPredictAnnotation(game, user)

      const opponentPredictAnnotation = getOpponentPredictAnnotation(game, user)

      const horizontalAnnotations = [
        startPriceAnnotation,
        ownPredictAnnotation,
        opponentPredictAnnotation,
        endGamePriceAnnotation
      ].filter(Boolean) as ModeChartAnnotations[]

      setAnnotations({
        horizontal: horizontalAnnotations,
        vertical: verticalAnnotations
      })
    }
  }, [game])

  const loading = loadingExact

  const errorPreload = errorExact

  const refetch = refetchExact

  return {
    game,
    loading,
    errorPreload,
    refetch
  }
}

function getOwnPredictAnnotation(game: OneVsOneGame, user: Maybe<MeFragment>) {
  const name = 'ownPredict' as const

  if (!user) {
    return { name, value: game.ownerPredict.price }
  }

  if (user.id === game.ownerId) {
    return { name, value: game.ownerPredict.price }
  }

  if (game.opponent && game.opponentPredict && game.opponent.id === user.id) {
    return { name, value: game.opponentPredict.price }
  }

  return null
}

/* eslint-disable-next-line complexity */
function getOpponentPredictAnnotation(
  game: OneVsOneGame,
  user: Maybe<MeFragment>
) {
  const name = 'opponentPredict' as const

  if (!user) {
    return game.opponentPredict ?
        { name, value: game.opponentPredict.price }
      : null
  }

  if (user.id === game.ownerId && game.opponentPredict) {
    return { name, value: game.opponentPredict.price }
  }

  if (game.opponent && game.opponent.id === user.id) {
    return { name, value: game.ownerPredict.price }
  }

  if (game.opponentPredict) {
    return { name, value: game.opponentPredict.price }
  }

  if (user.id !== game.ownerId && !game.opponentPredict) {
    return { name, value: game.ownerPredict.price }
  }

  return null
}
