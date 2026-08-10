import { gql } from '__generated__'

export const SUBSCRIBE_CURRENT_MEME_WARS_GAME = gql(`
  subscription raceGameChanged($contractAddress: String!) {
    raceGameChanged(contractAddress: $contractAddress) {
      id
      gameType
      feedId
      startAt
      stopPredictAt
      endAt
      startPrice
      endPrice
      timeframe
      status
      commission
      totalAmount
      contractAddress
      token
      createdAt
      updatedAt
      feedsIds
      startPrices
      endPrices
      startTimestamps
      endTimestamps
      priceDiffs
      wonFeedId
      myPredicts {
        id
        gameId
        gameType
        ownerId
        status
        amount
        createdAt
        outcome
        pnl
        finalizeTxHash
        updatedAt
        feedId
        rakeback
        owner {
          __typename
          id
          name
          bio
          role
          createdAt
          avatarKeys
          discordRoles
          avatarUris
          isInfluencer
          level {
            levelId
            level {
              name
            }
          }
          wallet {
            address
          }
        }
      }
      predicts {
        id
        gameId
        gameType
        ownerId
        status
        amount
        createdAt
        outcome
        pnl
        finalizeTxHash
        updatedAt
        feedId
        rakeback
        owner {
          __typename
          id
          name
          bio
          role
          createdAt
          avatarKeys
          discordRoles
          avatarUris
          isInfluencer
          level {
            levelId
            level {
              name
            }
          }
          wallet {
            address
          }
        }
      }
      pool {
        predictsCount
        poolAmount
      }
    }
  }
`)
