import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DepositCard } from './deposit-card'
import styles from '../home.module.scss'

export const Intro: React.FC = () => {
  return (
    <Flex className={styles.introContainer}>
      <Flex
        className={styles.introDepositContainer}
        width={'100%'}
        align={'center'}
        justify={{ initial: 'center', sm: 'start' }}
        gap={'7'}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <DepositCard />

        <Flex className={styles.introTitleBox}>
          <Text
            className={cn(styles.introText, styles.introTitle, 'color-white')}
            weight={'bold'}
          >
            Easy way
            <br />
            for Crypto play
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
