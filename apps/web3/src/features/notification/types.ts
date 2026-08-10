import { NotificationToastType } from 'shared/types'

export enum NotificationToastTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  WIN = 'win',
  LOSS = 'loss',
  REJECT = 'reject',
  BONUS = 'bonus'
}
export interface NotificationState {
  isOpen: boolean
  type: NotificationToastType
  description?: string
  title?: string
  duration?: number
  winAmount?: string | null
  actionText?: string
  linkAddress?: string
  buttonAction?: () => void
}

export interface NotificationStateWithId extends NotificationState {
  id: string
}
