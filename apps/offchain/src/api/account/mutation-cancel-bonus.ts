import { gql } from '__generated__'

export const MUTATION_CANCEL_BONUS = gql(`
  mutation cancelBonus($data: ActivateBonusInput!) {
    cancelBonus(data: $data) {
      id
    }
  }
`)
