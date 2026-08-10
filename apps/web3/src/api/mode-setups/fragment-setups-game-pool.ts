import { gql } from '__generated__'

export const FRAGMENT_SETUPS_GAME_POOL = gql(`
  fragment SetupsGamePool on SetupGamePoolInfo {
    predictsCount
    poolAmount
    multiplier
  }
`)
