import { useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import { MAIN_LAYOUT_SCROLL_VIEW_ID } from 'shared/constants'
import { notificationsSkipAmountVar } from 'shared/store/notification'

const NOTIFICATION_PAGINATION_TAKE_AMOUNT = 10

export const useFullNotificationListPagination = () => {
  const notificationSkipAmount = useReactiveVar(notificationsSkipAmountVar)

  useEffect(() => {
    const scrollView = document.getElementById(MAIN_LAYOUT_SCROLL_VIEW_ID)

    if (!scrollView) return

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollView

      if (scrollTop + clientHeight !== scrollHeight) return

      notificationsSkipAmountVar(
        notificationSkipAmount + NOTIFICATION_PAGINATION_TAKE_AMOUNT
      )
    }

    scrollView.addEventListener('scroll', onScroll)

    return () => {
      scrollView.removeEventListener('scroll', onScroll)
    }
  }, [notificationSkipAmount])
}
