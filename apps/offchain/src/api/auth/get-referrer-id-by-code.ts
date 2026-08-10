import { gql } from '__generated__'

export const GET_REFERRER_ID_BY_CODE = gql(`
  query getReferrerIdByCode($code: String!) {
    getReferrerIdByCode(code: $code)
  }
`)
