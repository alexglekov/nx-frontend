import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { registeredFriendsPath } from 'shared/images'
import styles from '../referral.module.scss'

export const RegisteredFriends: React.FC = () => {
  return (
    <Flex
      className={styles.cardInfo}
      direction={'column'}
      position={'relative'}
      gap={'4'}
    >
      <Text
        size={'4'}
        className={'color-white'}
        weight={'bold'}
      >
        Info on registered friends
      </Text>

      <Text
        size={'3'}
        className={cn('color-gray-light', styles.cardInfoText)}
      >
        At the end of the month, the TOP 3 participants with the highest prizes
      </Text>

      <img
        className={styles.cardInfoImage}
        src={registeredFriendsPath}
        alt={'card background'}
      />
    </Flex>
  )
}
