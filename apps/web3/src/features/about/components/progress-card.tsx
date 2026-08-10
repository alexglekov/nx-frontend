import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { RouterPathes } from 'shared/constants'
import { GradientLink } from './gradient-link'
import styles from '../about.module.scss'

export const ProgressCard: React.FC = () => {
  return (
    <Flex
      className={styles.progressCard}
      direction={'column'}
      justify={'between'}
    >
      <Flex
        direction={'column'}
        gap={'4'}
      >
        <Text className={cn(styles.aboutCardTitle, 'color-white')}>
          Consumer-Centric dApp
        </Text>

        <Text className={cn(styles.aboutCardText, 'color-gray-light')}>
          In just a couple of months since our Mainnet launch,{' '}
          <span className={'color-white'}>
            we’ve surpassed $5.2M in volume and generated over $200K in revenue
          </span>
        </Text>
      </Flex>

      <Flex
        width={'100%'}
        justify={{ initial: 'center', lg: 'start' }}
      >
        <GradientLink
          title={'TRACK OUR PROGRESS'}
          href={RouterPathes.home}
        />
      </Flex>
    </Flex>
  )
}
