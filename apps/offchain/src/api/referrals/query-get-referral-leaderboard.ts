import { gql } from '__generated__'

export const GET_REFERRAL_LEADERBOARD = gql(`
  query getReferralLeaderboard($pagination: PaginatedInput!) {
    getReferralLeaderboard(pagination: $pagination) {
      skip
      take
      total
      leaders {
        id
        levelId
        userId
        totalEarning
        availableForWithdrawal
        currentSeasonIncome
        level {
          id
          name
        }
        user {
          id
          bio
          name
          avatarKeys
          discordRoles
          isInfluencer
          createdAt
          updatedAt
          avatarUris
        }
        code
        leaderboardPosition
        remainingToNextLevel
        totalSeasonDepositedReferrals
      }
    }
  }
`)
