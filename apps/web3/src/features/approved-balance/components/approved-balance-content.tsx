import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { XyroDialog } from 'shared/ui'
import { isOpenAllowanceDialogVar } from '../store/dialogs'
import { ApprovedBalanceAmount } from './approved-balance-amount'
import { ApprovedBalanceForm } from './approved-balance-form'
import styles from '../approved-balance.module.scss'

export const ApprovedBalanceContent = () => {
  const isOpenDialog = useReactiveVar(isOpenAllowanceDialogVar)

  const onCloseDialog = () => {
    isOpenAllowanceDialogVar(false)
  }

  return (
    <XyroDialog
      open={isOpenDialog}
      onOpenChange={onCloseDialog}
    >
      <Flex
        className={styles.approvedBalanceContent}
        direction={'column'}
        align={'center'}
      >
        <Text
          align={'center'}
          size={'6'}
          mb={'6'}
        >
          Balance
        </Text>

        <ApprovedBalanceAmount />

        <ApprovedBalanceForm />
      </Flex>
    </XyroDialog>
  )
}
