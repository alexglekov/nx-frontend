import { gql } from '@apollo/client'

export const GET_TOP_USERS_REWARDS = gql(`
  query getTopUsersRewards {
    getTopUsersRewards(pagination: { skip: 0, take: 100 }) {
      rewards {
        id
        rewards
        referralRewards
        lastPlace
        currentPlace
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
          level {
            levelId
          }
        }
        placeChange
        rewardsForChallenges
        lastPlaceOnLeaderboard
      }
    myReward {
        id
        rewards
        referralRewards
        lastPlace
        currentPlace
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
          level {
            levelId
          }
        }
        placeChange
        rewardsForChallenges
        lastPlaceOnLeaderboard
      }
    }
  }
`)
