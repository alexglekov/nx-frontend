import { gql } from '__generated__'

export const GET_REFERRAL_DATA = gql(`
  query getReferralData($isCurrent: Boolean! = true) {
    getReferralUserLevel {
      id
      levelId
      userId
      totalEarning
      availableForWithdrawal
      currentSeasonIncome
      level {
        id
        name
        requiredEarning
        directCashbackPercentage
        subCashbackPercentage
      }

      code
      leaderboardPosition
      referralLevel {
        id
        name
        requiredEarning
        directCashbackPercentage
        subCashbackPercentage
      }
      remainingToNextLevel
      totalSeasonDepositedReferrals
    }
    getReferralLevels {
      id
      name
      requiredEarning
      directCashbackPercentage
      subCashbackPercentage
    }
    getNumberOfOwnDepositedReferrals(isCurrent: $isCurrent) {
      numberOfDepositedReferrals
      numberOfDepositedSubReferrals
    }
    getActiveReferralSeason {
      id
      status
      startsAt
      endsAt
      updatedAt
      createdAt
    }
  }
`)
