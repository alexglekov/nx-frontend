import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MAIN_LAYOUT_SCROLL_VIEW_ID } from 'shared/constants'

export const useOnPageChangeNavigateTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const mainLayouScrollArea = document.getElementById(
      MAIN_LAYOUT_SCROLL_VIEW_ID
    )

    if (!mainLayouScrollArea) return

    mainLayouScrollArea.scrollTo({ top: 0 })
  }, [pathname])
}
