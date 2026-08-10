import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { referralIntroImagePath } from '../../../shared/images/referral-page'
import styles from '../referral.module.scss'

export const ReferralIntro: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'3'}
      position={'relative'}
      width={'100%'}
    >
      <Text className={cn(styles.introTitle, 'color-white')}>
        Two-Level Referral Program -{' '}
        <Text
          as={'span'}
          className={styles.introTitleGradient}
          weight={'bold'}
        >
          Earn with Your Friends!
        </Text>
      </Text>

      <Text
        className={cn(styles.introDescription, 'color-gray-light')}
        size={'3'}
      >
        Invite friends and earn up to{' '}
        <Text
          as={'span'}
          className={'color-white'}
          weight={'bold'}
        >
          40%
        </Text>{' '}
        and up to{' '}
        <Text
          as={'span'}
          className={'color-white'}
          weight={'bold'}
        >
          15%
        </Text>{' '}
        from their referrals!
      </Text>

      <img
        className={styles.introImage}
        src={referralIntroImagePath}
        alt={'Referral intro background'}
      />
    </Flex>
  )
}
