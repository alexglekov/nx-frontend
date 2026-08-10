import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import {
  historyVar,
  upDownButtonsPendingVar,
  upDownGameStateVar,
  upDownGameVar
} from '../store/game.store'
import { upDownBasePriceVar } from '../store/up-down-base-price'
import { upDownChartAnnotationsVar } from '../store/up-down-chart-annotations'
import { upDownCurrentContractVar } from '../store/up-down-contract-addresses.store'

export const useCleanupUpDownGame = () => {
  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)

  useEffect(() => {
    upDownGameVar(null)
    upDownGameStateVar(null)
    historyVar([])
    upDownButtonsPendingVar(false)

    upDownChartAnnotationsVar(null)
    upDownBasePriceVar(0)
  }, [currentUpDownSmartContract])
}
