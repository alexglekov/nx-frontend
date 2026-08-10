import { useReactiveVar } from '@apollo/client'
import { XyroDialog } from 'shared/ui'
import { isCreate1vs1DialogOpenVar } from '../store/dialog'
import { CreateBetForm } from './one-vs-one-create-form'
import styles from '../mode-one-vs-one.module.scss'

export const GameCreateDialog = () => {
  const open = useReactiveVar(isCreate1vs1DialogOpenVar)

  const handleCloseGame = () => isCreate1vs1DialogOpenVar(false)

  return (
    <XyroDialog
      open={open}
      onOpenChange={handleCloseGame}
      className={styles.gameCreateDialog}
    >
      <CreateBetForm />
    </XyroDialog>
  )
}
