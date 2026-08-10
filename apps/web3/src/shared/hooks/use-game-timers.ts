import { useCallback, useEffect, useRef } from 'react'
import { Maybe } from '__generated__/graphql'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'

interface IGame {
  id: string
  endAt?: Maybe<number>
  stopPredictAt?: Maybe<number>
}

interface IGameTimeout {
  id: string
  timeoutId: NodeJS.Timeout
}

type TimerTarget = 'predict' | 'game'

export const useGameTimers = <T extends IGame>(
  games: readonly T[],
  callback: () => void,
  target: TimerTarget,
  addition?: number
) => {
  const formattedAddition = addition ?? 0

  const createTimeout: (game: T) => IGameTimeout | null = useCallback(
    (game: T) => {
      const until =
        target === 'predict' ? game?.stopPredictAt ?? 0 : game?.endAt ?? 0

      const timeout = until - Date.now() + formattedAddition

      if (timeout < 0) return null

      const timeoutId = setTimeout(() => {
        callback()
      }, timeout)

      return {
        id: game.id,
        timeoutId
      }
    },
    [target, callback, formattedAddition]
  )

  const refetchTimeouts = useRef<IGameTimeout[]>(
    games.map(createTimeout).filter(isNotNullOrUndef)
  )

  // NOTE: Add some optimisation in future
  useEffect(() => {
    refetchTimeouts.current.forEach(({ timeoutId }) => clearTimeout(timeoutId))

    refetchTimeouts.current = games.map(createTimeout).filter(isNotNullOrUndef)
  }, [games])

  useEffect(
    () => () => {
      refetchTimeouts.current.forEach(({ timeoutId }) =>
        clearTimeout(timeoutId)
      )
    },
    [refetchTimeouts]
  )

  return refetchTimeouts
}
