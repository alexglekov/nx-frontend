import { OnDataOptions, useReactiveVar, useSubscription } from '@apollo/client'
import {
  OneVsOneGame,
  OneVsOneGameCreatedSubscription
} from '__generated__/graphql'
import { SUBSCRIPTION_1VS1_CREATED } from 'api/mode-1vs1/subscription-1vs1-created'
import { userVar } from 'shared/store/user'
import { oneVsOneOpenGamesSkipVar } from '../store/global-games-store'
import { useOneVsOnePrivateGames } from './use-one-vs-one-private-games'
import { useOneVsOnePublicGames } from './use-one-vs-one-public-games'

export const useOneVsOneCreatedGamesEvents = () => {
  const user = useReactiveVar(userVar)

  const { addOneVsOnePublicGame } = useOneVsOnePublicGames()
  const { addOneVsOnePrivateGame } = useOneVsOnePrivateGames()
  const skip = useReactiveVar(oneVsOneOpenGamesSkipVar)

  const onData = ({
    data: { data } // NOTE: nested data field is from Apollo's API: OnDataOptions > SubscriptionResult
  }: OnDataOptions<OneVsOneGameCreatedSubscription>) => {
    if (!data?.oneVsOneGameCreated) return

    const game = data?.oneVsOneGameCreated
    const { isPrivate, owner, opponent } = game

    if (
      skip !== 0 ||
      (isPrivate && owner?.id !== user?.id && opponent?.id !== user?.id)
    )
      return

    isPrivate ?
      addOneVsOnePrivateGame(game as OneVsOneGame)
    : addOneVsOnePublicGame(game as OneVsOneGame)
  }

  useSubscription(SUBSCRIPTION_1VS1_CREATED, {
    onData
  })
}
