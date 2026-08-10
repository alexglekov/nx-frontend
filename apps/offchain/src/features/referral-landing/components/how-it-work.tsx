import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { referralGiftPath } from '../../../shared/images/referral-page'
import { JoinNowLink } from './join-now-link'
import { LevelCard } from './level-card'
import styles from '../referral.module.scss'

export const HowItWork: React.FC = () => {
  return (
    <Flex
      className={styles.howItWork}
      direction={'column'}
      gap={'4'}
      width={'100%'}
      mt={'6'}
    >
      <Text className={cn(styles.seasonRewardsTitleText, 'color-white')}>
        How Does It Work?
      </Text>

      <Flex
        gap={'3'}
        align={'center'}
        width={'100%'}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <LevelCard level={'1'} />

        <LevelCard level={'2'} />
      </Flex>

      <Flex
        justify={'center'}
        align={'center'}
        gap={'4'}
        width={'100%'}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <img
          src={referralGiftPath}
          alt={'Referral gift'}
          className={styles.referralGiftImage}
        />

        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Text
            size={'7'}
            className={cn(styles.howItWorkTitle, 'color-white')}
          >
            The more friends you bring, the more you earn!
          </Text>

          <Text
            size={'2'}
            className={cn(styles.howItWorkDescription, 'color-gray-light')}
          >
            Your personal referral code is already waiting for you in your
            profile – share it now!
          </Text>

          <JoinNowLink title={'SHARE NOW'} />
        </Flex>
      </Flex>
    </Flex>
  )
}
