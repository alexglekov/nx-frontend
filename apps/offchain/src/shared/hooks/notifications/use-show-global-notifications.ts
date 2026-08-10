/* eslint-disable max-lines */
import { useCallback } from 'react'
import {
  BonusNotification,
  GameResultNotification,
  GameType,
  MentionNotification,
  Notification,
  NotificationType,
  OneVsOneAcceptedNotification,
  OneVsOneInvitationNotification,
  OneVsOneRefusedNotification,
  PredictStatus,
  SetupGameClosedNotification
} from '__generated__/graphql'
import { NotificationToastTypes } from 'features/notification/types'
import { useNavigate } from 'react-router-dom'
import { MY_BETS_MODES } from 'shared/constants'
import { notificationStateVar } from 'shared/store/notification'

export const useShowGlobalNotifications = () => {
  const navigate = useNavigate()

  const handleControlGameNotifications = useCallback(
    // eslint-disable-next-line max-statements, complexity
    (notification: GameResultNotification) => {
      const { gameType, amount, outcome } = notification?.payload || {}

      if (!('status' in notification.payload)) return

      const status = notification.payload.status

      const gameName = MY_BETS_MODES[gameType].name
      const actionLink = MY_BETS_MODES[gameType].link

      const actionButtonText = `GO TO ${gameName.toUpperCase()}`

      const winAmount = outcome ? outcome.toFixed(2) : ''

      // NOTE: Following logic is special case only for bullseye
      const isBullsEyeGameModeSpecialCondition =
        status === PredictStatus.Won &&
        gameType === GameType.Bullseye &&
        outcome &&
        amount &&
        amount - outcome > 0

      // NOTE: Following logic is special case only for bullseye
      if (isBullsEyeGameModeSpecialCondition) {
        notificationStateVar({
          isOpen: true,
          title: `${gameName} is over. Unfortunally, you lost!`,
          type: NotificationToastTypes.LOSS,
          description: 'You can start new game right now.',
          buttonAction: () => navigate(actionLink),
          actionText: actionButtonText
        })

        return
      }

      if (status === PredictStatus.Won) {
        notificationStateVar({
          isOpen: true,
          title: `${gameName} is over. Congratulations, you won!`,
          type: NotificationToastTypes.WIN,
          winAmount: winAmount,
          description: 'You can start new game right now to earn even more.',
          buttonAction: () => navigate(actionLink)
        })

        return
      }

      if (status === PredictStatus.Loss) {
        notificationStateVar({
          isOpen: true,
          title: `${gameName} is over. Unfortunally, you lost!`,
          type: NotificationToastTypes.LOSS,
          winAmount: null,
          description: 'You can start new game right now.',
          buttonAction: () => navigate(actionLink),
          actionText: actionButtonText
        })

        return
      }

      if (status === PredictStatus.Reject) {
        notificationStateVar({
          isOpen: true,
          title: `${gameName} game was rejected.`,
          type: NotificationToastTypes.REJECT,
          description: 'You can start new game right now.',
          buttonAction: () => navigate(actionLink),
          actionText: actionButtonText
        })

        return
      }
    },
    [navigate]
  )

  const handleControlBonusNotifications = useCallback(
    (notification: BonusNotification) => {
      if (notification.description?.toLowerCase()?.includes('faceted')) {
        notificationStateVar({
          isOpen: true,
          title: `Congratulations!`,
          type: NotificationToastTypes.BONUS,
          winAmount: '0.00001',
          description: 'You’ve completed faceted task and earned 0.00001 ETH.'
        })

        return
      }

      notificationStateVar({
        isOpen: true,
        title: `Congratulations!`,
        type: NotificationToastTypes.BONUS,
        winAmount: '0.00001',
        description:
          'You’ve completed the first challenge «The way of XYRO» and earned 0.00001 ETH. Enjoy the game!'
      })
    },
    []
  )

  const handleControlOneVsOneGameStateNotifications = useCallback(
    (
      notification:
        | OneVsOneAcceptedNotification
        | OneVsOneRefusedNotification
        | OneVsOneInvitationNotification
    ) => {
      const title = getOneVsOneStateNotificationTitleByType(notification.type)

      notificationStateVar({
        isOpen: true,
        title: title,
        type: NotificationToastTypes.INFO,
        description: 'You can view the game clicking on the button below',
        actionText: 'TO THE GAME',
        buttonAction: () =>
          navigate(`/one-vs-one/?gameId=${notification.payload.gameId}`),
        duration: 5000
      })
    },
    [navigate]
  )

  const handleControlSetupsGameStateNotifications = useCallback(
    (notification: SetupGameClosedNotification) => {
      notificationStateVar({
        isOpen: true,
        title: 'Your setup was successfully finished',
        type: NotificationToastTypes.INFO,
        description: 'You can view the game clicking on the button below',
        actionText: 'TO THE GAME',
        buttonAction: () =>
          navigate(`/setups/?gameId=${notification.payload.gameId}`)
      })
    },
    [navigate]
  )

  const handleControlMentionNotifications = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (notification: MentionNotification) => {
      // TODO: Ask BE to prove more info about mention Notifications
    },
    []
  )

  // eslint-disable-next-line max-statements
  const handleMountNotification = (notification: Notification) => {
    if (notification.type === NotificationType.GameResult) {
      handleControlGameNotifications(notification as GameResultNotification)
    }

    if (notification.type === NotificationType.Bonus) {
      handleControlBonusNotifications(notification as BonusNotification)
    }

    if (notification.type === NotificationType.Mention) {
      handleControlMentionNotifications(notification as MentionNotification)
    }

    if (
      notification.type === NotificationType.OneVsOneAccepted ||
      notification.type === NotificationType.OneVsOneInvitation
    ) {
      handleControlOneVsOneGameStateNotifications(
        notification as
          | OneVsOneAcceptedNotification
          | OneVsOneInvitationNotification
      )
    }

    if (notification.type === NotificationType.SetupGameClosed) {
      handleControlSetupsGameStateNotifications(
        notification as SetupGameClosedNotification
      )
    }
  }

  return {
    handleMountNotification
  }
}

const { OneVsOneAccepted, OneVsOneInvitation, OneVsOneRefused } =
  NotificationType

const getOneVsOneStateNotificationTitleByType = (
  type:
    | OneVsOneAcceptedNotification['type']
    | OneVsOneRefusedNotification['type']
    | OneVsOneInvitationNotification['type']
) => {
  if (type === OneVsOneAccepted) {
    return 'Your 1vs1 game was accepted'
  }

  if (type === OneVsOneInvitation) {
    return 'You have been invited to the 1vs1 game'
  }

  if (type === OneVsOneRefused) {
    return 'Your 1vs1 game was rejected'
  }

  return ''
}
