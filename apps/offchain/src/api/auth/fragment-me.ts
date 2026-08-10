import { gql } from '__generated__'

export const FRAGMENT_ME = gql(`
  fragment Me on User {
    __typename
    id
    name
    bio
    role
    email
    createdAt
    avatarKeys
    discordRoles
    avatarUris
    isInfluencer
    emailConfirmed
    level {
      levelId
      level {
        name
      }
    }
    wallet {
      address
    }
    hasPlayed
    loyaltyProgress {
      lvl
      tier
      amount
      currentCashback {
        base
        additional
      }
      cashbackBonuses {
        id
        userId
        type
        category
        status
        name
        bonusTemplateId
        createdAt
        burnedAt
        startedAt
        closedAt
        minutesToGame
        amount
        turnover
        turnoverTarget
        multiplerVolume
        reason
        initialRealBalance
        moveToReal
        realChange
      }
    }
  }
`)
