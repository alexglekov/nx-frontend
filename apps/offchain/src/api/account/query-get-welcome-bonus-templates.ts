import { gql } from '__generated__'

export const QUERY_GET_WELCOME_BONUS_TEMPLATE = gql(`
  query getWelcomeBonusTemplates {
    getWelcomeBonusTemplates {
      id
      type
      name
      category
      minutesToGame
      minutesToLive
      amount
      multiplerAmount
      multiplerVolume
      multiplerWager
    }
  }
`)
