import { useReactiveVar } from '@apollo/client'
import { Text } from '@radix-ui/themes'
import { DialogShared } from 'shared/ui'
import { isWithdrawDialogOpenVar } from '../store/dialogs-balance-store'
import styles from '../balance-add.module.scss'
import { FormWithdraw } from './withdraw-form'

export const WithdrawDialog = () => {
  const isOpenDialog = useReactiveVar(isWithdrawDialogOpenVar)

  return (
    <DialogShared
      openStore={isWithdrawDialogOpenVar}
      width='42rem'
      border='0.5rem solid var(--yellow-10)'
      radius='5.5rem'
    >
      <Text
        size={'7'}
        weight={'medium'}
        className={styles.textWhite}
      >
        Withdraw
      </Text>
      {isOpenDialog && <FormWithdraw />}
    </DialogShared>
  )
}
