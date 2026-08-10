import { Flex, Text } from '@radix-ui/themes'
import { useLoyaltyTiers } from 'features/account-bonus/hooks/use-loyalty-tiers'
import { AccountProfileCurrentLevel } from './account-profile-current-level'
import { AccountProfileTier } from './account-profile-tier'
import styles from '../../account.module.scss'

export const AccountLevels: React.FC = () => {
  const { tiers } = useLoyaltyTiers()

  return (
    <Flex
      className={styles.accountLevels}
      direction={'column'}
      gap={'5'}
    >
      <Text
        size={'5'}
        className={'color-white'}
      >
        System Tiers and Levels
      </Text>

      <AccountProfileCurrentLevel />

      <Flex
        direction={'column'}
        gap={'2'}
        width={'100%'}
      >
        {tiers?.map(({ tier, levels }, index) => {
          return (
            <AccountProfileTier
              key={index}
              level={tier}
              tiers={levels}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
