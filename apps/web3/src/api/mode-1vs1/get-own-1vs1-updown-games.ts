import { gql } from '__generated__'

export const GET_OWN_ONE_VS_ONE_UPDOWN_GAMES = gql(`
  query getOwnOneVsOneUpDownGames($filters: OneVsOneUpDownGameFilters!, $pagination: PaginatedInput!) {
    getOwnOneVsOneUpDownGames(filters: $filters, pagination: $pagination) {
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
        owner {
          id,
          name,
          avatarUris
        },
        opponent {
          name,
          avatarUris
        },
        opponentPredict {
          amount,
          isLong,
          status,
          owner {
            name,
            avatarUris
          }
        },
        ownerPredict {
          amount,
          isLong,
          status,
        },
        status
      },
      skip,
      take,
    }
  }
`)
