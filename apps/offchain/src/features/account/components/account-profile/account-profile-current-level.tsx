import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { userVar } from 'shared/store/user'
import { MAP_ACCOUNT_LEVEL_ICON } from '../../utils/map-account-level'
import { AccountProfileProgressBar } from './account-profile-progress-bar'
import styles from '../../account.module.scss'

export const AccountProfileCurrentLevel: React.FC = () => {
  const user = useReactiveVar(userVar)

  const tierLevel = user?.loyaltyProgress?.tier || 1
  const userLevel = user?.loyaltyProgress?.lvl || 1

  const IconTier = MAP_ACCOUNT_LEVEL_ICON[tierLevel]

  return (
    <Flex
      className={styles.accountCurrentLevel}
      align={{ initial: 'start', sm: 'center' }}
      gap={{ initial: '4', sm: '9' }}
      direction={{ initial: 'column', sm: 'row' }}
    >
      <Flex gap={'3'}>
        <IconTier
          width={'8.75rem'}
          height={'8.75rem'}
        />

        <Flex
          direction={'column'}
          className={styles.accountCurrentLevelText}
          justify={'center'}
        >
          <Text
            size={'2'}
            className={'color-gray-light'}
          >
            Tier {tierLevel}
          </Text>

          <Text
            size={'5'}
            className={'color-white'}
            weight={'bold'}
          >
            Level {userLevel}
          </Text>
        </Flex>
      </Flex>

      <AccountProfileProgressBar />
    </Flex>
  )
}
