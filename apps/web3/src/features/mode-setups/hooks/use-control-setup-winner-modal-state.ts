import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { setupsWinnerModalGameVar } from '../store/winner-modal'

export const useControlSetupWinnerModalState = () => {
  const winnerModalGame = useReactiveVar(setupsWinnerModalGameVar)

  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false)

  useEffect(() => {
    if (!winnerModalGame) return

    setIsWinnerModalOpen(true)
  }, [winnerModalGame])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (winnerModalGame) {
      timeout = setTimeout(() => {
        setupsWinnerModalGameVar(null)
        setIsWinnerModalOpen(false)
      }, 7500)
    }

    return () => clearTimeout(timeout)
  }, [winnerModalGame])

  return {
    isWinnerModalOpen
  }
}
