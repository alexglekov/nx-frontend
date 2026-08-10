import { GameType } from '__generated__/graphql'
import { RouterPathes } from 'shared/constants'

export const ACTIVE_GAME_BY_ROUTE_MAP: { [key: string]: GameType } = {
  [RouterPathes.games]: GameType.Onevsone
}
