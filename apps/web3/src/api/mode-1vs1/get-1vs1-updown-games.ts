import { gql } from '__generated__'

export const GET_ONE_VS_ONE_UPDOWN_GAMES = gql(`
  query getOneVsOneUpDownGames($filters: OneVsOneUpDownGameFilters!, $pagination: PaginatedInput!) {
    getOneVsOneUpDownGames(filters: $filters, pagination: $pagination) {
      games {
        feedId,
        gameType,
        id,
        isPrivate,
        endAt,
        startPrice,
        timeframe,
        ownerId,
        isLong,
        stopPredictAt,
        opponent {
          name,
          avatarUris
        },
        owner{
          id,
          name,
          avatarUris
        },
        ownerPredict {
          amount,
          isLong,
        },
        status
      },
      skip,
      take,
    }
  }
`)
