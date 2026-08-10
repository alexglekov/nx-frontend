import { notificationStateVar } from 'shared/store/notification'

export function notifyOnUpDownBetSuccess(isUp: boolean, betAmount: number) {
  notificationStateVar({
    title: 'Game created',
    description: `New game for Up/Down for ${
      isUp ? 'Up' : 'Down'
    } for ${betAmount}`,
    isOpen: true,
    type: 'success'
  })
}
