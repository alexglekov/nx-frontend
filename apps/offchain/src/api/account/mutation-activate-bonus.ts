import { gql } from '__generated__'

export const MUTATION_ACTIVATE_BONUS = gql(`
  mutation activateBonus($data: ActivateBonusInput!) {
    activateBonus(data: $data) {
      id
      userId
      type
      category
      status
      name
      bonusTemplateId
      createdAt
      burnedAt
      startedAt
      closedAt
      minutesToGame
      amount
      turnover
      turnoverTarget
      multiplerVolume
      reason
      moveToReal
      initialRealBalance
    }
  }
`)
