import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LoyaltyLevelEntity } from '__generated__/graphql'
import { BetsTable } from 'shared/ui'
import { MAP_ACCOUNT_LEVEL_ICON } from '../../utils/map-account-level'
import { accountProfileTierTableColumns } from './account-profile-tier-table-columns'
import styles from '../../account.module.scss'

interface Props {
  level: number
  tiers: Array<LoyaltyLevelEntity & { tier: number }>
}

export const AccountProfileTier: React.FC<Props> = ({ level, tiers }) => {
  const IconTier = MAP_ACCOUNT_LEVEL_ICON[level]

  return (
    <Flex
      align={'center'}
      gap={'8'}
      width={'100%'}
      justify={'between'}
      className={styles.accountProfileTier}
    >
      <Flex
        align={'center'}
        gap={'3'}
        direction={{ initial: 'column', sm: 'row' }}
        className={styles.accountProfileTierText}
      >
        <IconTier
          width={'10rem'}
          height={'10rem'}
        />

        <Text
          size={'5'}
          weight={'bold'}
        >
          Tier {level}
        </Text>
      </Flex>

      <Flex className={styles.accountProfileTierTable}>
        <BetsTable
          bets={tiers}
          tableCellClassName={styles.accountProfileTierTableCell}
          headerClassName={styles.accountProfileTierTableHeader}
          className={styles.accountProfileTierTableContainer}
          columns={accountProfileTierTableColumns}
          emptyStateText={`There are no data yet`}
        />
      </Flex>
    </Flex>
  )
}
