import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { XyroDialog } from 'shared/ui'
import { isAddPredictDialogOpenVar } from '../../store/dialogs'
import { SetupsAddPredictCard } from '../setups-add-bet/setups-add-bet-card'
import styles from '../../mode-setups.module.scss'

export const SetupsDialogAddBet: React.FC = () => {
  const isDialogOpen = useReactiveVar(isAddPredictDialogOpenVar)

  const handleOpenChange = useCallback(
    (isOpen: boolean) => isAddPredictDialogOpenVar(isOpen),
    []
  )

  return (
    <XyroDialog
      className={styles.setupsAddPredictDialog}
      open={isDialogOpen}
      onOpenChange={handleOpenChange}
    >
      <SetupsAddPredictCard />
    </XyroDialog>
  )
}
