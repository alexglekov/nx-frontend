import { gql } from '__generated__'

export const GET_USER_MEME_WARS_GAMES = gql(`
  query getUserRaceGames($data: UserRacePredictsInput!) {
    getUserRaceGames(data: $data) {
      skip
      take
      total
      games {
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
        index
        feedId
        rakeback
      }
      }
    }
  }
`)
