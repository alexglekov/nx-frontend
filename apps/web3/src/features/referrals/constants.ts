import { ReferralWithdrawRequestStatus } from '__generated__/graphql'
import {
  ClockFilledIcon,
  CrossFilledIcon,
  HotIcon,
  TickFilledIcon
} from 'shared/icons'

export const TRANSACTION_STATUS_TO_ICON_MAP = {
  [ReferralWithdrawRequestStatus.Paid]: {
    label: 'Paid',
    color: 'green',
    icon: TickFilledIcon
  },
  [ReferralWithdrawRequestStatus.Rejected]: {
    label: 'Closed',
    color: 'pink',
    icon: CrossFilledIcon
  },
  [ReferralWithdrawRequestStatus.Canceled]: {
    label: 'Closed',
    color: 'pink',
    icon: CrossFilledIcon
  },
  [ReferralWithdrawRequestStatus.Pending]: {
    label: 'Pending',
    color: 'purple',
    icon: ClockFilledIcon
  },
  [ReferralWithdrawRequestStatus.Created]: {
    label: 'Created',
    color: 'orange',
    icon: HotIcon
  }
}
