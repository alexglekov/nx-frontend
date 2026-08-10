import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { bullsEyeChartAnnotationsVar } from '../store/bulls-eye-chart-annotations'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import {
  bullsEyeGameStateVar,
  bullsEyeGameVar,
  isInviteAlertMessageShownVar
} from '../store/game.store'

export const useCleanupBullsEyeGame = () => {
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  useEffect(() => {
    bullsEyeGameStateVar(null)
    bullsEyeGameVar(null)
    isInviteAlertMessageShownVar(false)

    bullsEyeChartAnnotationsVar(null)
  }, [currentBullsEyeSmartContract])
}
