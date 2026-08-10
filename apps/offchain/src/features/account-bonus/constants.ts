import { BonusStatus } from '__generated__/graphql'

export const MAP_BONUS_STATUS_TO_BUTTON: Record<BonusStatus, string> = {
  [BonusStatus.Active]: 'Activated',
  [BonusStatus.Available]: 'Activate',
  [BonusStatus.Closed]: 'Closed',
  [BonusStatus.Completed]: 'Completed'
}
