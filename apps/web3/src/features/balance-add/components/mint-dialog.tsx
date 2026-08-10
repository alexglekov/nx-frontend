import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { XyroDialog } from 'shared/ui'
import { isMintDialogOpenVar } from '../store/dialogs-balance-store'
import { MintDialogHeading } from './mint-dialog-heading'
import { MintDialogLink } from './mint-dialog-link'
import { MintForm } from './mint-form'
import styles from '../balance-add.module.scss'

export const MintDialog = () => {
  const isDialogOpen = useReactiveVar(isMintDialogOpenVar)

  return (
    <XyroDialog
      className={styles.mintDialog}
      open={isDialogOpen}
    >
      <Flex
        align={'center'}
        justify={'center'}
        direction={'column'}
      >
        <MintDialogHeading />

        <MintForm />

        <MintDialogLink />
      </Flex>
    </XyroDialog>
  )
}
