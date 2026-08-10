import React from 'react'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { CoinType } from '__generated__/graphql'
import { LinkIcon, OperationSuccessIcon } from 'shared/icons'
import { DialogShared } from 'shared/ui'
import styles from '../balance-add.module.scss'
import { isOperationSuccessDialogOpenVar } from '../store/dialogs-balance-store'
import { CompleteTransactionStats } from './complete-transaction-stats'
import { DepositParamView } from './deposit-param-view'

export const OperationSuccessDialog: React.FC = () => {
  return (
    <DialogShared
      openStore={isOperationSuccessDialogOpenVar}
      width='42rem'
      border='0.5rem solid var(--yellow-10)'
      radius='5.5rem'
    >
      <Flex
        width={'100%'}
        height={'100%'}
        align={'center'}
        direction={'column'}
      >
        <Flex
          direction={'column'}
          width={'100%'}
        >
          <Flex
            direction={'column'}
            align={'center'}
            gap={'2'}
          >
            <OperationSuccessIcon />
            <Text
              className={styles.textWhite}
              size={'7'}
            >
              Complete
            </Text>
          </Flex>

          <CompleteTransactionStats />

          <Separator
            size={'4'}
            my={'4'}
          />

          {/* TODO: Replace mock data */}
          <DepositParamView
            coin={{} as CoinType}
            isOperationSuccess
          />

          <Separator
            size={'4'}
            my={'4'}
          />

          <Flex
            align={'center'}
            gap={'2'}
            className={styles.linkContainer}
          >
            <Text
              size={'2'}
              className={'color-cyan'}
            >
              View in explorer
            </Text>
            <LinkIcon color='var(--c-a-lazur)' />
          </Flex>
        </Flex>
        <Button className={styles.topUpButton}>DONE</Button>
      </Flex>
    </DialogShared>
  )
}
