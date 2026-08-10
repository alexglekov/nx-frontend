import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { JoinNowLink } from './join-now-link'
import styles from '../referral.module.scss'

export const ReferralDescription: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      justify={'between'}
      align={'end'}
      className={styles.descriptionBlock}
    >
      <Text
        size={'6'}
        className={cn(styles.descriptionTextWrapper, 'color-white')}
      >
        Join our exclusive referral program and turn your passion for gaming
        into a steady income!{' '}
        <Text
          as={'span'}
          className={styles.descriptionText}
        >
          The more friends you invite, the more you earn!
        </Text>
      </Text>

      <JoinNowLink />
    </Flex>
  )
}
