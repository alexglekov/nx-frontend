import { gql } from '@apollo/client'

export const GET_BARS_QUERY = gql(`
  query listCandles($data: ListCandlesInput!) {
    listCandles(data: $data) {
      assetId
      close
      closeTime
      high
      low
      open
      openTime
      timeframe
    }
  }
`)
