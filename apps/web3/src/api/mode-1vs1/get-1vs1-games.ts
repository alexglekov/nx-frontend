import { gql } from '__generated__'

export const GET_ONE_VS_ONE_GAMES = gql(`
  query getOneVsOneGames($filters: OneVsOneGameFilters!, $pagination: PaginatedInput!) {
    getOneVsOneGames(filters: $filters, pagination: $pagination) {
      games {
        feedId,
        gameType,
        id,
        isPrivate,
        isAccepted,
        endAt,
        startPrice,
        timeframe,
        ownerId,
        stopPredictAt,
        contractAddress,
        token,
        owner {
          id,
          name,
          avatarUris,
          level {
            levelId
          }        
        },
        opponent {
          id
          name
          avatarUris
          level {
            levelId
          } 
        },
        ownerPredict {
          amount,
          price,
          gameId
        },
      },
      skip,
      take,
      total
    }
  }
`)
