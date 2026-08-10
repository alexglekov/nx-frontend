import { gql } from '__generated__'

export const GET_OWN_ONE_VS_ONE_GAMES = gql(`
  query getOwnOneVsOneGames($filters: OneVsOneGameFilters!, $pagination: PaginatedInput!) {
    getOwnOneVsOneGames(filters: $filters, pagination: $pagination) {
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
          name,
          avatarUris,
          level {
            levelId
          }
        },
        opponentPredict {
          amount,
          price,
          status,
          pnl,
          owner {
            name,
            avatarUris,
            level {
              levelId
            }
          }
        },
        ownerPredict {
          amount,
          price,
          status,
          pnl,
          gameId
        },
        status,
      }
      total
    }
  }
`)
