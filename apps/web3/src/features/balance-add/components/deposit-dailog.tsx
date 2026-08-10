import { useReactiveVar } from '@apollo/client'
import { DialogShared } from 'shared/ui'
import { Text } from '@radix-ui/themes'
import { isDepositDialogOpenVar } from '../store/dialogs-balance-store'
import styles from '../balance-add.module.scss'
import { FormStep1 } from './deposit-step-one'

export const DepositDialog = () => {
  const isOpenDialog = useReactiveVar(isDepositDialogOpenVar)

  const handleSumbit = () => {
    // TODO: [XYRO-262] Add submitting logic here
  }

  return (
    <DialogShared
      openStore={isDepositDialogOpenVar}
      width='42rem'
      border='0.5rem solid var(--yellow)'
      radius='5.5rem'
    >
      <Text
        size={'7'}
        weight={'medium'}
        className={styles.textWhite}
      >
        Deposit
      </Text>

      {isOpenDialog ? <FormStep1 onSubmit={handleSumbit} /> : null}
    </DialogShared>
  )
}
