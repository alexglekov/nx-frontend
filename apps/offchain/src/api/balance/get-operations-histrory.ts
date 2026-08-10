import { gql } from '__generated__'

export const QUERY_GET_OPERATIONS_HISTORY = gql(`
  query getOperationHistory($data: GetOperationHistoryInput!, $pagination: PaginatedInput!) {
    getOperationHistory(data: $data, pagination: $pagination) {
      data {
        date
        amountFrom
        amountTo
        currencyFrom
        currencyTo
        status
        type
        explorerUrl
      }
      pagination {
        skip
        take
        total
      }
    }
  }
`)
