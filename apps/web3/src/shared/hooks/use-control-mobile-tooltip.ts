import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { MAIN_LAYOUT_SCROLL_VIEW_ID } from 'shared/constants'
import { openedToolTipIdVar } from 'shared/store/tooltip-store'
import { v4 } from 'uuid'
import { useResponsive } from './use-responsive'

export const useControlMobileTooltip = () => {
  const [tooltipId] = useState(v4())
  const openedTooltipId = useReactiveVar(openedToolTipIdVar)

  const [open, setIsOpen] = useState<boolean>(false)
  const [isMobile] = useResponsive('xs')

  useEffect(() => {
    if (tooltipId !== openedTooltipId) {
      setIsOpen(false)
    }
  }, [openedTooltipId])

  useEffect(() => {
    if (!isMobile || !open) return

    const mainLayoutScroll = document.getElementById(MAIN_LAYOUT_SCROLL_VIEW_ID)

    if (!mainLayoutScroll) return

    const handleColseTooltip = () => {
      setIsOpen(false)
      openedToolTipIdVar('')
    }

    mainLayoutScroll.addEventListener('scroll', handleColseTooltip)

    return () =>
      mainLayoutScroll.removeEventListener('scroll', handleColseTooltip)
  }, [isMobile])

  const handleTooltipState = () => {
    if (open) {
      setIsOpen(false)
      openedToolTipIdVar('')
    } else {
      setIsOpen(true)
      openedToolTipIdVar(tooltipId)
    }
  }

  return {
    open,
    handleTooltipState
  }
}
