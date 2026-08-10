import React from 'react'
import { Flex, Grid } from '@radix-ui/themes'
import { AccountActiveCashbackBonus } from './account-active-cashback-bonus'
import { AccountBonusesList } from './account-bonuses-list'
import { AccountCashbackCurrentLevel } from './account-cashback-current-level'
import { AccountCashbackInfo } from './account-cashback-info'

export const AccountCashback: React.FC = () => {
  return (
    <Flex
      align={'center'}
      width={'100%'}
      gap={'2'}
      direction={'column'}
    >
      <Grid
        columns={{ initial: '1fr', sm: 'auto 1fr' }}
        width={'100%'}
        gap={'2'}
      >
        <AccountCashbackCurrentLevel />

        <AccountCashbackInfo />
      </Grid>

      <AccountActiveCashbackBonus />

      <AccountBonusesList mode={'cashback'} />
    </Flex>
  )
}
