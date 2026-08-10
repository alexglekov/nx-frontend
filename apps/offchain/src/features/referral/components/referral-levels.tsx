import React, { useCallback, useState } from 'react'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { Card, Flex, Heading, IconButton } from '@radix-ui/themes'
import cn from 'classnames'
import { BetsTable, XyroDialog } from 'shared/ui'
import { useReferralData } from '../hooks/use-referral-data'
import { referralLevelsColumns } from './referral-levels-columns'
import styles from '../referral.module.scss'

export const ReferralLevels: React.FC = () => {
  const { referralLevels = [] } = useReferralData()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setDialogIsOpen(isOpen)
  }, [])

  return (
    <XyroDialog
      open={dialogIsOpen}
      onOpenChange={handleOpenChange}
      className={styles.referralLevelsDialog}
      dialogTrigger={
        <IconButton
          variant='ghost'
          className={cn(styles.copyIcon, 'cursor-pointer')}
        >
          <ArrowTopRightIcon className={cn('color-pink', styles.pencilIcon)} />
        </IconButton>
      }
    >
      <Card
        size={'4'}
        className={styles.tableWrapper}
      >
        <Flex
          gap={'6'}
          align={'center'}
          mb={'6'}
          className={styles.tableInfoContainer}
        >
          <Heading
            as='h3'
            size={'7'}
            weight={'medium'}
            className={cn(styles.tableTitle, 'color-white')}
          >
            Referral levels
          </Heading>
        </Flex>

        <Flex width={'100%'}>
          <BetsTable
            columns={referralLevelsColumns}
            bets={referralLevels}
            tableId='rewardsTable'
            pageSize={10}
            className={cn('height-full', styles.leaderBoard)}
          />
        </Flex>
      </Card>
    </XyroDialog>
  )
}
