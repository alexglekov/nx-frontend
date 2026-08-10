import { GameType } from '__generated__/graphql'
import { RouterPathes } from 'shared/constants'

export const ACTIVE_GAME_BY_ROUTE_MAP: { [key: string]: GameType } = {
  [RouterPathes.oneVsOne]: GameType.Onevsone,
  [RouterPathes.setups]: GameType.Setup,
  [RouterPathes.bullsEye]: GameType.Bullseye,
  [RouterPathes.upDown]: GameType.Updown,
  [RouterPathes.memeWars]: GameType.Race
}
