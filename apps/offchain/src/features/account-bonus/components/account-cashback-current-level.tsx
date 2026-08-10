import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { userVar } from 'shared/store/user'
import { AccountProfileProgressBar } from '../../account/components/account-profile/account-profile-progress-bar'
import { MAP_ACCOUNT_LEVEL_ICON } from '../../account/utils/map-account-level'
import styles from '../../account/account.module.scss'

export const AccountCashbackCurrentLevel: React.FC = () => {
  const user = useReactiveVar(userVar)

  const userTier = user?.loyaltyProgress?.tier || 1
  const userLevel = user?.loyaltyProgress?.lvl || 1

  const IconTier = MAP_ACCOUNT_LEVEL_ICON[2]

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      justify={'between'}
      className={styles.cashbackItem}
    >
      <Flex
        align={'center'}
        gap={'3'}
      >
        <IconTier
          width={'9rem'}
          height={'9rem'}
        />

        <Flex direction={'column'}>
          <Text
            size={'2'}
            className={'color-gray-light'}
          >
            Tier {userTier}
          </Text>

          <Text
            size={'4'}
            className={cn('color-white', 'no-wrap')}
            weight={'bold'}
          >
            Level {userLevel}
          </Text>
        </Flex>
      </Flex>

      <AccountProfileProgressBar withBackground={false} />
    </Flex>
  )
}
