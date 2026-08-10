import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import { featureFlags } from 'app/app-feature-flags'
import { BoldPlusIcon } from 'shared/icons'
import { XyroButton } from 'shared/ui'
import { isMintDialogOpenVar } from '../store/dialogs-balance-store'
import { MintDialog } from './mint-dialog'
import styles from '../balance-add.module.scss'

const { tokenMintAllowed } = featureFlags

export const BalanceAddButton: FC = () => {
  const handleDepositDialogOpenning = async () => {
    isMintDialogOpenVar(true)
  }

  return (
    <Flex
      align={'center'}
      gap={{ initial: '2', xs: '3' }}
      direction={'row'}
    >
      {tokenMintAllowed && (
        <XyroButton
          className={styles.balanceAddButton}
          onClick={handleDepositDialogOpenning}
          shape='cutted-both'
          color='green'
          isIconOnly
        >
          <BoldPlusIcon
            color='var(--black)'
            width={'100%'}
            height={'100%'}
          />
        </XyroButton>
      )}

      <MintDialog />
    </Flex>
  )
}
